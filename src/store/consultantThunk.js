import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const CONSULTANT_OVERRIDES_KEY = "investechy_consultant_overrides";

const getConsultantId = (consultant) => consultant?.id ?? consultant?._id ?? null;

const extractResponseData = (response) => response?.data ?? response;

const normalizeConsultantOverride = (consultant = {}) => {
  const normalizedConsultant = { ...consultant };
  const primaryPhoto =
    normalizedConsultant.photo ??
    normalizedConsultant.photoUrl ??
    normalizedConsultant.image ??
    normalizedConsultant.foto ??
    null;

  if (primaryPhoto) {
    normalizedConsultant.photo = primaryPhoto;
  }

  delete normalizedConsultant.photoUrl;
  delete normalizedConsultant.image;
  delete normalizedConsultant.foto;

  return normalizedConsultant;
};

const normalizeOverrideMap = (overrideMap = {}) =>
  Object.fromEntries(
    Object.entries(overrideMap).map(([consultantId, consultant]) => [
      consultantId,
      normalizeConsultantOverride(consultant),
    ]),
  );

const persistOverrideMap = (overrideMap) => {
  window.localStorage.setItem(
    CONSULTANT_OVERRIDES_KEY,
    JSON.stringify(normalizeOverrideMap(overrideMap)),
  );
};

const loadConsultantOverrides = () => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(CONSULTANT_OVERRIDES_KEY);
    const parsedValue = rawValue ? JSON.parse(rawValue) : {};
    const normalizedValue = normalizeOverrideMap(parsedValue);

    if (rawValue && JSON.stringify(parsedValue) !== JSON.stringify(normalizedValue)) {
      persistOverrideMap(normalizedValue);
    }

    return normalizedValue;
  } catch {
    return {};
  }
};

const saveConsultantOverride = (consultant) => {
  const consultantId = getConsultantId(consultant);
  if (typeof window === "undefined" || !consultantId) {
    return;
  }

  const existingOverrides = loadConsultantOverrides();
  existingOverrides[consultantId] = {
    ...(existingOverrides[consultantId] || {}),
    ...normalizeConsultantOverride(consultant),
  };

  persistOverrideMap(existingOverrides);
};

const applyConsultantOverride = (consultant) => {
  const consultantId = getConsultantId(consultant);
  if (!consultantId) {
    return consultant;
  }

  const overrides = loadConsultantOverrides();
  return overrides[consultantId]
    ? {
        ...consultant,
        ...overrides[consultantId],
      }
    : consultant;
};

const normalizeConsultantCollection = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.consultants)) {
    return responseData.consultants;
  }

  if (Array.isArray(responseData?.items)) {
    return responseData.items;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  return [];
};

const normalizeConsultantItem = (responseData) => {
  if (!responseData || typeof responseData !== "object") {
    return responseData;
  }

  if (responseData.data && typeof responseData.data === "object" && !Array.isArray(responseData.data)) {
    return responseData.data;
  }

  return responseData;
};

const hasMeaningfulValue = (value) =>
  value !== undefined && value !== null && value !== "";

