import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 최신순 퀴즈 목록을 불러오는 useQuery
export const useNewQuizList = (
  searchWord?: string | null,
  sortOption?: string | null,
  timeStamp?: string | null,
  accessOption?: string | null,
  userOnly?: boolean,
  count?: number
): {
  newQuizListData: {
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
  newQuizListRefetch: () => Promise<QueryObserverResult<any, unknown>>;
  isNewQuizListLoading: boolean;
  isNewQuizListSuccess: boolean;
  isNewQuizListError: boolean;
  newQuizListError: any;
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
    data: newQuizListData,
    refetch: newQuizListRefetch,
    isLoading: isNewQuizListLoading,
    isSuccess: isNewQuizListSuccess,
    isError: isNewQuizListError,
    error: newQuizListError,
  } = useQuery(
    ['newQuizList'],
    () =>
      apiClient
        .newQuizList(sort, searchWord, timeStamp, access, userOnly, count)
        .then((data) => {
          return data.result;
        })
        .catch((error) => console.log(error.response.data.message)),
    { retry: 0, refetchOnWindowFocus: false, enabled: false }
  );

  return {
    newQuizListData,
    newQuizListRefetch,
    isNewQuizListLoading,
    isNewQuizListSuccess,
    isNewQuizListError,
    newQuizListError,
  };
};
