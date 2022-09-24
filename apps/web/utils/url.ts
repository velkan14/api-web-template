export const API_BASE_URL =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_URL
    : "http://localhost:3001/api/v1";
