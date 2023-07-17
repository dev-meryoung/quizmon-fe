import { UseMutateFunction, useMutation } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 회원가입을 진행하는 useMutate
export const useUserWithdraw = (
  pw: string
): {
  userWithdrawMutate: UseMutateFunction;
  isUserWithdrawLoading: boolean;
  isUserWithdrawSuccess: boolean;
  isUserWithdrawError: boolean;
  userWithdrawError: any;
} => {
  const {
    mutate: userWithdrawMutate,
    isLoading: isUserWithdrawLoading,
    isSuccess: isUserWithdrawSuccess,
    isError: isUserWithdrawError,
    error: userWithdrawError,
  } = useMutation('userWithdraw', () =>
    apiClient.userWithdraw(pw).then((data) => {
      if (data.code === 200) {
        return data.result.id;
      }
    })
  );

  return {
    userWithdrawMutate,
    isUserWithdrawLoading,
    isUserWithdrawSuccess,
    isUserWithdrawError,
    userWithdrawError,
  };
};
