import http from "./apiPath";

const getAll = () => {
    return http.get("/inventory");
};

const getById = (id) => {
    return http.get(`/inventory/${id}`)
};

const create = (data) => {
    return http.post("/inventory", data);
};

const update = (id, data) => {
    return http.put(`/inventory/${id}`, data);
};

const trash = (id, data) => {
    return http.patch(`/inventory/${id}`, data);
};

const undoTrash = (id) => {
    return http.patch(`/trash/${id}`);
};

const viewTrash = () => {
    return http.get("/trash");
};

const viewTrashById = (id) => {
    return http.get(`/trash/${id}`);
};

const deleteById = (id) => {
    return http.delete(`/trash/${id}`);
};

const deleteAll = () => {
    return http.delete("/trash");
};

const Controllers = {
    getAll, getById, create, update, trash, undoTrash, viewTrash, viewTrashById, deleteById, deleteAll
};

export default Controllers;