let apiUrl: string = import.meta.env.VITE_API_URL || `${import.meta.env.SERVER_URL}`;

if (apiUrl.endsWith('/')) {
  apiUrl = apiUrl.slice(0, -1);
}

export default {
  apiUrl,
};
