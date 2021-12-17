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
  return {
    url: url,
    data: {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      },
      body: JSON.stringify(body),
    },
  };
};

export { getDataFromAPI, postDataToAPI, updateDataToAPI };
