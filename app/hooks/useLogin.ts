import { UseMutateFunction, useMutation } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 로그인을 진행하는 useMutate
export const useLogin = (
  id: string,
  pw: string
): {
  loginMutate: UseMutateFunction;
  isLoginLoading: boolean;
  isLoginSuccess: boolean;
  isLoginError: boolean;
  loginError: any;
} => {
  const {
    mutate: loginMutate,
    isLoading: isLoginLoading,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
    error: loginError,
  } = useMutation('login', () =>
    apiClient.login(id, pw).then((data) => {
      if (data.code === 200) {
        localStorage.setItem('jwt', data.result.token);
        return data.result.id;
      }
    })
  );

  return {
    loginMutate,
    isLoginLoading,
    isLoginSuccess,
    isLoginError,
    loginError,
  };
};
