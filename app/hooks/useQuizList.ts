import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 퀴즈 목록을 불러오는 useQuery
export const useQuizList = (
  searchWord?: string | null,
  urlSort?: string | null,
  timeStamp?: string,
  urlAccess?: string,
  userOnly?: boolean,
  count?: number,
  seqNum?: number
): {
  quizListData: {
    quizArray: {
      comment: string;
      limitTime: number;
      playCount: number;
      quizId: string;
      reportCount: number;
      thumbnailUrl: string;
      timeStamp: string;
      title: string;
      type: string;
      urlId: string;
    }[];
    quizCount: number;
  };
  quizListRefetch: () => Promise<QueryObserverResult<any, unknown>>;
  isQuizListLoading: boolean;
  isQuizListSuccess: boolean;
  isQuizListError: boolean;
  quizListError: any;
} => {
  // API 타입에 맞춰 정렬 방식 값 수정
  let sort: number = 0;

  if (urlSort === 'report') {
    sort = 4;
  } else if (urlSort === 'all-hot') {
    sort = 3;
  } else if (urlSort === 'realtime-hot') {
    sort = 2;
  } else {
    sort = 1;
  }

  // API 타입에 맞춰 접근 종류 값 수정
  let access: number = 0;

  if (urlAccess === 'all') {
    access = 2;
  } else if (urlAccess === 'private') {
    access = 1;
  } else {
    access = 0;
  }

  const {
    data: quizListData,
    refetch: quizListRefetch,
    isLoading: isQuizListLoading,
    isSuccess: isQuizListSuccess,
    isError: isQuizListError,
    error: quizListError,
  } = useQuery(
    ['quizList'],
    () =>
      apiClient
        .quizList(1, searchWord, timeStamp, access, userOnly, count, seqNum)
        .then((data) => {
          return data.result;
        })
        .catch((error) => console.log(error.response.data.message)),
    { retry: 0, refetchOnWindowFocus: false, enabled: false }
  );

  return {
    quizListData,
    quizListRefetch,
    isQuizListLoading,
    isQuizListSuccess,
    isQuizListError,
    quizListError,
  };
};
