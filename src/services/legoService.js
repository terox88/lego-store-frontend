import api from "../api/axios";

const API_URL = "/api/lego-sets";

export const getAllLegoSets = (params) => {
    return api.get("/api/lego-sets", { params });
};

export const getLegoSetById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

export const createLegoSet = (data) => {
    return api.post(API_URL, data);
};

export const updateLegoSet = (id, data) => {
    return api.put(`${API_URL}/${id}`, data);
};

export const deleteLegoSet = (id) => {
    return api.delete(`${API_URL}/${id}`);
};