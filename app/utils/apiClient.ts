import axios, { AxiosResponse } from 'axios';
import apiCrypto from 'app/utils/apiCrypto';

interface ApiClient {
  baseUrl: string;
  authorCheck: () => Promise<any>;
  idCheck: (userId: string) => Promise<any>;
  join: (userId: string, userPw: string) => Promise<any>;
  login: (userId: string, userPw: string) => Promise<any>;
  logout: (jwt: string | null) => Promise<any>;
}

// 클라이언트 API
const apiClient: ApiClient = {
  // 개발 단계에서 사용하는 baseUrl
  baseUrl: `http://${process.env.NEXT_PUBLIC_BASE_URL}`,
  /* 회원 관련 API */
  // 토큰 권한 확인 API
  authorCheck() {
    const method: string = 'GET';
    const url: string = `/api/v1/user/check`;
    const headers = {
      Authentication: apiCrypto(method, url),
    };

    return axios
      .get(`${url}`, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 아이디 중복 여부 확인 API
  idCheck(userId) {
    const method: string = 'GET';
    const url: string = `/api/v1/user/${userId}/check`;
    const headers = {
      Authentication: apiCrypto(method, url),
    };

    return axios
      .get(`${url}`, {
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
      .post(`${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 로그인 API
  login(userId, userPw) {
    const method: string = 'POST';
    const url: string = `/api/v1/user/login`;

    const headers = {
      Authentication: apiCrypto(method, url),
    };
    const data: { id: string; password: string } = {
      id: userId,
      password: userPw,
    };

    return axios
      .post(`${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 로그아웃 API
  logout(jwt) {
    const method: string = 'GET';
    const url: string = `/api/v1/user/logout`;
    const headers = {
      Authentication: apiCrypto(method, url),
      Authorization: jwt,
    };

    return axios
      .get(`${url}`, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },
};

export default apiClient;
