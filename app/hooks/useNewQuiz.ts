import { UseMutateFunction, useMutation } from 'react-query';
import apiClient from 'app/utils/apiClient';
import stringCrypto from 'app/utils/stringCrypto';

// 퀴즈 생성을 진행하는 useMutate
export const useNewQuiz = (
  id: string,
  pw: string
): {
  newQuizMutate: UseMutateFunction;
  newQuizData: { id: string };
  isNewQuizLoading: boolean;
  isNewQuizSuccess: boolean;
  isNewQuizError: boolean;
  newQuizError: any;
} => {
  const {
    mutate: newQuizMutate,
    data: newQuizData,
    isLoading: isNewQuizLoading,
    isSuccess: isNewQuizSuccess,
    isError: isNewQuizError,
    error: newQuizError,
  } = useMutation(['newQuiz'], () =>
    apiClient.login(id, pw).then((data) => {
      if (data.code === 200) {
        localStorage.setItem('jwt', data.result.token);
        localStorage.setItem(
          'user',
          `${data.result.id}:${stringCrypto(data.result.admin)}`
        );
        return data.result;
      }
    })
  );

  return {
    newQuizMutate,
    newQuizData,
    isNewQuizLoading,
    isNewQuizSuccess,
    isNewQuizError,
    newQuizError,
  };
};
