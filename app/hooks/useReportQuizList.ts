import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 최신순 퀴즈 목록을 불러오는 useQuery
export const useReportQuizList = (
  filterState: number[],
  searchWord?: string | null,
  timeStamp?: string | null,
  userOnly?: boolean,
  count?: number
): {
  reportQuizListData: {
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
  reportQuizListRefetch: () => Promise<QueryObserverResult<any, unknown>>;
  isReportQuizListLoading: boolean;
  isReportQuizListSuccess: boolean;
  isReportQuizListError: boolean;
  reportQuizListError: any;
} => {
  // API 타입에 맞춰 접근 종류 값 수정
  let access: number = 0;

  if (filterState[1] === 1) {
    access = 2;
  } else if (filterState[1] === 3) {
    access = 1;
  }

  const {
    data: reportQuizListData,
    refetch: reportQuizListRefetch,
    isLoading: isReportQuizListLoading,
    isSuccess: isReportQuizListSuccess,
    isError: isReportQuizListError,
    error: reportQuizListError,
  } = useQuery(
    ['reportQuizList'],
    () =>
      apiClient
        .newQuizList(
          filterState[0],
          searchWord,
          timeStamp,
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
    reportQuizListData,
    reportQuizListRefetch,
    isReportQuizListLoading,
    isReportQuizListSuccess,
    isReportQuizListError,
    reportQuizListError,
  };
};
