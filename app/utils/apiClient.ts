import axios from 'axios';
import apiCrypto from 'app/utils/apiCrypto';

const apiClient = {
  idCheck(userId: string) {
    const method: string = 'GET';
    const url: string = `/api/v1/user/${userId}/check`;

    axios
      .get(url, {
        headers: {
          Authentication: apiCrypto(method, url),
        },
        withCredentials: true,
      })
      .then((res) => console.log(res));
  },
};

export default apiClient;
