import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectDraft, updateProjectDraft } from "../store/projectThunk";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import api from "../services/api";
import invesTechyLogo from "../assets/InvesTechy.jpg";
import "./editData.css";

const SECTION_NAMES = ["CAPEX", "OPEX", "Tangible Results", "Intangible Results"];

const createRow = () => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  item: "",
  description: "",
  nominal: "",
});

const createInitialSections = () =>
  SECTION_NAMES.map((section) => ({
    id: section.toLowerCase().replace(/\s+/g, "-"),
    title: section,
    rows: [createRow()],
  }));

const getSectionId = (sectionTitle) => sectionTitle.toLowerCase().replace(/\s+/g, "-");

const toRows = (items, title) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [createRow()];
  }

  return items.map((item, index) => {
    if (typeof item === "string" || typeof item === "number") {
      return {
        id: `${title}-${index + 1}`,
        item: String(item),
        description: "",
        nominal: "",
      };
    }

    return {
      id: item?._id || item?.id || `${title}-${index + 1}`,
      item:
        item?.item ||
        item?.name ||
        item?.title ||
        item?.label ||
        item?.description ||
        "",
      description: item?.description || "",
      nominal: String(
        item?.nominal ??
          item?.amount ??
          item?.value ??
          item?.cost ??
          item?.benefit ??
          "",
      ),
    };
  });
};

const getDraftItems = (draft, keys = []) => {
  for (const key of keys) {
    const value = draft?.[key];
    if (Array.isArray(value) && value.length > 0) {
      return value;
    }
  }

  return [];
};

const getLatestSimulation = (simulationHistory = []) => {
  if (!Array.isArray(simulationHistory) || simulationHistory.length === 0) {
    return null;
  }

  return [...simulationHistory].sort((a, b) => {
    const dateA = new Date(a?.calculatedAt || 0).getTime();
    const dateB = new Date(b?.calculatedAt || 0).getTime();
    return dateB - dateA;
  })[0];
};

const buildSectionsFromDraft = (draft) => {
  const latestSimulation = draft?.latestSimulation || getLatestSimulation(draft?.simulationHistory);
  const simulationData = latestSimulation?.simulatedData;
  const draftData = simulationData || draft?.draft || draft?.llmBaseDraft || draft;

  const capexItems = getDraftItems(draftData, ["capex", "capexItems", "CAPEX"]);
  const opexItems = getDraftItems(draftData, ["opex", "opexItems", "OPEX"]);
  const tangibleItems = getDraftItems(draftData, [
    "tangibleResults",
    "tangibleBenefit",
    "tangibleBenefits",
  ]);
  const intangibleItems = getDraftItems(draftData, [
    "intangibleResults",
    "intangibleBenefit",
    "intangibleBenefits",
  ]);

  return [
    {
      id: getSectionId("CAPEX"),
      title: "CAPEX",
      rows: toRows(capexItems, "capex"),
    },
    {
      id: getSectionId("OPEX"),
      title: "OPEX",
      rows: toRows(opexItems, "opex"),
    },
    {
      id: getSectionId("Tangible Results"),
      title: "Tangible Results",
      rows: toRows(tangibleItems, "tangible-results"),
    },
    {
      id: getSectionId("Intangible Results"),
      title: "Intangible Results",
      rows: toRows(intangibleItems, "intangible-results"),
    },
  ];
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const toNumberValue = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const normalizedValue = String(value || "").replace(/[^\d.-]/g, "");
  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const formatCurrencyText = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const formatShortNumber = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "-";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
  }).format(amount);
};

const CHATBOT_ENDPOINT = (projectId) => `/projects/${projectId}/chatbot`;

