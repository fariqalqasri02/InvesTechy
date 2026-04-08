import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectDraft, updateProjectDraft } from "../store/projectThunk";
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

const buildSectionsFromDraft = (draft) => {
  const draftData = draft?.draft || draft;

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

const createPdfContent = (title, lines) => {
  const escapePdfText = (text) =>
    String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  const textCommands = lines
    .map((line, index) => `1 0 0 1 50 ${760 - index * 22} Tm (${escapePdfText(line)}) Tj`)
    .join("\n");

  const stream = `BT
/F1 18 Tf
1 0 0 1 50 800 Tm (${escapePdfText(title)}) Tj
/F1 12 Tf
${textCommands}
ET`;

  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
    `4 0 obj << /Length ${stream.length} >> stream
${stream}
endstream endobj`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref
0 ${objects.length + 1}
0000000000 65535 f 
${offsets
  .slice(1)
  .map((offset) => `${String(offset).padStart(10, "0")} 00000 n `)
  .join("\n")}
trailer << /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF`;

  return pdf;
};

export default function EditData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [sections, setSections] = useState(createInitialSections);
  const { currentDraft, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    document.body.classList.remove("page-exit");
    dispatch(fetchProjectDraft(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!currentDraft) return;
    setSections(buildSectionsFromDraft(currentDraft));
  }, [currentDraft]);

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

  const buildDraftPayload = () => {
    const mapRows = (title) =>
      sections
        .find((section) => section.title === title)
        ?.rows.map((row) => ({
          item: row.item?.trim() || "",
          description: row.description?.trim() || "",
          nominal: Number(row.nominal || 0),
        }))
        .filter((row) => row.item || row.description || row.nominal) || [];

    return {
      status: currentDraft?.status,
      draft: {
        capex: mapRows("CAPEX"),
        opex: mapRows("OPEX"),
        tangibleBenefits: mapRows("Tangible Results"),
        intangibleBenefits: mapRows("Intangible Results"),
      },
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
    const lines = [
      `Project ID: ${id}`,
      ...filledRows.map(
        (row) =>
          `${row.title} - ${row.item || "Untitled Item"}${row.description ? ` (${row.description})` : ""}: ${formatCurrency(row.nominal)}`,
      ),
      `CAPEX: ${formatCurrency(summary.capex)}`,
      `OPEX: ${formatCurrency(summary.opex)}`,
      `Tangible Results: ${formatCurrency(summary.tangible)}`,
      `Intangible Results: ${formatCurrency(summary.intangible)}`,
      `Projected Benefit: ${formatCurrency(summary.benefit)}`,
      `Total Value: ${formatCurrency(summary.total)}`,
      `Status: ${summary.status}`,
    ];

    const pdfContent = createPdfContent("Edit Data Result Summary", lines);
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `project-${id}-summary.pdf`;
    link.click();
    URL.revokeObjectURL(url);
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
                        type="text"
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
          <h2>What are you working on?</h2>
        </div>

        <div className="chat-footer">
          <input type="text" placeholder="Ask anything you need..." />
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
