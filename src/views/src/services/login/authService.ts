import { AxiosError } from "axios";
import { api } from "../api";
import { LoginResponse } from "../../types/login/auth";

export async function login(username: string): Promise<LoginResponse> {
  try {
    const response = await api.post("/auth/login", {
      username,
    });

    return {
      token: response.data,
      status: response.status,
    };
  } catch (error) {
    const status =
      error instanceof AxiosError
        ? error.response?.status ?? 500
        : 500;

    return {
      token: null,
      status,
    };
  }
}
