import axios from "axios";

export async function getUsers() {
  try {
    const {data}: any = await axios.get('http://localhost:3001/users')
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

export async function getTransactions(id: string) {
  try {
    const {data}: any = await axios.get(`http://localhost:3001/transactions/all/${id}`)
      .catch(function (error) {
      console.error(error);
    });
    return data
  } catch (error) {
    console.log(error);
    
  }
}