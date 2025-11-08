import api, { API_ENDPOINTS } from "../config/api";

const UserController = {
  getAllUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  createUser: async (data) => {
    const res = await api.post("/users", data);
    return res.data;
  },

  incrementCut: async (id, cutInfo) => {
    const res = await api.put(`/users/cut/${id}`, cutInfo);
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};

export default UserController;
