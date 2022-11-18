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

export async function login(username: string, password: string) {
  try {
    const {data}: any =  await axios.post('http://localhost:3001/login', {
      username,
      password,
    })
    .catch(function (error) {
      console.error(error);
    });
    return data.token as string;
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

export async function getTransactions(id: number, token: string){
  try {
    const r = await axios.get(`http://localhost:3001/transaction/all/${id}`, {
      headers: {
        'Authorization': token
      }
    }).then((res) => {
      // console.log(res.data);
      return res.data
    })
    .catch((error) => {
      console.error(error)
    });
    return r;
  } catch (error) {
    console.log(error);
    
  }
}
