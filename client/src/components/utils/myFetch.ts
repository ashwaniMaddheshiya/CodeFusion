/**
 * A reusable fetch function that takes a URL and options, and returns response data.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - Additional fetch options (method, headers, body, etc.).
 * @returns {Promise<any>} - The parsed response data or an error object.
 */
const myFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default myFetch;
