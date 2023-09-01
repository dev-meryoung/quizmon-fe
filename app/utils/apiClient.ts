import axios from 'axios';
import apiCrypto from 'app/utils/apiCrypto';
import { QnaArrayType } from 'app/components/ListInQuiz';

interface ApiClient {
  baseUrl: string;
  authorCheck: () => Promise<any>;
  idCheck: (id: string) => Promise<any>;
  join: (id: string, pw: string) => Promise<any>;
  userEdit: (currentPw: string, newPw: string) => Promise<any>;
  userWithdraw: (currentPw: string) => Promise<any>;
  login: (id: string, pw: string) => Promise<any>;
  logout: () => Promise<any>;
  newQuiz: (
    title: string,
    comment: string,
    limitTime: number,
    thumbnail: boolean,
    publicAccess: boolean,
    randomQuestion: boolean,
    multipleChoice: boolean,
    signatureMessage: string,
    qnaArray: QnaArrayType[]
  ) => Promise<any>;
}

// 클라이언트 API
const apiClient: ApiClient = {
  /* 개발 단계에서 사용하는 baseUrl */
  baseUrl: `https://${process.env.NEXT_PUBLIC_BASE_URL}`,
  /* 회원 관련 API */
  // 토큰 권한 확인 API
  authorCheck() {
    const method: string = 'GET';
    const url: string = `/api/v1/user/check`;
    const headers = {
      Authentication: apiCrypto(method, url),
      Authorization: localStorage.getItem('jwt'),
    };

    return axios
      .get(`${this.baseUrl}${url}`, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 아이디 중복 여부 확인 API
  idCheck(id) {
    const method: string = 'GET';
    const url: string = `/api/v1/user/${id}/check`;
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
  join(id, pw) {
    const method: string = 'POST';
    const url: string = `/api/v1/user`;
    const headers = {
      Authentication: apiCrypto(method, url),
    };
    const data = {
      id: id,
      password: pw,
    };

    return axios
      .post(`${this.baseUrl}${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 회원정보 수정 API
  userEdit(currentPw, newPw) {
    const method: string = 'PUT';
    const url: string = `/api/v1/user`;

    const headers = {
      Authentication: apiCrypto(method, url),
      Authorization: localStorage.getItem('jwt'),
    };
    const data = {
      oldPassword: currentPw,
      newPassword: newPw,
    };

    return axios
      .put(`${this.baseUrl}${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 회원탈퇴 API
  userWithdraw(currentPw) {
    const method: string = 'POST';
    const url: string = `/api/v1/user/delete`;

    const headers = {
      Authentication: apiCrypto(method, url),
      Authorization: localStorage.getItem('jwt'),
    };
    const data = {
      password: currentPw,
    };

    return axios
      .post(`${this.baseUrl}${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 로그인 API
  login(id, pw) {
    const method: string = 'POST';
    const url: string = `/api/v1/user/login`;

    const headers = {
      Authentication: apiCrypto(method, url),
    };
    const data = {
      id: id,
      password: pw,
    };

    return axios
      .post(`${this.baseUrl}${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 로그아웃 API
  logout() {
    const method: string = 'GET';
    const url: string = `/api/v1/user/logout`;
    const headers = {
      Authentication: apiCrypto(method, url),
      Authorization: localStorage.getItem('jwt'),
    };

    return axios
      .get(`${this.baseUrl}${url}`, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // 퀴즈 생성 API
  newQuiz(
    title,
    comment,
    limitTime,
    thumbnail,
    publicAccess,
    randomQuestion,
    multipleChoice,
    signatureMessage,
    qnaArray
  ) {
    const method: string = 'POST';
    const url: string = `/api/quiz/image`;

    const headers = {
      Authentication: apiCrypto(method, url),
      Authorization: localStorage.getItem('jwt'),
    };

    const data = {
      title: title,
      comment: comment,
      limitTime: limitTime,
      thumbnail: thumbnail,
      publicAccess: publicAccess,
      randomQuestion: randomQuestion,
      multipleChoice: multipleChoice,
      signatureMessage: signatureMessage,
      qnaArray: qnaArray,
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
