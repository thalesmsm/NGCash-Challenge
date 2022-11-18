import axios from "axios";

const API_URL = 'http://localhost:3001/users';

export async function getUsers() {
  try {
    const {data}: any = await axios.get(API_URL)
      .catch(function (error) {
      console.error(error);
    });
    return data
  } catch (error) {
    console.log(error);
    
  }
}


export async function postUser(username: string, password: string) {
  try {
    return await axios.post('http://localhost:3001/register', {
      username,
      password,
    })
    .catch(function (error) {
      console.error(error);
    });
  } catch (error) {
    console.log(error);
    
  }
}