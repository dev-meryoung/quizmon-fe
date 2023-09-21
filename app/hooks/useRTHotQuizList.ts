import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 실시간 인기순 퀴즈 목록을 불러오는 useQuery
export const useRTHotQuizList = (
  filterState: number[],
  searchWord?: string | null,
  seqNum?: number,
  userOnly?: boolean,
  count?: number
): {
  rtHotQuizListData: {
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
  rtHotQuizListRefetch: () => Promise<QueryObserverResult<any, unknown>>;
  isRTHotQuizListLoading: boolean;
  isRTHotQuizListSuccess: boolean;
  isRTHotQuizListError: boolean;
  rtHotQuizListError: any;
} => {
  // API 타입에 맞춰 접근 종류 값 수정
  let access: number = 0;

  if (filterState[1] === 1) {
    access = 2;
  } else if (filterState[1] === 3) {
    access = 1;
  }

  const {
    data: rtHotQuizListData,
    refetch: rtHotQuizListRefetch,
    isLoading: isRTHotQuizListLoading,
    isSuccess: isRTHotQuizListSuccess,
    isError: isRTHotQuizListError,
    error: rtHotQuizListError,
  } = useQuery(
    ['rtHotQuizList'],
    () =>
      apiClient
        .hotQuizList(
          filterState[0],
          searchWord,
          seqNum,
          access,
          userOnly,
          count
        )
        .then((data) => {
          return data.result;
        })
        .catch((error) => console.log(error.response.data.message)),
    { retry: 0, staleTime: 0, refetchOnWindowFocus: false, enabled: false }
  );

  return {
    rtHotQuizListData,
    rtHotQuizListRefetch,
    isRTHotQuizListLoading,
    isRTHotQuizListSuccess,
    isRTHotQuizListError,
    rtHotQuizListError,
  };
};
