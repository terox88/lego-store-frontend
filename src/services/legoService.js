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
export const increaseWarehouse = (id, amount) => {
    return api.patch(`/api/lego-sets/${id}/warehouse/increase`, { amount });
};

export const decreaseWarehouse = (id, amount) => {
    return api.patch(`/api/lego-sets/${id}/warehouse/decrease`, { amount });
};

export const increaseStore = (id, amount) => {
    return api.patch(`/api/lego-sets/${id}/store/increase`, { amount });
};

export const decreaseStore = (id, amount) => {
    return api.patch(`/api/lego-sets/${id}/store/decrease`, { amount });
};
