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
export const getLinkData = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/user/links?search=${localStorage.getItem("input")}&page=${localStorage.getItem("currentPage") || 1 }&limit=${limit}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
        },
      }
    );
    
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

export const getLinkDetailsData = async (page = 1, limit = 5) => {
  try {
    const response = await fetch(`${BACKEND_URL}/links/details?page=${page}&limit=${limit}`, {
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

export const userData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user/data`, {
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

export const userUpdate = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user/update`, {
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

export const updatetLink = async (data,id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/updateLink/${id}`, {
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
export const deleteLinkById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/deleteLink/${id}`, {
      method: "DELETE",
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


export const deleteUser = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user/delete`, {
      method: "DELETE",
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

export const allLinks = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/link/allLink`, {
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

export const allLinksDetails = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/link/allLinksdetails`, {
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
