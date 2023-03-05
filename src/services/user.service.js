import axios from "axios";

export default {
  getMe(token) {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/single`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
  },
};
