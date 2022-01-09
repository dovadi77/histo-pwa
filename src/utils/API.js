const getDataFromAPI = (url, token) => {
  return {
    url: url,
    data: {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};

const postDataToAPI = (url, body, token, isJson = true) => {
  let headers = {
    Authorization: `Bearer ${token}`,
  };
  if (isJson) headers["Content-Type"] = "application/json";
  return {
    url: url,
    data: {
      method: "post",
      headers,
      body: isJson ? JSON.stringify(body) : body,
    },
  };
};

const updateDataToAPI = (url, body, token) => {
  return {
    url: url,
    data: {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export { getDataFromAPI, postDataToAPI, updateDataToAPI };
