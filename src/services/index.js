import axios from 'axios'



export default {

 async login(data){
   return  await  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, data)
},


 async  registeruser(data) {
    return await  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/user/adduser/`, data)
}
}


