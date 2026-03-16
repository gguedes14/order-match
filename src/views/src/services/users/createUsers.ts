import { api } from '../api';

export async function createUsers(username: string) {
  const response = await api.post('/users/create', {
    username
  });

  return response.data;
}
