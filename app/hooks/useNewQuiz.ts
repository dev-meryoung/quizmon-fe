import { UseMutateFunction, useMutation } from 'react-query';
import apiClient from 'app/utils/apiClient';
import stringCrypto from 'app/utils/stringCrypto';
import { QnaArrayType } from 'app/components/ListInQuiz';
import { randomString } from 'app/utils/randomString';
import signatureCrypto from 'app/utils/signatureCrypto';

// 퀴즈 생성을 진행하는 useMutate
export const useNewQuiz = (
  title: string,
  comment: string,
  limitTime: number,
  thumbnailImg: File | null,
  publicFilter: number,
  randomFilter: number,
  multipleFilter: number,
  qnaArray: QnaArrayType[],
  quizImgArray: File[]
): {
  newQuizMutate: UseMutateFunction;
  isNewQuizLoading: boolean;
  isNewQuizSuccess: boolean;
  isNewQuizError: boolean;
  newQuizError: any;
} => {
  // API 타입에 맞춰 값을 수정
  let thumbnail: boolean = false;
  let publicAccess: boolean = false;
  let randomQuestion: boolean = false;
  let multipleChoice: boolean = false;

  if (thumbnailImg) {
    thumbnail = true;
  }
  if (publicFilter === 2) {
    publicAccess = true;
  }
  if (randomFilter === 1) {
    randomQuestion = true;
  }
  if (multipleFilter === 1) {
    multipleChoice = true;
  }

  // S3 이미지 등록에 필요한 랜덤 signatureMessage 값과 해당 값의 암호화
  const signatureMsg: string = randomString();
  const cryptoMsg = signatureCrypto(signatureMsg);

  const {
    mutate: newQuizMutate,
    isLoading: isNewQuizLoading,
    isSuccess: isNewQuizSuccess,
    isError: isNewQuizError,
    error: newQuizError,
  } = useMutation(['newQuiz'], () =>
    apiClient
      .newQuiz(
        title,
        comment,
        limitTime,
        thumbnail,
        publicAccess,
        randomQuestion,
        multipleChoice,
        signatureMsg,
        qnaArray
      )
      .then((data) => {
        if (data.code === 200) {
          console.log(data.result);

          const quizId = data.result.quizId;
          const uploadUrlArray = data.result.uploadUrlArray;

          if (apiClient.imageUpload(cryptoMsg, quizImgArray, uploadUrlArray)) {
            console.log('업로드 성공!');
          }
        }
      })
  );

  return {
    newQuizMutate,
    isNewQuizLoading,
    isNewQuizSuccess,
    isNewQuizError,
    newQuizError,
  };
};
