import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const extractResponseData = (response) => response?.data ?? response;
const mergeConsultantPayload = (responseData, payload = {}) => {
  if (!responseData || typeof responseData !== "object") {
    return responseData;
  }

  return {
    ...payload,
    ...responseData,
    spesialisasi: responseData.spesialisasi ?? payload.spesialisasi,
    harga:
      responseData.harga ??
      responseData.fee ??
      responseData.price ??
      payload.harga,
    fee:
      responseData.fee ??
      responseData.harga ??
      responseData.price ??
      payload.fee,
    price:
      responseData.price ??
      responseData.harga ??
      responseData.fee ??
      payload.price,
    photo:
      responseData.photo ??
      responseData.photoUrl ??
      responseData.image ??
      responseData.foto ??
      payload.photo,
    photoUrl:
      responseData.photoUrl ??
      responseData.photo ??
      responseData.image ??
      responseData.foto ??
      payload.photoUrl,
    image:
      responseData.image ??
      responseData.photo ??
      responseData.photoUrl ??
      responseData.foto ??
      payload.image,
    foto:
      responseData.foto ??
      responseData.photo ??
      responseData.photoUrl ??
      responseData.image ??
      payload.foto,
  };
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
      return extractResponseData(response) ?? [];
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
      return extractResponseData(response);
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
      return mergeConsultantPayload(extractResponseData(response), payload);
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
      return mergeConsultantPayload(extractResponseData(response), payload);
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