export default function EditData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pdfExportRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [sections, setSections] = useState(createInitialSections);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatSending, setChatSending] = useState(false);
  const [chatError, setChatError] = useState("");
  const [chatLoaded, setChatLoaded] = useState(false);
  const { currentDraft, loading, error } = useSelector((state) => state.project);
  const latestSimulation = useMemo(
    () => currentDraft?.latestSimulation || getLatestSimulation(currentDraft?.simulationHistory),
    [currentDraft],
  );
  const exportProjectName = currentDraft?.projectName || "Digital Transformation";
  const exportIndustry = currentDraft?.industry || "-";
  const exportScale = currentDraft?.calculatedScale || currentDraft?.scale || "-";
  const exportPlan = currentDraft?.plan || "-";
  const exportLocation = currentDraft?.location || "-";
  const exportQuadrant = currentDraft?.mcfarlan?.quadrant || "-";
  const exportCoordinates = currentDraft?.mcfarlan?.coordinates || {};

  useEffect(() => {
    document.body.classList.remove("page-exit");
    dispatch(fetchProjectDraft(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!currentDraft) return;
    setSections(buildSectionsFromDraft(currentDraft));
  }, [currentDraft]);

  useEffect(() => {
    if (!isChatOpen) return undefined;

    let isMounted = true;

    const loadChatHistory = async () => {
      setChatLoading(true);
      setChatError("");

      try {
        const response = await api.get(CHATBOT_ENDPOINT(id));
        const payload = response?.data || [];

        if (!isMounted) return;

        const normalizedMessages = Array.isArray(payload)
          ? payload
              .filter((item) => item?.role !== "system")
              .map((item, index) => ({
                id: `${item?.role || "message"}-${index}`,
                role: item?.role || "assistant",
                content: item?.content || "",
              }))
          : [];

        setChatMessages(
          normalizedMessages.length > 0
            ? normalizedMessages
            : [
                {
                  id: "assistant-welcome",
                  role: "assistant",
                  content:
                    "Halo, saya AI Helpy. Ada yang ingin ditanyakan tentang proyek ini?",
                },
              ],
        );
        setChatLoaded(true);
      } catch (error) {
        if (!isMounted) return;

        setChatMessages([]);
        setChatError(error?.data?.message || error?.message || "Chat history belum berhasil dimuat.");
      } finally {
        if (isMounted) {
          setChatLoading(false);
        }
      }
    };

    if (!chatLoaded) {
      loadChatHistory();
    }

    return () => {
      isMounted = false;
    };
  }, [chatLoaded, id, isChatOpen]);

  const summary = useMemo(() => {
    const getSectionTotal = (title) =>
      sections
        .find((section) => section.title === title)
        ?.rows.reduce((total, row) => total + Number(row.nominal || 0), 0) || 0;

    const capex = getSectionTotal("CAPEX");
    const opex = getSectionTotal("OPEX");
    const tangible = getSectionTotal("Tangible Results");
    const intangible = getSectionTotal("Intangible Results");
    const benefit = tangible + intangible;
    const investment = capex + opex;
    const total = investment + benefit;

    return {
      capex,
      opex,
      tangible,
      intangible,
      benefit,
      investment,
      total,
      status: benefit >= investment ? "Ready For Report" : "Need Review",
    };
  }, [sections]);

  const handleFieldChange = (sectionId, rowId, field, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              rows: section.rows.map((row) =>
                row.id !== rowId
                  ? row
                  : {
                      ...row,
                      [field]: field === "nominal" ? value.replace(/[^\d]/g, "") : value,
                    },
              ),
            },
      ),
    );
  };

  const handleAddRow = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id !== sectionId
          ? section
          : {
              ...section,
              rows: [...section.rows, createRow()],
            },
      ),
    );
  };

  const handleDeleteRow = (sectionId, rowId) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const nextRows = section.rows.filter((row) => row.id !== rowId);
        return {
          ...section,
          rows: nextRows.length > 0 ? nextRows : [createRow()],
        };
      }),
    );
  };

  const filledRows = useMemo(
    () =>
      sections.flatMap((section) =>
        section.rows
          .filter((row) => row.item.trim() || row.nominal)
          .map((row) => ({
            ...row,
            title: section.title,
          })),
      ),
    [sections],
  );
  const capexRows = useMemo(
    () => sections.find((section) => section.title === "CAPEX")?.rows.filter((row) => row.item || row.nominal) || [],
    [sections],
  );
  const opexRows = useMemo(
    () => sections.find((section) => section.title === "OPEX")?.rows.filter((row) => row.item || row.nominal) || [],
    [sections],
  );
  const tangibleRows = useMemo(
    () =>
      sections.find((section) => section.title === "Tangible Results")?.rows.filter((row) => row.item || row.nominal) || [],
    [sections],
  );
  const intangibleRows = useMemo(
    () =>
      sections.find((section) => section.title === "Intangible Results")?.rows.filter((row) => row.item || row.nominal) || [],
    [sections],
  );
  const financialResults = latestSimulation?.financialResults || {};
  const simulationSettings = latestSimulation?.simulationSettings || {};
  const breakEvenRows = financialResults?.breakEvenAnalysisDetail || [];
  const exportFeasibility =
    financialResults?.feasibilityStatus ||
    (financialResults?.isFeasible === true
      ? "Highly Recommended"
      : financialResults?.isFeasible === false
        ? "Need Review"
        : summary.status);
  const exportInsight =
    intangibleRows.find((row) => row.description?.trim())?.description ||
    intangibleRows.find((row) => row.item?.trim())?.item ||
    "The project is positioned to create measurable business impact with clear operational benefits.";
  const businessScores = currentDraft?.businessDomain || {};
  const technologyScores = currentDraft?.technologyDomain || {};

  const buildDraftPayload = () => {
    const mapRows = (title) =>
      sections
        .find((section) => section.title === title)
        ?.rows.map((row) => ({
          item: row.item?.trim() || "",
          description: row.description?.trim() || "",
          nominal: toNumberValue(row.nominal),
        }))
        .filter((row) => row.item || row.description || row.nominal) || [];

    const latestSimulationSettings = latestSimulation?.simulationSettings || {};

    return {
      scenarioName:
        latestSimulation?.scenarioName ||
        currentDraft?.scenarioName ||
        "Optimistic Scenario",
      capex: mapRows("CAPEX"),
      opex: mapRows("OPEX"),
      tangibleBenefits: mapRows("Tangible Results"),
      intangibleBenefits: mapRows("Intangible Results"),
      inflationRate: toNumberValue(
        currentDraft?.inflationRate ??
          currentDraft?.simulationSettings?.inflationRate ??
          latestSimulationSettings?.inflationRate ??
          0.05,
      ),
      taxRate: toNumberValue(
        currentDraft?.taxRate ??
          currentDraft?.simulationSettings?.taxRate ??
          latestSimulationSettings?.taxRate ??
          0.11,
      ),
      discountRate: toNumberValue(
        currentDraft?.discountRate ??
          currentDraft?.simulationSettings?.discountRate ??
          latestSimulationSettings?.discountRate ??
          0.1,
      ),
      years: toNumberValue(
        currentDraft?.years ??
          currentDraft?.simulationSettings?.years ??
          latestSimulationSettings?.years ??
          3,
      ),
    };
  };

  const handleSave = () => {
    if (filledRows.length === 0) {
      window.alert("Isi minimal satu data dulu sebelum menyimpan.");
      return;
    }

    setShowResultCard(true);
  };

  const handleExportPdf = () => {
    const exportElement = pdfExportRef.current;
    if (!exportElement) {
      window.alert("Template PDF belum siap.");
      return;
    }

    html2canvas(exportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#f6f2e7",
    }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imageData, "PNG", 0, 0, 297, 210);
      pdf.save(`project-${id}-executive-summary.pdf`);
    }).catch(() => {
      window.alert("Gagal membuat PDF.");
    });
  };

  const handleSaveProject = async () => {
    const isConfirmed = window.confirm(
      "Yakin ingin menyimpan project ini? Jika disimpan, kamu akan lanjut ke Report List.",
    );

    if (!isConfirmed) {
      return;
    }

    const resultAction = await dispatch(
      updateProjectDraft({
        projectId: id,
        payload: buildDraftPayload(),
      }),
    );

    if (updateProjectDraft.rejected.match(resultAction)) {
      window.alert(resultAction.payload || "Gagal menyimpan project.");
      return;
    }

    setShowResultCard(false);
    navigate("/report-list");
  };

  const handleSendChat = async (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage || chatSending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedMessage,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setChatSending(true);
    setChatError("");

    try {
      const response = await api.post(CHATBOT_ENDPOINT(id), { message: trimmedMessage });
      const replyText =
        response?.data?.text ||
        response?.text ||
        response?.data?.content ||
        "AI Helpy belum memberikan jawaban.";

      setChatMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: replyText,
        },
      ]);
      setChatLoaded(true);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: "Maaf, AI Helpy belum bisa merespons sekarang.",
        },
      ]);
      setChatError(error?.data?.message || error?.message || "Pesan belum berhasil dikirim ke backend.");
    } finally {
      setChatSending(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="Project List" />

      <main className={`main-content ${isChatOpen ? "shrink" : ""}`}>
        <div className="header">
          <div>
            <h1>Edit Data</h1>
            <p>
              Edit hasil generate AI untuk {currentDraft?.projectName || "project ini"}, lalu simpan perubahan
              sesuai kebutuhanmu.
            </p>
          </div>
        </div>

        {loading && <p>Loading project draft...</p>}
        {error && <p className="edit-data-error">{error}</p>}

        {!loading && (
        <>
        {currentDraft && (
          <div className="draft-overview-grid">
            <div className="draft-overview-card">
              <span>Status</span>
              <strong>{String(currentDraft?.status || "-").replaceAll("_", " ")}</strong>
            </div>
            <div className="draft-overview-card">
              <span>Calculated Scale</span>
              <strong>{currentDraft?.calculatedScale || "-"}</strong>
            </div>
            <div className="draft-overview-card">
              <span>McFarlan Quadrant</span>
              <strong>{currentDraft?.mcfarlan?.quadrant || "-"}</strong>
            </div>
            <div className="draft-overview-card">
              <span>Expires At</span>
              <strong>
                {currentDraft?.expiresAt
                  ? new Intl.DateTimeFormat("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(currentDraft.expiresAt))
                  : "-"}
              </strong>
            </div>
          </div>
        )}

        <div className="edit-grid">
          {sections.map((section) => (
            <div className="input-card" key={section.id}>
              <div className="card-header">
                <div>
                  <h3>{section.title}</h3>
                  <p className="card-subtitle">Tambahkan item yang benar-benar ingin dihitung.</p>
                </div>
                <button type="button" className="add-row-btn" onClick={() => handleAddRow(section.id)}>
                  Add Item
                </button>
              </div>

              <div className="section-rows">
                {section.rows.map((row, index) => (
                  <div className="section-row" key={row.id}>
                    <div className="row-head">
                      <span>{section.title} Item {index + 1}</span>
                      <button
                        type="button"
                        className="delete-row-btn"
                        onClick={() => handleDeleteRow(section.id, row.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="input-group">
                      <label>Item</label>
                      <input
                        type="text"
                        placeholder={`Contoh ${section.title} item`}
                        value={row.item}
                        onChange={(event) => handleFieldChange(section.id, row.id, "item", event.target.value)}
                      />

                      <label>Description</label>
                      <textarea
                        rows="3"
                        placeholder="Tambahkan deskripsi item"
                        value={row.description}
                        onChange={(event) => handleFieldChange(section.id, row.id, "description", event.target.value)}
                      />

                      <label>Nominal</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="Masukkan nominal"
                        value={row.nominal}
                        onChange={(event) => handleFieldChange(section.id, row.id, "nominal", event.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        </>
        )}

        {!loading && (
        <div className="footer-actions">
          <button className="btn-save" onClick={handleSave}>
            Save Changes
          </button>

          <div className="ai-trigger" onClick={() => setIsChatOpen(true)}>
            <div className="ai-icon">AI</div>
            <span>AI Helpy</span>
          </div>
        </div>
        )}
      </main>

      <div className={`ai-chat ${isChatOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-title">
            AI <span>Helpy</span>
          </div>

          <button onClick={() => setIsChatOpen(false)}>x</button>
        </div>

        <div className="chat-body">
          {chatLoading ? <p className="chat-state">Loading chat history...</p> : null}
          {!chatLoading && chatMessages.length === 0 ? (
            <p className="chat-state">Belum ada chat history. Coba mulai pertanyaan baru.</p>
          ) : null}
          {chatMessages.map((message) => (
            <div key={message.id} className={`chat-message ${message.role}`}>
              <span className="chat-role">{message.role === "user" ? "You" : "AI Helpy"}</span>
              <p>{message.content}</p>
            </div>
          ))}
          {chatError ? <p className="chat-error">{chatError}</p> : null}
        </div>

        <form className="chat-footer" onSubmit={handleSendChat}>
          <input
            type="text"
            placeholder="Ask anything you need..."
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            disabled={chatSending}
          />
          <button type="submit" className="chat-send-btn" disabled={chatSending || !chatInput.trim()}>
            {chatSending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      <div className="pdf-export-stage" aria-hidden="true">
        <div className="pdf-export-page" ref={pdfExportRef}>
          <div className="pdf-export-columns">
            <section className="pdf-export-column">
              <div className="pdf-export-hero">
                <img src={invesTechyLogo} alt="InvesTechy" className="pdf-export-logo" />
                <h1>{String(exportProjectName).toUpperCase()}</h1>
                <p>Executive Summary</p>
              </div>

              <div className="pdf-card pdf-overview-card">
                <h3>Project Overview</h3>
                <div className="pdf-kv-list">
                  <div><span>Project Name</span><strong>{exportProjectName}</strong></div>
                  <div><span>Industry</span><strong>{exportIndustry}</strong></div>
                  <div><span>Scale</span><strong>{exportScale}</strong></div>
                  <div><span>Plan</span><strong>{exportPlan}</strong></div>
                  <div><span>Location</span><strong>{exportLocation}</strong></div>
                </div>
              </div>

              <div className="pdf-card">
                <h3>McFarlan Matrix</h3>
                <div className="pdf-matrix-box">
                  <div className="pdf-matrix-grid">
                    <span>Factory</span>
                    <span>Strategic</span>
                    <span>Support</span>
                    <span>Turnaround</span>
                    <div
                      className="pdf-matrix-point"
                      style={{
                        left: `${Math.min((Number(exportCoordinates?.x) || 0) * 20, 100)}%`,
                        top: `${100 - Math.min((Number(exportCoordinates?.y) || 0) * 20, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="pdf-matrix-footer">
                    <strong>{exportQuadrant}</strong>
                    <span>
                      Coordinate: ({formatShortNumber(exportCoordinates?.x || 0)}, {formatShortNumber(exportCoordinates?.y || 0)})
                    </span>
                  </div>
                </div>
              </div>

              <div className="pdf-card pdf-scores-card">
                <h3>Business Domain Scores</h3>
                <div className="pdf-score-list">
                  {Object.entries(businessScores).slice(0, 4).map(([label, value]) => (
                    <div key={label} className="pdf-score-row">
                      <span>{label}</span>
                      <div className="pdf-score-bar"><i style={{ width: `${((Number(value) || 0) / 5) * 100}%` }} /></div>
                      <strong>{formatShortNumber(value)}</strong>
                    </div>
                  ))}
                </div>
                <h3 className="pdf-subheading">Technology Domain Scores</h3>
                <div className="pdf-score-list">
                  {Object.entries(technologyScores).slice(0, 4).map(([label, value]) => (
                    <div key={label} className="pdf-score-row">
                      <span>{label}</span>
                      <div className="pdf-score-bar"><i style={{ width: `${((Number(value) || 0) / 5) * 100}%` }} /></div>
                      <strong>{formatShortNumber(value)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pdf-card pdf-insight-card">
                <h3>Key Insight</h3>
                <p>{exportInsight}</p>
              </div>
            </section>

            <section className="pdf-export-column">
              <div className="pdf-section-head">
                <img src={invesTechyLogo} alt="InvesTechy" className="pdf-export-logo small" />
                <div>
                  <h2>FINANCIAL BREAKDOWN</h2>
                  <p>Investment & Benefit Analysis</p>
                </div>
              </div>

              <div className="pdf-card">
                <h3>CAPEX (Capital Expenditure)</h3>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Nominal</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {capexRows.slice(0, 4).map((row) => (
                      <tr key={row.id}>
                        <td>{row.item || "-"}</td>
                        <td>{formatCurrencyText(row.nominal)}</td>
                        <td>{row.description || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pdf-total-row">
                  <span>Total CAPEX</span>
                  <strong>{formatCurrencyText(summary.capex)}</strong>
                </div>
              </div>

              <div className="pdf-card">
                <h3>OPEX (Operational Expenditure)</h3>
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Nominal</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opexRows.slice(0, 4).map((row) => (
                      <tr key={row.id}>
                        <td>{row.item || "-"}</td>
                        <td>{formatCurrencyText(row.nominal)}</td>
                        <td>{row.description || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pdf-total-row">
                  <span>Total OPEX</span>
                  <strong>{formatCurrencyText(summary.opex)}</strong>
                </div>
              </div>

              <div className="pdf-card">
                <h3>Benefits Overview</h3>
                <div className="pdf-benefit-grid">
                  <div className="pdf-benefit-card">
                    <span>Tangible Benefits</span>
                    <strong>{formatCurrencyText(summary.tangible)}</strong>
                    <small>{tangibleRows[0]?.item || "Operational gains"}</small>
                  </div>
                  <div className="pdf-benefit-card">
                    <span>Intangible Benefits</span>
                    <strong>{formatCurrencyText(summary.intangible)}</strong>
                    <small>{intangibleRows[0]?.item || "Strategic value"}</small>
                  </div>
                </div>
                <div className="pdf-total-row">
                  <span>Total Benefits</span>
                  <strong>{formatCurrencyText(summary.benefit)}</strong>
                </div>
              </div>
            </section>

            <section className="pdf-export-column">
              <div className="pdf-section-head">
                <img src={invesTechyLogo} alt="InvesTechy" className="pdf-export-logo small" />
                <div>
                  <h2>SIMULATION & FEASIBILITY</h2>
                  <p>{latestSimulation?.scenarioName || "Current Scenario"}</p>
                </div>
              </div>

              <div className="pdf-card">
                <h3>Financial Results</h3>
                <div className="pdf-metric-list">
                  <div className="pdf-metric-row"><span>NPV</span><strong>{formatCurrencyText(financialResults?.npv || summary.total)}</strong></div>
                  <div className="pdf-metric-row"><span>ROI</span><strong>{formatShortNumber(financialResults?.roi || 0)}%</strong></div>
                  <div className="pdf-metric-row"><span>Payback Period</span><strong>{formatShortNumber(financialResults?.paybackPeriod || 0)} Years</strong></div>
                  <div className="pdf-metric-row"><span>Break Even</span><strong>Year {formatShortNumber(financialResults?.breakEvenYear || 0)}</strong></div>
                  <div className="pdf-metric-row"><span>IE Score</span><strong>{formatShortNumber(financialResults?.ieScore || 0)}</strong></div>
                  <div className="pdf-metric-row"><span>Feasibility</span><strong>{exportFeasibility}</strong></div>
                </div>
              </div>

              <div className="pdf-card">
                <h3>Simulation Settings</h3>
                <div className="pdf-kv-list compact">
                  <div><span>Inflation Rate</span><strong>{formatShortNumber((simulationSettings?.inflationRate || 0) * 100)}%</strong></div>
                  <div><span>Tax Rate</span><strong>{formatShortNumber((simulationSettings?.taxRate || 0) * 100)}%</strong></div>
                  <div><span>Discount Rate</span><strong>{formatShortNumber((simulationSettings?.discountRate || 0) * 100)}%</strong></div>
                  <div><span>Projection Years</span><strong>{formatShortNumber(simulationSettings?.years || 3)}</strong></div>
                </div>
              </div>

              <div className="pdf-card">
                <h3>Break-Even Table</h3>
                <table className="pdf-table small">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Net Cash Flow</th>
                      <th>Cumulative Cash Flow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakEvenRows.slice(0, 3).map((row, index) => (
                      <tr key={`${row?.year || index}`}>
                        <td>Year {row?.year || index + 1}</td>
                        <td>{formatCurrencyText(row?.net)}</td>
                        <td>
                          {formatCurrencyText(
                            (Number(row?.cumulativeBenefit) || 0) - (Number(row?.cumulativeCost) || 0),
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pdf-card pdf-conclusion-card">
                <h3>Conclusion</h3>
                <p>
                  {String(exportFeasibility).toLowerCase().includes("need")
                    ? "Project masih perlu penyesuaian tambahan sebelum implementasi penuh."
                    : `Project menunjukkan hasil yang baik dengan ROI ${formatShortNumber(financialResults?.roi || 0)}% dan payback period ${formatShortNumber(financialResults?.paybackPeriod || 0)} tahun.`}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showResultCard && (
        <div className="result-overlay" onClick={() => setShowResultCard(false)}>
          <div className="result-card" onClick={(event) => event.stopPropagation()}>
            <span className="result-badge">{summary.status}</span>
            <h2>Result Summary</h2>
            <p>Hasil ini langsung dihitung dari data yang baru saja kamu isi di halaman edit.</p>

            <div className="result-grid">
              <div className="result-item">
                <span>CAPEX</span>
                <strong>{formatCurrency(summary.capex)}</strong>
              </div>
              <div className="result-item">
                <span>OPEX</span>
                <strong>{formatCurrency(summary.opex)}</strong>
              </div>
              <div className="result-item">
                <span>Tangible Results</span>
                <strong>{formatCurrency(summary.tangible)}</strong>
              </div>
              <div className="result-item">
                <span>Intangible Results</span>
                <strong>{formatCurrency(summary.intangible)}</strong>
              </div>
            </div>

            <div className="result-detail-list">
              {filledRows.map((row) => (
                <div className="result-detail-row" key={`${row.title}-${row.id}`}>
                  <div>
                    <span>{row.title}</span>
                    <strong>{row.item || "Untitled Item"}</strong>
                    {row.description ? <small>{row.description}</small> : null}
                  </div>
                  <b>{formatCurrency(row.nominal)}</b>
                </div>
              ))}
            </div>

            <div className="result-actions">
              <button
                type="button"
                className="btn-result secondary"
                onClick={() => setShowResultCard(false)}
              >
                Back
              </button>
              <button type="button" className="btn-result muted" onClick={handleSaveProject}>
                {loading ? "Saving..." : "Save Project"}
              </button>
              <button type="button" className="btn-result primary" onClick={handleExportPdf}>
                Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
