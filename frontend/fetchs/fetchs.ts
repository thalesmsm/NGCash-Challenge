import axios from "axios";

const API_URL = 'http://localhost:3001/users';

export async function getUsers() {
  const {data}: any = await axios.get(API_URL);
  return data
}
