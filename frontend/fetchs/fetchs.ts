import axios from "axios";

const API_URL = 'http://localhost:3001/users';

export async function getUsers() {
  const {data}: any = await axios.get(API_URL)
    .catch(function (error) {
    console.error(error);
  });
  return data
}


export async function postUser(username: string, password: string) {
  return await axios.post(API_URL, {
    username,
    password,
  })
  .catch(function (error) {
    console.error(error);
  });
}