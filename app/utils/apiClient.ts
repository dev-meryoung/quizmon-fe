import axios, { AxiosResponse } from 'axios';
import apiCrypto from 'app/utils/apiCrypto';

interface ApiClient {
  idCheck: (userId: string) => Promise<AxiosResponse>;
}

// 클라이언트 API
const apiClient: ApiClient = {
  /* 회원 관련 API */
  // 회원가입 시 해당 아이디의 존재 여부를 확인하는 API
  async idCheck(userId) {
    const method: string = 'GET';
    const url: string = `http://${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${userId}/check`;

    const data = await axios
      .get(url, {
        headers: {
          Authentication: apiCrypto(method, url),
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      });

    return data;
  },
};

export default apiClient;
