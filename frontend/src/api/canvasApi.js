import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const initializeCanvas = (width, height) => {
  return apiClient.post("/api/canvas/initialize", { width, height });
};

export const addElement = (formData) => {
  return apiClient.post("/api/canvas/elements", formData);
};

export const getPreviewUrl = async () => {
  const response = await apiClient.get("/api/canvas/preview", {
    responseType: "blob",
  });
  const url = URL.createObjectURL(response.data);
  return `${url}#t=${Date.now()}`;
};

export const exportPdf = async (quality = 1.0) => {
  const response = await apiClient.get(
    `/api/canvas/export/pdf?quality=${quality}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

export const undo = () => {
  return apiClient.post("/api/canvas/undo");
};

export const redo = () => {
  return apiClient.post("/api/canvas/redo");
};
