import { useQuery } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 현재 브라우저에 존재하는 JWT 토큰의 유효성 검사를 진행하는 useQuery
export const useAuthorCheck = (): {
  authorCheckData: { id: string; valid: boolean; admin: boolean };
  isAuthorCheckLoading: boolean;
  isAuthorCheckSuccess: boolean;
  isAuthorCheckError: boolean;
} => {
  const {
    data: authorCheckData,
    isLoading: isAuthorCheckLoading,
    isSuccess: isAuthorCheckSuccess,
    isError: isAuthorCheckError,
  } = useQuery(
    ['authorCheck'],
    () =>
      apiClient
        .authorCheck()
        .then((data) => {
          return data.result;
        })
        .catch((error) => console.log(error.response.data.message)),
    { retry: 0, refetchOnWindowFocus: false }
  );

  return {
    authorCheckData,
    isAuthorCheckLoading,
    isAuthorCheckSuccess,
    isAuthorCheckError,
  };
};
