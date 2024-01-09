import axios from "axios";

export const checkAccess = async () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios
    .get(`${import.meta.env.VITE_API_URI}/users`, config)
    .then((response) => {
      if (response.status === 200) {
        true;
      } else {
        false;
      }
    });
};
