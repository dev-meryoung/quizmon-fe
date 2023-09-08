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
  let apiLimitTime: 3 | 4 | 5 | 7 | 10 = 5;
  let thumbnail: boolean = false;
  let publicAccess: boolean = false;
  let randomQuestion: boolean = false;
  let multipleChoice: boolean = false;

  if (limitTime === 1) {
    apiLimitTime = 10;
  } else if (limitTime === 2) {
    apiLimitTime = 7;
  } else if (limitTime === 3) {
    apiLimitTime = 5;
  } else if (limitTime === 4) {
    apiLimitTime = 4;
  } else if (limitTime === 5) {
    apiLimitTime = 3;
  }
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
        apiLimitTime,
        thumbnail,
        publicAccess,
        randomQuestion,
        multipleChoice,
        signatureMsg,
        qnaArray
      )
      .then(async (data) => {
        if (data.code === 200) {
          const quizId: string = data.result.quizId;
          const uploadUrlArray: string[] = data.result.uploadUrlArray;
          const thumbnailUrl: string = data.result.thumbnailUrl;

          await apiClient
            .imagesUpload(
              cryptoMsg,
              quizImgArray,
              uploadUrlArray,
              thumbnailImg,
              thumbnailUrl
            )
            .then(
              async () =>
                await apiClient.checkNewQuiz(quizId).then((data) => {
                  if (data.code === 200) {
                  }
                })
            );
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
