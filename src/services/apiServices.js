import axiosService from "../api/axiosService";
export const checkUserAPI = async (email) => {
  return await axiosService(
    "GET",
    `/users?email=${email}`,
    {}
  );
};

export const registerUserAPI = async (userDetails) => {
  return await axiosService(
    "POST",
    "/users",
    userDetails
  );
};

export const loginUserAPI = async (email, password) => {
  return await axiosService(
    "GET",
    `/users?email=${email}&password=${password}`,
    {}
  );
};
export const getAllHabitsAPI = async (userId) => {
  return await axiosService(
    "GET",
    `/habit?userId=${userId}`,
    {}
  );
};

export const addHabitAPI = async (habitDetails) => {
  return await axiosService(
    "POST",
    "/habit",
    habitDetails
  );
};

export const viewHabitAPI = async (id) => {
  return await axiosService(
    "GET",
    `/habit/${id}`,
    {}
  );
};

export const updateHabitAPI = async (id, habitDetails) => {
  return await axiosService(
    "PATCH",
    `/habit/${id}`,
    habitDetails
  );
};

export const deleteHabitAPI = async (id) => {
  return await axiosService(
    "DELETE",
    `/habit/${id}`,
    {}
  );
};

export const completeHabitAPI = async (id, completionDates) => {
  return await axiosService(
    "PATCH",
    `/habit/${id}`,
    { completionDates }
  );
};