import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdmin from './admsidebar';
import { usePopup } from '../components/PopupProvider';
import { clearCurrentConsultant } from '../store/consultantSlice';
import {
  createConsultant,
  fetchConsultantById,
  fetchConsultants,
  updateConsultant,
} from '../store/consultantThunk';
import { useAdminPageTransition } from './useAdminPageTransition';
import './adminTransitions.css';
import './ConsultantForm.css';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  whatsapp: '',
  positions: [],
  positionInput: '',
  fee: '',
  photoPreview: null,
  photoValue: null,
};

const getConsultantFeeValue = (consultant) => {
  const rawFee =
    consultant?.harga_per_sesi ??
    consultant?.sessionFee ??
    consultant?.perSessionFee ??
    consultant?.fee ??
    consultant?.price ??
    consultant?.harga;

  if (typeof rawFee === 'number') {
    return rawFee.toString();
  }

  if (typeof rawFee === 'string') {
    const normalizedFee = rawFee.replace(/[^\d]/g, '');
    return normalizedFee || '';
  }

  return '';
};

const resizeImageToDataUrl = (file, maxWidth = 520, quality = 0.58) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const ratio = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);

        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Failed to process image.'));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };

      image.onerror = () => reject(new Error('Failed to read image.'));
      image.src = fileReader.result;
    };

    fileReader.onerror = () => reject(new Error('Failed to read image.'));
    fileReader.readAsDataURL(file);
  });

const splitName = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
};

const mapConsultantToFormData = (consultant) => {
  if (!consultant) {
    return EMPTY_FORM;
  }

  const { firstName, lastName } = splitName(
    consultant.nama ||
      [consultant.firstName, consultant.lastName].filter(Boolean).join(' '),
  );

  return {
    firstName,
    lastName,
    email: consultant.email?.replace?.('mailto:', '') || '',
    whatsapp: consultant.whatsapp || consultant.nomor_whatsapp || '',
    positions: Array.isArray(consultant.spesialisasi)
      ? consultant.spesialisasi.filter(Boolean)
      : consultant.spesialisasi
        ? [consultant.spesialisasi]
        : consultant.position
          ? [consultant.position]
          : [],
    positionInput: '',
    fee: getConsultantFeeValue(consultant),
    photoPreview: consultant.photo || consultant.photoUrl || null,
    photoValue: consultant.photo || consultant.photoUrl || null,
  };
};

const normalizePosition = (value = '') => value.trim().replace(/\s+/g, ' ');

const mapFormDataToPayload = (formData) => {
  const nama = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim();
  const harga = Number.parseInt(formData.fee.replace(/[^\d]/g, ''), 10);
  const spesialisasi = formData.positions.map(normalizePosition).filter(Boolean);
  const whatsapp = formData.whatsapp.trim();
  const normalizedEmail = formData.email.trim().replace(/^mailto:/i, '');
  const normalizedPhoto = formData.photoValue || null;

  return {
    nama,
    email: normalizedEmail ? `mailto:${normalizedEmail}` : '',
    ...(whatsapp ? { whatsapp, nomor_whatsapp: whatsapp } : {}),
    spesialisasi,
    harga: Number.isNaN(harga) ? 0 : harga,
    fee: Number.isNaN(harga) ? 0 : harga,
    price: Number.isNaN(harga) ? 0 : harga,
    harga_per_sesi: Number.isNaN(harga) ? 0 : harga,
    sessionFee: Number.isNaN(harga) ? 0 : harga,
    perSessionFee: Number.isNaN(harga) ? 0 : harga,
    ...(normalizedPhoto
      ? {
          photo: normalizedPhoto,
          photoUrl: normalizedPhoto,
          image: normalizedPhoto,
          foto: normalizedPhoto,
        }
      : {}),
  };
};

const ConsultantForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const popup = usePopup();
  const fileInputRef = useRef(null);
  const isEditMode = Boolean(id);
  const { items, currentItem, loading, saving, error } = useSelector((state) => state.consultant);
  const { transitionClassName, navigateWithTransition } = useAdminPageTransition();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const suggestedPositions = Array.from(
    new Set(
      items.flatMap((consultant) =>
        Array.isArray(consultant?.spesialisasi)
          ? consultant.spesialisasi
          : consultant?.spesialisasi
            ? [consultant.spesialisasi]
            : [],
      )
        .map(normalizePosition)
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchConsultants());
    }

    if (isEditMode) {
      dispatch(fetchConsultantById(id));
      return;
    }

    dispatch(clearCurrentConsultant());
    setFormData(EMPTY_FORM);
  }, [dispatch, id, isEditMode, items.length]);

  useEffect(() => {
    if (isEditMode && currentItem) {
      setFormData(mapConsultantToFormData(currentItem));
    }
  }, [currentItem, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPosition = () => {
    const nextPosition = normalizePosition(formData.positionInput);
    if (!nextPosition) {
      return;
    }

    setFormData((prev) => {
      if (prev.positions.some((item) => item.toLowerCase() === nextPosition.toLowerCase())) {
        return { ...prev, positionInput: '' };
      }

      return {
        ...prev,
        positions: [...prev.positions, nextPosition],
        positionInput: '',
      };
    });
  };

  const handleRemovePosition = (positionToRemove) => {
    setFormData((prev) => ({
      ...prev,
      positions: prev.positions.filter((item) => item !== positionToRemove),
    }));
  };

  const handlePositionKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPosition();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImageToDataUrl(file)
        .then((compressedImage) => {
          setFormData((prev) => ({
            ...prev,
            photoPreview: compressedImage,
            photoValue: compressedImage,
          }));
        })
        .catch(async (uploadError) => {
          await popup.alert({
            title: { id: 'Upload Gambar Gagal', en: 'Image Upload Failed' },
            message: uploadError.message || { id: 'Gagal memproses gambar.', en: 'Failed to process image.' },
            tone: 'danger',
          });
        });
    }
  };

  const handleDeletePhoto = () => {
    setFormData({ ...formData, photoPreview: null, photoValue: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = mapFormDataToPayload(formData);

    if (!payload.nama || !payload.email || payload.spesialisasi.length === 0) {
      await popup.alert({
        title: { id: 'Data Belum Lengkap', en: 'Incomplete Data' },
        message: {
          id: 'Lengkapi nama, email, dan posisi terlebih dahulu.',
          en: 'Please complete name, email, and position first.',
        },
        tone: 'danger',
      });
      return;
    }

    const action = isEditMode
      ? updateConsultant({ id, payload })
      : createConsultant(payload);

    const resultAction = await dispatch(action);
    if (!resultAction.type.endsWith('/rejected')) {
      popup.notify({
        title: isEditMode
          ? { id: 'Konsultan Diperbarui', en: 'Consultant Updated' }
          : { id: 'Konsultan Ditambahkan', en: 'Consultant Added' },
        message: isEditMode
          ? {
              id: 'Perubahan profil konsultan berhasil disimpan.',
              en: 'The consultant profile changes were saved successfully.',
            }
          : {
              id: 'Konsultan baru berhasil ditambahkan ke direktori.',
              en: 'A new consultant was added to the directory successfully.',
            },
      });
      navigateWithTransition('/admin/consultant');
    }
  };

  return (
    <div className="admin-page-layout">
      <SidebarAdmin activeMenu="Consultant" />
      
      <main className={`admin-content-area ${transitionClassName}`}>
        <header className="form-header-container">
          <h2 className="form-title">Consultant Profile</h2>
        </header>

        {loading && isEditMode && <p>Loading consultant data...</p>}
        {error && <p style={{ color: "#b42318" }}>{error}</p>}
        
        <form id="profileForm" className="profile-form-container" onSubmit={handleSubmit}>
          {/* Section Foto */}
          <div className="photo-section-group">
            <label className="input-label">Photo</label>
            <div className="photo-box-wrapper">
              <div className="photo-display-area" onClick={() => fileInputRef.current.click()}>
                {formData.photoPreview ? (
                  <img src={formData.photoPreview} alt="Preview" className="img-preview-fill" />
                ) : (
                  <div className="upload-placeholder">
                    <img src="https://img.icons8.com/?size=100&id=2445&format=png&color=BBBBBB" alt="icon" />
                    <span>Tap to upload</span>
                  </div>
                )}
              </div>
              
              {formData.photoPreview && (
                <div className="photo-action-container">
                  <button type="button" className="photo-btn edit-photo" onClick={() => fileInputRef.current.click()}>Edit Photo</button>
                  <button type="button" className="photo-btn delete-photo" onClick={handleDeletePhoto}>Delete Photo</button>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
          </div>

          {/* Grid Inputs */}
          <div className="inputs-grid-layout">
            <div className="input-group">
              <label className="input-label">First Name</label>
              <input type="text" name="firstName" placeholder="Your First Name" value={formData.firstName} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Last Name</label>
              <input type="text" name="lastName" placeholder="Your Last Name" value={formData.lastName} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="email" name="email" placeholder="Registered Email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">WhatsApp Number</label>
              <input type="text" name="whatsapp" placeholder="Enter Number (+62)" value={formData.whatsapp} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Position</label>
              <div className="position-editor">
                <div className="position-input-row">
                  <input
                    type="text"
                    name="positionInput"
                    list="consultant-position-options"
                    placeholder="Add a position then press Enter"
                    value={formData.positionInput}
                    onChange={handleInputChange}
                    onKeyDown={handlePositionKeyDown}
                  />
                  <button type="button" className="position-add-btn" onClick={handleAddPosition}>
                    Add
                  </button>
                </div>
                <datalist id="consultant-position-options">
                  {suggestedPositions.map((position) => (
                    <option key={position} value={position} />
                  ))}
                </datalist>
                <div className="position-chip-list">
                  {formData.positions.length === 0 && (
                    <span className="position-empty">No positions added yet.</span>
                  )}
                  {formData.positions.map((position) => (
                    <span key={position} className="position-chip">
                      {position}
                      <button
                        type="button"
                        className="position-chip-remove"
                        onClick={() => handleRemovePosition(position)}
                        aria-label={`Remove ${position}`}
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">per Session Fee</label>
              <input type="text" name="fee" placeholder="IDR" value={formData.fee} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-actions-bottom">
            <button
              type="button"
              className="btn-rect cancel"
              onClick={() => navigateWithTransition('/admin/consultant')}
              disabled={saving}
            >
              Cancel
            </button>
            <button type="submit" className="btn-rect save" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ConsultantForm;
