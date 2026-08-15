const API_URL = import.meta.env.VITE_API_URL;

export interface UrlData {
  id: string;
  url: string;
  shortCode: string;
  accessCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface Statistics {
  accessCount: number;
}

/* =========================
   CREATE
========================= */

export const createShortUrl = async (
  url: string
): Promise<UrlData> => {
  const response = await fetch(`${API_URL}/api/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
    }),
  });

  const result: ApiResponse<UrlData> = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create short URL"
    );
  }

  return result.data;
};

/* =========================
   GET ALL
========================= */

export const getAllShortUrls = async (): Promise<UrlData[]> => {
  const response = await fetch(`${API_URL}/api/shorten`);

  const result: ApiResponse<UrlData[]> = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to retrieve short URLs"
    );
  }

  return result.data;
};

/* =========================
   RETRIEVE ONE
========================= */

export const getShortUrl = async (
  shortCode: string
): Promise<UrlData> => {
  const response = await fetch(
    `${API_URL}/api/shorten/${encodeURIComponent(shortCode)}`
  );

  const result: ApiResponse<UrlData> = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "URL not found"
    );
  }

  return result.data;
};

/* =========================
   UPDATE
========================= */

export const updateShortUrl = async (
  shortCode: string,
  url: string
): Promise<UrlData> => {
  const response = await fetch(
    `${API_URL}/api/shorten/${encodeURIComponent(shortCode)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    }
  );

  const result: ApiResponse<UrlData> = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update URL"
    );
  }

  return result.data;
};

/* =========================
   DELETE
========================= */

export const deleteShortUrl = async (
  shortCode: string
): Promise<string> => {
  const response = await fetch(
    `${API_URL}/api/shorten/${encodeURIComponent(shortCode)}`,
    {
      method: "DELETE",
    }
  );

  const result: ApiResponse<null> = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete URL"
    );
  }

  return result.message;
};

/* =========================
   STATISTICS
========================= */

export const getStatistics = async (
  shortCode: string
): Promise<Statistics> => {
  const response = await fetch(
    `${API_URL}/api/shorten/${encodeURIComponent(shortCode)}/stats`
  );

  const result: ApiResponse<Statistics> =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to retrieve statistics"
    );
  }

  return result.data;
};

export const getRedirectUrl = (
  shortCode: string
): string => {
  return `${API_URL}/api/${encodeURIComponent(shortCode)}/redirect`;
};