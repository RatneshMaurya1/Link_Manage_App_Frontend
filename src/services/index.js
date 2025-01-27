const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const userSignUp = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
export const userSignIn = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
export const createShortLink = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
export const getLinkData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/user/links`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};