import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 퀴즈 목록을 불러오는 useQuery
export const useQuizList = (
  searchWord?: string | null,
  sortOption?: string | null,
  timeStamp?: string | null,
  accessOption?: string | null,
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

  if (sortOption === 'report') {
    sort = 4;
  } else if (sortOption === 'all-hot') {
    sort = 3;
  } else if (sortOption === 'realtime-hot') {
    sort = 2;
  } else {
    sort = 1;
  }

  // API 타입에 맞춰 접근 종류 값 수정
  let access: number = 0;

  if (accessOption === 'all') {
    access = 2;
  } else if (accessOption === 'private') {
    access = 1;
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
        .quizList(sort, searchWord, timeStamp, access, userOnly, count, seqNum)
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
