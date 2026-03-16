import { AxiosError } from "axios";
import { api } from '../api';
import { CreateUsersResponse } from "../../types/users/createUsers";

export async function createUsers(username: string): Promise<CreateUsersResponse> {
  try {
    const response = await api.post('/users/create', {
      username
    });

   return {
    username: response.data,
    status: response.status,
   }
  } catch (error) {
    const status =
      error instanceof AxiosError
        ? error.response?.status ?? 500
        : 500;

    return {
      username: null,
      status,
    }
  }
}
