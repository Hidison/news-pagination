const BASE_URL = "http://hn.algolia.com/api/v1/search?";

export const getPosts = (query, page) => {
  return fetch(`${BASE_URL}query=${query}&page=${page - 1}`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err) => Promise.reject(err));
    }
  });
};
