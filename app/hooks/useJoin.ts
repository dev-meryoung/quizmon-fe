import { UseMutateFunction, useMutation } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 회원가입을 진행하는 useMutate
export const useJoin = (
  id: string,
  pw: string
): {
  joinMutate: UseMutateFunction;
  isJoinLoading: boolean;
  isJoinSuccess: boolean;
  isJoinError: boolean;
  joinError: any;
} => {
  const {
    mutate: joinMutate,
    isLoading: isJoinLoading,
    isSuccess: isJoinSuccess,
    isError: isJoinError,
    error: joinError,
  } = useMutation('join', () =>
    apiClient.join(id, pw).then((data) => {
      if (data.code === 200) {
        return data.result.id;
      }
    })
  );

  return {
    joinMutate,
    isJoinLoading,
    isJoinSuccess,
    isJoinError,
    joinError,
  };
};
