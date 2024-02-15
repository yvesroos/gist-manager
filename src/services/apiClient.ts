import { getCookie } from "../utils/cookie";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  }

  async get<T>(endpoint: string): Promise<T> {
    const accessToken = getCookie("accessToken");
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return this.handleResponse(response);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const accessToken = getCookie("accessToken");
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }
}

export default new ApiClient(import.meta.env.VITE_GITHUB_GISTS_API_URL);
