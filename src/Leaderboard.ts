async function fetchLeaderboardData<T>(): Promise<T> {
  return fetch(`${import.meta.env.VITE_DOMAIN}/api/forms`, {
    method: "GET",
  })
    .then((response: Response) => response.json())
    .then((data) => data)
    .catch((error) => Promise.reject(error));
}

export default fetchLeaderboardData;
