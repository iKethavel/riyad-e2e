import { defineConfig } from "@playwright/test";
export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    baseURL: "http://localhost:4000/api/v1",
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      // Accept: "application/vnd.github.v3+json",
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      // Authorization: `token ${process.env.API_TOKEN}`,
    },
  },
});
