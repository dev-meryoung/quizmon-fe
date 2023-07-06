import axios, { AxiosResponse } from 'axios';
import apiCrypto from 'app/utils/apiCrypto';

interface ApiClient {
  baseUrl: string;
  idCheck: (userId: string) => Promise<any>;
  join: (userId: string, userPw: string) => Promise<any>;
}

// 클라이언트 API
const apiClient: ApiClient = {
  // 개발 단계에서 사용하는 baseUrl
  baseUrl: `http://${process.env.NEXT_PUBLIC_BASE_URL}`,
  /* 회원 관련 API */
  // 아이디 중복 여부 확인 API
  idCheck(userId) {
    const method: string = 'GET';
    const url: string = `/api/v1/user/${userId}/check`;
    const headers = {
      Authentication: apiCrypto(method, url),
    };

    return axios
      .get(`${this.baseUrl}${url}`, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 회원가입 API
  join(userId, userPw) {
    const method: string = 'POST';
    const url: string = `/api/v1/user`;
    const headers = {
      Authentication: apiCrypto(method, url),
    };
    const data: { id: string; password: string } = {
      id: userId,
      password: userPw,
    };

    return axios
      .post(`${this.baseUrl}${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },
};

export default apiClient;
