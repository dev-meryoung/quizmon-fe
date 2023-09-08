import { QueryObserverResult, useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 현재 브라우저에 존재하는 JWT 토큰의 유효성 검사를 진행하는 useQuery
export const useAuthorCheck = (): {
  authorCheckData: { id: string; valid: boolean; admin: boolean };
  authorRefetch: () => Promise<QueryObserverResult<any, unknown>>;
  isAuthorCheckLoading: boolean;
  isAuthorCheckSuccess: boolean;
  isAuthorCheckError: boolean;
  authorCheckError: any;
} => {
  const {
    data: authorCheckData,
    refetch: authorRefetch,
    isLoading: isAuthorCheckLoading,
    isSuccess: isAuthorCheckSuccess,
    isError: isAuthorCheckError,
    error: authorCheckError,
  } = useQuery(
    ['authorCheck'],
    () =>
      apiClient
        .authorCheck()
        .then((data) => {
          console.log(data.result);
          return data.result;
        })
        .catch((error) => console.log(error.response.data.message)),
    { retry: 0, refetchOnWindowFocus: false, enabled: false }
  );

  return {
    authorCheckData,
    authorRefetch,
    isAuthorCheckLoading,
    isAuthorCheckSuccess,
    isAuthorCheckError,
    authorCheckError,
  };
};
