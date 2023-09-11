import axios, { AxiosHeaderValue } from 'axios';
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
  imageUpload: (
    cryptoMsg: AxiosHeaderValue,
    quizImg: File,
    uploadUrl: string
  ) => Promise<any>;
  thumbnailUpload: (
    cryptoMsg: AxiosHeaderValue,
    thumbnailImg: File,
    thumbnailUrl: string
  ) => Promise<any>;
  imagesUpload: (
    cryptoMsg: AxiosHeaderValue,
    quizImgArray: File[],
    uploadUrlArray: string[],
    thumbnailImg: File | null,
    thumbnailUrl: string
  ) => Promise<any>;
  checkNewQuiz: (quizId: string) => Promise<any>;

  quizList: (
    sort: number,
    searchWord?: string,
    timeStamp?: string,
    access?: number,
    userOnly?: boolean,
    count?: number,
    seqNum?: number
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
  async newQuiz(
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

    return await axios
      .post(`${this.baseUrl}${url}`, data, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },

  // (퀴즈 생성 및 수정 시)이미지 업로드 API
  async imageUpload(cryptoMsg, quizImg, uploadUrl) {
    const headers = {
      signature: cryptoMsg,
    };

    const data = quizImg;

    return await axios.put(uploadUrl, data, { headers }).then((res) => {
      return res;
    });
  },

  // (퀴즈 생성 및 수정 시)썸네일 업로드 API
  async thumbnailUpload(cryptoMsg, thumbnailImg, thumbnailUrl) {
    const headers = {
      signature: cryptoMsg,
    };

    const data = thumbnailImg;

    return await axios.put(thumbnailUrl, data, { headers }).then((res) => {
      return res;
    });
  },

  // 다중 이미지 업로드 처리 함수
  async imagesUpload(
    cryptoMsg,
    quizImgArray,
    uploadUrlArray,
    thumbnailImg,
    thumbnailUrl
  ) {
    for (let i = 0; i < quizImgArray.length; i++) {
      await this.imageUpload(cryptoMsg, quizImgArray[i], uploadUrlArray[i]);
    }

    if (thumbnailImg) {
      await this.thumbnailUpload(cryptoMsg, thumbnailImg, thumbnailUrl);
    }
  },

  // 퀴즈 생성 마무리 확인 API
  checkNewQuiz(quizId) {
    const method: string = 'GET';
    const url: string = `/api/quiz/${quizId}/image/check`;
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

  // 퀴즈 목록 불러오기 API
  quizList(sort, searchWord?, timeStamp?, access?, userOnly?, count?, seqNum?) {
    const method: string = 'GET';
    const url: string = `/api/quiz/list`;
    const headers = {
      Authentication: apiCrypto(method, url),
      Authorization: localStorage.getItem('jwt'),
    };

    // 쿼리 스트링에 사용되는 string 값
    let querys: string = `sort=${sort}`;

    // 검색어
    if (searchWord) {
      querys += `&searchWord=${searchWord}`;
    }

    // 최종 퀴즈 업데이트 시간
    if (timeStamp) {
      querys += `&timeStamp=${timeStamp}`;
    }

    // 퀴즈 공개 여부 (기본값 : 공개)
    if (access !== 2) {
      // 전체
      if (access === 1) {
        querys += `&access=2`;
        // 비공개
      } else if (access === 3) {
        querys += `&access=1`;
      }
    }

    // 로그인한 사용자가 등록한 퀴즈만 보기 여부
    if (userOnly) {
      querys += `&userOnly=${userOnly}`;
    }

    // 퀴즈 요청 개수
    if (count) {
      querys += `&count=${count}`;
    }

    // 시작 퀴즈 순번
    if (seqNum) {
      querys += `&seqNum=${seqNum}`;
    }

    return axios
      .get(`${this.baseUrl}${url}?${querys}`, {
        headers,
      })
      .then((res) => {
        return res.data;
      });
  },
};

export default apiClient;
