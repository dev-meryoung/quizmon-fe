'use client';

import SelectBox from 'app/components/SelectBox';
import Filter from 'app/components/Filter';
import Infomation from 'app/components/Infomation';
import ListInQuiz, { QnaArrayType } from 'app/components/ListInQuiz';
import Modal from 'app/components/Modal';
import styles from 'app/styles/newQuiz.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useNewQuiz } from 'app/hooks/useNewQuiz';
import LoadingSpinner from 'app/components/LoadingSpinner';

const New = (): React.ReactNode => {
  // 페이지 이동을 위한 useRouter
  const router = useRouter();

  // 퀴즈 생성 페이지의 마운트 상태를 관리하기 위한 useState
  const [mounted, setMounted] = useState<boolean>(false);

  // 퀴즈 생성에 필요한 값을 관리하기 위한 useState
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [thumbnailImg, setThumbnailImg] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<
    string | ArrayBuffer | null
  >('');
  const [quizImgArray, setQuizImgArray] = useState<File[]>([]);
  const [qnaArray, setQnaArray] = useState<QnaArrayType[]>([]);

  // 퀴즈 난이도(제한 시간) 상태를 관리하기 위한 useState (1 : VERY EASY ~ 5 : VERY HARD)
  const [limitTime, setLimitTime] = useState<number>(3);

  // 랜덤 출제 여부 필터 상태를 관리하기 위한 useState (1 : 랜덤, 2 : 기본)
  const [randomFilter, setRandomFilter] = useState<number>(2);

  // 객관식 여부 필터 상태를 관리하기 위한 useState (1 : 객관식, 2 : 기본)
  const [multipleFilter, setMultipleFilter] = useState<number>(2);

  // 공개 여부 필터 상태를 관리하기 위한 useState (1 : 비공개, 2 : 기본)
  const [publicFilter, setPublicFilter] = useState<number>(2);

  // 퀴즈 생성 시 유효성 검사 결과를 관리하기 위한 useState
  const [checkTitle, setCheckTitle] = useState<boolean>(true);
  const [checkQuizList, setCheckQuizList] = useState<boolean>(true);
  const [checkQuiz, setCheckQuiz] = useState<number>(-1);

  // 퀴즈 생성 페이지에서 발생하는 모달 메시지를 관리하기 위한 useState
  const [modalMsg, setModalMsg] = useState<string>('');

  // 퀴즈 생성 페이지에서 발생하는 인포 모달의 노출 여부를 관리하는 useState
  const [viewInfoModal, setViewInfoModal] = useState<boolean>(false);

  // 퀴즈 생성 페이지에서 발생하는 액션 모달의 노출 여부를 관리하는 useState
  const [viewActionModal, setViewActionModal] = useState<boolean>(false);

  // 퀴즈 이미지 파일 첨부 시 사용되는 기존 input을 식별하기 위한 useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 썸네일 이미지 파일 첨부 시 사용되는 기존 input을 식별하기 위한 useRef
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // 최초 퀴즈 생성 페이지 마운트 과정을 관리하기 위한 useEffect
  useEffect(() => {
    setMounted(true);

    if (localStorage.getItem('jwt') === null) {
      router.push('/login');
    }

    // 새로고침 관련 재확인 메시지 표시
    const unloadHandler = function () {
      return '사이트를 새로고침하시겠습니까?';
    };

    window.onbeforeunload = unloadHandler;

    // useEffect에서 반환한 함수를 사용하여 컴포넌트가 언마운트될 때 이벤트 핸들러를 제거
    return () => {
      window.onbeforeunload = null;
    };
  }, [router]);

  // 문제 이미지가 제한 개수를 넘게 등록되었을 때의 처리 과정을 위한 useEffect
  useEffect(() => {
    if (quizImgArray.length > 30) {
      const updateQuizImgArray = [...quizImgArray];

      updateQuizImgArray.splice(30, quizImgArray.length - 30);

      setQuizImgArray(updateQuizImgArray);

      setModalMsg('최대 등록 가능한 문제 수는 30문제입니다.');
      setViewInfoModal(true);
    }
  }, [quizImgArray]);

  // 모달 창을 닫기 위한 modalCloseHandler 함수
  const modalCloseHandler = (): void => {
    setViewInfoModal(false);
    setViewActionModal(false);

    setModalMsg('');
  };

  // 제목 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowTitle: string = e.target.value;
    setTitle(nowTitle);
    setCheckTitle(true);
  };

  // 내용 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const nowDescription: string = e.target.value;
    setDescription(nowDescription);
  };

  // 새로운 이미지 파일이 첨부되었을 때 최신화하기 위한 onChange 함수
  const onChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const newImageFile: File[] | null = Array.from(e.target.files);

      // 이미지 파일 용량 체크 및 제외(5MB 제한)
      newImageFile.map((img) => {
        if (img.size > 5242880) {
          setModalMsg('5MB를 초과하는 이미지 파일은 등록할 수 없습니다.');
          setViewInfoModal(true);

          return;
        }
      });
      const nowImageFile = newImageFile.filter((img) => img.size < 5242880);

      if (quizImgArray) {
        setQuizImgArray([...quizImgArray, ...nowImageFile]);

        const updateQnaArray = [...qnaArray];
        nowImageFile.map(() => {
          updateQnaArray.push({
            optionArray: ['', '', '', ''],
            optionCheck: 1,
            answerArray: ['', '', ''],
            answerNum: 1,
          });
        });
        setQnaArray([...updateQnaArray]);
      } else {
        setQuizImgArray([...nowImageFile]);

        const updateQnaArray = [...qnaArray];
        nowImageFile.map(() => {
          updateQnaArray.push({
            optionArray: ['', '', '', ''],
            optionCheck: 1,
            answerArray: ['', '', ''],
            answerNum: 1,
          });
        });
        setQnaArray([...updateQnaArray]);
      }
      setCheckQuizList(true);
      e.target.value = '';
    }
  };

  // 새로운 썸네일 이미지가 첨부되었을 때 최신화하기 위한 onChange 함수
  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const newThumbnail: File | null = e.target.files[0];

      // 이미지 파일 용량 체크 및 제외(5MB 제한)
      if (newThumbnail.size > 5242880) {
        setModalMsg('5MB를 초과하는 이미지 파일은 등록할 수 없습니다.');
        setViewInfoModal(true);
      } else {
        const nowThumbnail = newThumbnail;
        setThumbnailImg(nowThumbnail);

        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target) {
            const stringThumbnail = e.target.result;

            setThumbnailPreview(stringThumbnail);
          }
        };

        reader.readAsDataURL(nowThumbnail);
      }
      e.target.value = '';
    }
  };

  // 퀴즈 생성 관련 useMutate Custom Hook
  const {
    newQuizMutate,
    isNewQuizLoading,
    isNewQuizSuccess,
    isNewQuizError,
    newQuizError,
  } = useNewQuiz(
    title,
    description,
    limitTime,
    thumbnailImg,
    publicFilter,
    randomFilter,
    multipleFilter,
    qnaArray,
    quizImgArray
  );

  // 퀴즈 등록 버튼을 클릭했을 때 실행되는 postBtnHandler 함수
  const postBtnHandler = (): void => {
    // 제목 유효성 검사
    if (title.length < 5) {
      setCheckTitle(false);
      setModalMsg('제목은 최소 5글자 이상 입력되어야 합니다.');
      setViewInfoModal(true);
      return;
    }

    // 퀴즈 개수 유효성 검사
    if (qnaArray.length < 5) {
      setCheckQuizList(false);
      setModalMsg('퀴즈는 최소 5문제 이상 등록되어야 합니다.');
      setViewInfoModal(true);
      return;
    }

    // 퀴즈 보기, 정답 값 앞뒤 공백 제거 및 유효성 검사
    if (qnaArray) {
      // 보기, 정답 값 앞뒤 공백 제거
      const updateQnaArray = [...qnaArray];

      updateQnaArray.map((quiz) => {
        for (let i = 0; i < 4; i++) {
          quiz.optionArray[i] = quiz.optionArray[i].trim();
        }

        for (let i = 0; i < quiz.answerNum; i++) {
          quiz.answerArray[i] = quiz.answerArray[i].trim();
        }
      });

      setQnaArray(updateQnaArray);

      // 유효성 검사
      let flag: boolean = true;

      if (multipleFilter === 1) {
        qnaArray.map((quiz, quizNum) => {
          quiz.optionArray.map((option, optionNum) => {
            if (option === '' && flag) {
              setModalMsg(
                `${quizNum + 1}번 문제의 ${
                  optionNum + 1
                }번 보기가 비어있습니다.`
              );
              setViewInfoModal(true);
              flag = false;
            }
          });
        });
      } else if (multipleFilter === 2) {
        qnaArray.map((quiz, quizNum) => {
          for (let i: number = 0; i < quiz.answerNum; i++) {
            if (quiz.answerArray[i] === '' && flag) {
              setModalMsg(
                `${quizNum + 1}번 문제의 정답 값이 모두 입력되어야 합니다.`
              );
              setViewInfoModal(true);
              flag = false;
            }
          }
        });
      }

      if (!flag) {
        return;
      } else {
        // 유효성 검사를 모두 통과했을 경우 퀴즈 등록 API 호출
        newQuizMutate();
      }
    }
  };

  // 퀴즈 생성 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (isNewQuizError) {
      setModalMsg(newQuizError.response.data.message);
      setViewInfoModal(true);
    }

    if (isNewQuizSuccess) {
      router.push('/');
    }
  }, [router, isNewQuizError, isNewQuizSuccess, newQuizError]);

  return (
    <>
      {isNewQuizLoading ? <LoadingSpinner /> : ''}
      {viewInfoModal ? (
        <Modal
          type="INFO"
          description={modalMsg}
          modalCloseHandler={modalCloseHandler}
        />
      ) : (
        ''
      )}
      {viewActionModal ? (
        <Modal
          type="ACTION"
          description="퀴즈 생성을 그만두고 목록으로 이동하시겠습니까?"
          actionBtn="확인"
          modalActionHandler={() => {
            router.push('/');
          }}
          modalCloseHandler={modalCloseHandler}
        />
      ) : (
        ''
      )}
      {mounted && localStorage.getItem('jwt') !== null ? (
        <main className={styles.container}>
          <div className={styles.contents}>
            <div className={styles.title}>
              <p className={styles.title_text}>퀴즈 생성</p>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <div className={styles.input_labels}>
                  <label className={styles.input_label}>
                    *TITLE (최소 5자 이상)
                  </label>
                  <label className={styles.input_length}>
                    (
                    {(title.length < 5 && title.length !== 0) ||
                    title.length > 30 ? (
                      <span className={styles.bad}>{title.length}</span>
                    ) : title.length >= 5 ? (
                      <span className={styles.good}>{title.length}</span>
                    ) : (
                      <span>{title.length}</span>
                    )}
                    /30)
                  </label>
                </div>
                <input
                  className={
                    checkTitle ? styles.input_text : styles.input_text_error
                  }
                  type="text"
                  spellCheck="false"
                  placeholder="제목"
                  value={title}
                  onChange={onChangeTitle}
                  maxLength={30}
                />
              </div>
              <div className={styles.input}>
                <div className={styles.input_labels}>
                  <label className={styles.input_label}>
                    DESCRIPTION (최대 100자)
                  </label>
                  <label className={styles.input_length}>
                    (
                    {description.length > 100 ? (
                      <span className={styles.bad}>{description.length}</span>
                    ) : (
                      <span>{description.length}</span>
                    )}
                    /100)
                  </label>
                </div>
                <textarea
                  className={styles.input_textarea}
                  spellCheck="false"
                  placeholder="설명"
                  value={description}
                  onChange={onChangeDescription}
                  maxLength={100}
                />
              </div>
              <div className={styles.input}>
                <div className={styles.input_labels}>
                  <label className={styles.input_label}>*OPTION</label>
                </div>
                <div className={styles.options}>
                  <div className={styles.option}>
                    <div className={styles.option_title}>퀴즈 난이도</div>
                    <SelectBox
                      op1="VERY EASY (10초)"
                      op2="EASY (7초)"
                      op3="NORMAL (5초)"
                      op4="HARD (4초)"
                      op5="VERY HARD (3초)"
                      optionFocused={limitTime}
                      setOptionFocused={setLimitTime}
                    />
                  </div>
                  <div className={styles.option}>
                    <div className={styles.option_title}>
                      랜덤 출제
                      <Infomation infomation="랜덤 출제 옵션이 켜져있을 경우, 문제 등록 순서에 상관 없이 매번 랜덤하게 문제가 출제되도록 설정합니다." />
                    </div>
                    <Filter
                      op1="ON"
                      op2="OFF"
                      filterFocused={randomFilter}
                      setFilterFocused={setRandomFilter}
                    />
                  </div>
                  <div className={styles.option}>
                    <div className={styles.option_title}>
                      객관식 (4지선다)
                      <Infomation infomation="객관식 옵션이 켜져있을 경우, 직접 정답을 입력하지 않고 4개의 보기 중에 정답을 선택하도록 설정합니다." />
                    </div>
                    <Filter
                      op1="ON"
                      op2="OFF"
                      filterFocused={multipleFilter}
                      setFilterFocused={setMultipleFilter}
                    />
                  </div>
                  <div className={styles.option}>
                    <div className={styles.option_title}>
                      비공개
                      <Infomation infomation="비공개 옵션이 켜져있을 경우, 링크 공유를 통한 URL 주소 접근만 가능하도록 설정합니다." />
                    </div>
                    <Filter
                      op1="ON"
                      op2="OFF"
                      filterFocused={publicFilter}
                      setFilterFocused={setPublicFilter}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.input}>
                <div className={styles.input_labels}>
                  <label className={styles.input_label}>
                    *QUIZ (최소 5문제 이상)
                  </label>
                  <label className={styles.input_length}>
                    (
                    {quizImgArray &&
                    quizImgArray.length < 5 &&
                    quizImgArray.length !== 0 ? (
                      <span className={styles.bad}>{quizImgArray.length}</span>
                    ) : quizImgArray && quizImgArray.length >= 5 ? (
                      <span className={styles.good}>{quizImgArray.length}</span>
                    ) : (
                      <span>{quizImgArray.length}</span>
                    )}
                    /30)
                  </label>
                </div>
                <div
                  className={
                    checkQuizList ? styles.quizList : styles.quizList_error
                  }
                >
                  {quizImgArray.map((file, i) => (
                    <ListInQuiz
                      key={i}
                      quizNum={i}
                      checkQuiz={checkQuiz}
                      multipleFilter={multipleFilter}
                      quizImgArray={quizImgArray}
                      qnaArray={qnaArray}
                      setQuizImgArray={setQuizImgArray}
                      setQnaArray={setQnaArray}
                    />
                  ))}
                  {quizImgArray.length < 30 ? (
                    <div
                      className={styles.addBtn}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg
                        className={styles.add_icon}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={onChangeImageFile}
                        multiple
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className={styles.input}>
                <div className={styles.input_labels}>
                  <label className={styles.input_label}>
                    THUMBNAIL IMAGE (미등록 시 1번 문제의 이미지가 대표 썸네일
                    이미지로 사용됩니다.)
                  </label>
                </div>
                <div className={styles.thumbnail}>
                  {thumbnailImg ? (
                    <div className={styles.preview}>
                      <div className={styles.previewImgWrapper}>
                        {typeof thumbnailPreview === 'string' ? (
                          <Image
                            className={styles.previewImg}
                            src={thumbnailPreview}
                            alt={'thumbnail'}
                            width={500}
                            height={500}
                          />
                        ) : (
                          ''
                        )}
                        <div
                          className={styles.previewDelete}
                          onClick={() => {
                            setThumbnailImg(null);
                          }}
                        >
                          <svg
                            className={styles.previewDelete_icon}
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.addBtn}
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      <svg
                        className={styles.add_icon}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        ref={thumbnailInputRef}
                        style={{ display: 'none' }}
                        onChange={onChangeThumbnail}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.cancelPost}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setViewActionModal(true);
                  }}
                >
                  <svg
                    width="34"
                    height="17"
                    viewBox="0 0 54 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2 7.74H15.2L18.2 15.87H12.2L9.35 7.74H9.32L6.5 15.87H0.5L3.5 7.74H0.5V3.09H6.2V0.989999H12.5V3.09H18.2V7.74ZM19.4 1.89H25.4V27.27H19.4V1.89ZM0.5 16.89H18.2V21.54H12.35V27.27H6.05V21.54H0.5V16.89ZM37.6006 1.89H44.0806L53.5906 18.27H46.6906L40.8406 7.71L34.9906 18.27H28.0906L37.6006 1.89ZM28.3906 22.62H37.6906V16.47H43.9906V22.62H53.2906V27.27H28.3906V22.62Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button className={styles.postBtn} onClick={postBtnHandler}>
                  <svg
                    width="34"
                    height="17"
                    viewBox="0 0 54 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 0.889999H25.4V4.49C23.98 4.71 22.49 4.87 20.93 4.97C19.37 5.05 17.58 5.09 15.56 5.09H6.5V5.93H15.56C17.58 5.93 19.37 5.89 20.93 5.81C22.49 5.71 23.98 5.55 25.4 5.33V10.13H0.5V0.889999ZM0.5 11.06H25.4V15.71H0.5V11.06ZM25.55 21.47C25.55 23.13 25.12 24.34 24.26 25.1C23.4 25.88 22.06 26.27 20.24 26.27H5.66C3.84 26.27 2.5 25.88 1.64 25.1C0.78 24.34 0.35 23.13 0.35 21.47C0.35 19.81 0.78 18.6 1.64 17.84C2.5 17.06 3.84 16.67 5.66 16.67H20.24C22.06 16.67 23.4 17.06 24.26 17.84C25.12 18.6 25.55 19.81 25.55 21.47ZM12.95 25.94C12.95 24.46 13.89 23.36 15.77 22.64C17.67 21.9 20.51 21.51 24.29 21.47C20.51 21.43 17.67 21.05 15.77 20.33C13.89 19.61 12.95 18.5 12.95 17C12.95 18.5 12 19.61 10.1 20.33C8.2 21.05 5.36 21.43 1.58 21.47C5.36 21.51 8.2 21.9 10.1 22.64C12 23.36 12.95 24.46 12.95 25.94ZM28.3906 13.76H37.6906V12.95H28.3906V5.21H47.2906V4.43H28.3906V0.889999H53.2906V7.43C51.7506 7.65 50.2406 7.83 48.7606 7.97C47.2806 8.11 45.7806 8.23 44.2606 8.33C42.7406 8.43 41.1706 8.5 39.5506 8.54C37.9306 8.58 36.2106 8.6 34.3906 8.6V9.41C36.2106 9.41 37.9306 9.39 39.5506 9.35C41.1706 9.31 42.7306 9.25 44.2306 9.17C45.7506 9.07 47.2506 8.95 48.7306 8.81C50.2106 8.67 51.7306 8.49 53.2906 8.27V12.95H43.9906V13.76H53.2906V17.81H28.3906V13.76ZM47.2906 26.27V22.91H28.3906V18.56H53.2906V26.27H47.2906Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : (
        ''
      )}
    </>
  );
};

export default New;
