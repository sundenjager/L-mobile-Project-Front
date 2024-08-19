import axiosInstance from "./axiosInstance";

export const getItems = async () => {
  try {
    const response = await axiosInstance.get("/admin/users"); // Remplacez "/items" par l'URL correcte de votre API
    return response.data;
  } catch (error) {
    throw error.response.data || "Failed to fetch items";
  }
};

export const UpdateUser = async (updatedData) => {
  try {
    const response = await axiosInstance.put("/admin/update-user", updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update user";
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete user";
  }
};

export const changeUserRole = async (email, newRole) => {
  try {
    const response = await axiosInstance.post("/admin/change-role", {
      email,
      newRole,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to change user role";
  }
};