const mergeConsultantPayload = (responseData, payload = {}, fallbackId = null) => {
  if (!responseData || typeof responseData !== "object") {
    return responseData;
  }

  const preferredSpesialisasi = hasMeaningfulValue(payload.spesialisasi)
    ? payload.spesialisasi
    : responseData.spesialisasi;
  const preferredWhatsapp = hasMeaningfulValue(payload.whatsapp)
    ? payload.whatsapp
    : responseData.whatsapp;
  const preferredNomorWhatsapp = hasMeaningfulValue(payload.nomor_whatsapp)
    ? payload.nomor_whatsapp
    : responseData.nomor_whatsapp;
  const preferredHargaPerSesi = hasMeaningfulValue(payload.harga_per_sesi)
    ? payload.harga_per_sesi
    : responseData.harga_per_sesi ??
      responseData.sessionFee ??
      responseData.perSessionFee ??
      responseData.fee ??
      responseData.price ??
      responseData.harga;
  const preferredSessionFee = hasMeaningfulValue(payload.sessionFee)
    ? payload.sessionFee
    : responseData.sessionFee ??
      responseData.harga_per_sesi ??
      responseData.perSessionFee ??
      responseData.fee ??
      responseData.price ??
      responseData.harga;
  const preferredPerSessionFee = hasMeaningfulValue(payload.perSessionFee)
    ? payload.perSessionFee
    : responseData.perSessionFee ??
      responseData.harga_per_sesi ??
      responseData.sessionFee ??
      responseData.fee ??
      responseData.price ??
      responseData.harga;
  const preferredFee = hasMeaningfulValue(payload.fee)
    ? payload.fee
    : responseData.fee ??
      responseData.harga_per_sesi ??
      responseData.sessionFee ??
      responseData.perSessionFee ??
      responseData.price ??
      responseData.harga;
  const preferredPrice = hasMeaningfulValue(payload.price)
    ? payload.price
    : responseData.price ??
      responseData.harga_per_sesi ??
      responseData.sessionFee ??
      responseData.perSessionFee ??
      responseData.fee ??
      responseData.harga;
  const preferredHarga = hasMeaningfulValue(payload.harga)
    ? payload.harga
    : responseData.harga ??
      responseData.harga_per_sesi ??
      responseData.sessionFee ??
      responseData.perSessionFee ??
      responseData.fee ??
      responseData.price;
  const preferredPhoto =
    payload.photo ??
    payload.photoUrl ??
    payload.image ??
    payload.foto ??
    responseData.photo ??
    responseData.photoUrl ??
    responseData.image ??
    responseData.foto;

  const mergedConsultant = {
    ...payload,
    ...responseData,
    ...(fallbackId ? { id: getConsultantId(responseData) ?? fallbackId } : {}),
    spesialisasi: preferredSpesialisasi,
    whatsapp: preferredWhatsapp,
    nomor_whatsapp: preferredNomorWhatsapp,
    harga_per_sesi: preferredHargaPerSesi,
    sessionFee: preferredSessionFee,
    perSessionFee: preferredPerSessionFee,
    fee: preferredFee,
    price: preferredPrice,
    harga: preferredHarga,
    photo: preferredPhoto,
    photoUrl: preferredPhoto,
    image: preferredPhoto,
    foto: preferredPhoto,
  };

  saveConsultantOverride(mergedConsultant);
  return mergedConsultant;
};

const formatConsultantError = (error) => {
  const details = error?.data;

  if (Array.isArray(details?.errors) && details.errors.length > 0) {
    return details.errors
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        const field = item?.path || item?.field || item?.key;
        const message = item?.message || item?.msg;
        return [field, message].filter(Boolean).join(": ");
      })
      .filter(Boolean)
      .join(" | ");
  }

  if (Array.isArray(details?.details) && details.details.length > 0) {
    return details.details
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        return item?.message || JSON.stringify(item);
      })
      .join(" | ");
  }

  if (typeof details?.error === "string" && typeof details?.message === "string") {
    return `${details.error}: ${details.message}`;
  }

  if (typeof details?.message === "string") {
    return details.message;
  }

  if (typeof details === "string" && details.trim()) {
    return details;
  }

  return error?.message || "Request failed.";
};

export const fetchConsultants = createAsyncThunk(
  "consultant/fetchConsultants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/consultants");
      const consultants = normalizeConsultantCollection(extractResponseData(response));
      return consultants.map(applyConsultantOverride);
    } catch (error) {
      return rejectWithValue(formatConsultantError(error));
    }
  },
);

export const fetchConsultantById = createAsyncThunk(
  "consultant/fetchConsultantById",
  async (consultantId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/consultants/${consultantId}`);
      return applyConsultantOverride(normalizeConsultantItem(extractResponseData(response)));
    } catch (error) {
      return rejectWithValue(formatConsultantError(error));
    }
  },
);

export const createConsultant = createAsyncThunk(
  "consultant/createConsultant",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/consultants", payload);
      return mergeConsultantPayload(normalizeConsultantItem(extractResponseData(response)), payload);
    } catch (error) {
      return rejectWithValue(formatConsultantError(error));
    }
  },
);

export const updateConsultant = createAsyncThunk(
  "consultant/updateConsultant",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/consultants/${id}`, payload);
      return mergeConsultantPayload(normalizeConsultantItem(extractResponseData(response)), payload, id);
    } catch (error) {
      return rejectWithValue(formatConsultantError(error));
    }
  },
);

export const deleteConsultant = createAsyncThunk(
  "consultant/deleteConsultant",
  async (consultantId, { rejectWithValue }) => {
    try {
      await api.delete(`/consultants/${consultantId}`);
      return consultantId;
    } catch (error) {
      return rejectWithValue(formatConsultantError(error));
    }
  },
);
