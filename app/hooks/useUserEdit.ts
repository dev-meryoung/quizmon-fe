import { UseMutateFunction, useMutation } from 'react-query';
import apiClient from 'app/utils/apiClient';

// 회원가입을 진행하는 useMutate
export const useUserEdit = (
  pw: string,
  newPw: string
): {
  userEditMutate: UseMutateFunction;
  isUserEditLoading: boolean;
  isUserEditSuccess: boolean;
  isUserEditError: boolean;
  userEditError: any;
} => {
  const {
    mutate: userEditMutate,
    isLoading: isUserEditLoading,
    isSuccess: isUserEditSuccess,
    isError: isUserEditError,
    error: userEditError,
  } = useMutation('userEdit', () =>
    apiClient.userEdit(pw, newPw).then((data) => {
      if (data.code === 200) {
        return data.result.id;
      }
    })
  );

  return {
    userEditMutate,
    isUserEditLoading,
    isUserEditSuccess,
    isUserEditError,
    userEditError,
  };
};
