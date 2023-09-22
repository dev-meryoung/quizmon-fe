import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 인기순 퀴즈 목록을 불러오는 useQuery
export const useAllHotQuizList = (
  filterState: number[],
  searchWord?: string | null,
  seqNum?: number,
  userOnly?: boolean,
  count?: number
): {
  allHotQuizListData: {
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
  allHotQuizListRefetch: () => Promise<QueryObserverResult<any, unknown>>;
  isAllHotQuizListLoading: boolean;
  isAllHotQuizListSuccess: boolean;
  isAllHotQuizListError: boolean;
  allHotQuizListError: any;
} => {
  // API 타입에 맞춰 접근 종류 값 수정
  let access: number = 0;

  if (filterState[1] === 1) {
    access = 2;
  } else if (filterState[1] === 3) {
    access = 1;
  }

  const {
    data: allHotQuizListData,
    refetch: allHotQuizListRefetch,
    isLoading: isAllHotQuizListLoading,
    isSuccess: isAllHotQuizListSuccess,
    isError: isAllHotQuizListError,
    error: allHotQuizListError,
  } = useQuery(
    ['allHotQuizList'],
    () =>
      apiClient
        .sortQuizList(
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
    allHotQuizListData,
    allHotQuizListRefetch,
    isAllHotQuizListLoading,
    isAllHotQuizListSuccess,
    isAllHotQuizListError,
    allHotQuizListError,
  };
};
