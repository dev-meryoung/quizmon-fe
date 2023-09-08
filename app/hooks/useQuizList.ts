import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 퀴즈 목록을 불러오는 useQuery
export const useQuizList = (
  sort1: number,
  sort2: number,
  sort3: number,
  access?: number,
  timeStamp?: string,
  seqNum?: number,
  searchWord?: string,
  count?: number,
  userOnly?: boolean
): {
  quizListData: { id: string; valid: boolean; admin: boolean };
  quizListRefetch: () => Promise<QueryObserverResult<any, unknown>>;
  isQuizListLoading: boolean;
  isQuizListSuccess: boolean;
  isQuizListError: boolean;
  quizListError: any;
} => {
  // API 타입에 맞춰 정렬 방식 값 수정
  let sort = 0;

  if (sort3 === 1) {
    sort = 4;
  } else if (sort1 === 1) {
    sort = 1;
  } else if (sort1 === 2 && sort2 === 1) {
    sort = 3;
  } else if (sort1 === 2 && sort2 === 2) {
    sort = 2;
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
        .quizList(
          sort,
          type,
          access,
          timeStamp,
          seqNum,
          searchWord,
          count,
          userOnly
        )
        .then((data) => {
          console.log(data.result);
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
