'use client';

import SelectBox from 'app/components/SelectBox';
import Filter from 'app/components/Filter';
import styles from 'app/styles/newQuiz.module.scss';
import Quiz from 'app/components/Quiz';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Infomation from 'app/components/Infomation';

export interface QnaArrayType {
  optionArray: string[];
  answerArray: string[];
}

const New = (): React.ReactNode => {
  // 페이지 이동을 위한 useRouter
  const router = useRouter();

  // 퀴즈 생성 페이지의 마운트 상태를 관리하기 위한 useState
  const [mounted, setMounted] = useState<boolean>(false);

  // 퀴즈 생성에 필요한 값을 관리하기 위한 useState
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [thumbnailImg, setThumbnailImg] = useState<File | null>(null);
  const [quizImgArray, setQuizImgArray] = useState<File[] | null>(null);
  const [qnaArray, setQnaArray] = useState<QnaArrayType[]>([]);
  const [signatureMsg, setSignatureMsg] = useState<string>('');

  // 퀴즈 난이도(제한 시간) 상태를 관리하기 위한 useState (1 : VERY EASY ~ 5 : VERY HARD)
  const [limitTime, setLimitTime] = useState<number>(3);

  // 랜덤 출제 여부 필터 상태를 관리하기 위한 useState (1 : 랜덤, 2 : 기본)
  const [randomFilter, setRandomFilter] = useState<number>(2);

  // 객관식 여부 필터 상태를 관리하기 위한 useState (1 : 객관식, 2 : 기본)
  const [multipleFilter, setMultipleFilter] = useState<number>(2);

  // 공개 여부 필터 상태를 관리하기 위한 useState (1 : 비공개, 2 : 기본)
  const [publicFilter, setPublicFilter] = useState<number>(2);

  // 이미지 파일 첨부 시 사용되는 기존 input을 식별하기 위한 useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 퀴즈 목록에 해당하는 div를 식별하기 위한 useRef
  const quizListRef = useRef<HTMLDivElement>(null);

  // 최초 퀴즈 생성 페이지 마운트 과정을 관리하기 위한 useEffect
  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('jwt') === null) {
      router.push('/login');
    }
  }, [router]);

  // 제목 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowTitle: string = e.target.value;
    setTitle(nowTitle);
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
      const nowImageFile: File[] | null = Array.from(e.target.files);

      if (quizImgArray) {
        setQuizImgArray([...quizImgArray, ...nowImageFile]);

        const updateQnaArray = [...qnaArray];
        nowImageFile.map(() => {
          updateQnaArray.push({
            optionArray: ['', '', '', ''],
            answerArray: ['', '', ''],
          });
        });
        setQnaArray([...updateQnaArray]);
      } else {
        setQuizImgArray([...nowImageFile]);

        const updateQnaArray = [...qnaArray];
        nowImageFile.map(() => {
          updateQnaArray.push({
            optionArray: ['', '', '', ''],
            answerArray: ['', '', ''],
          });
        });
        setQnaArray([...updateQnaArray]);
      }
      e.target.value = '';
    }
  };

  return (
    <>
      {mounted && localStorage.getItem('jwt') !== null ? (
        <main className={styles.container}>
          <div className={styles.contents}>
            <div className={styles.title}>
              <p className={styles.title_text}>퀴즈 생성</p>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <label className={styles.input_label}>
                  *TITLE (최소 5자 이상)
                </label>
                <input
                  className={styles.input_text}
                  type="text"
                  spellCheck="false"
                  placeholder="제목"
                  value={title}
                  onChange={onChangeTitle}
                  maxLength={30}
                />
              </div>
              <div className={styles.input}>
                <label className={styles.input_label}>DESCRIPTION</label>
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
                <label className={styles.input_label}>*OPTION</label>
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
                <label className={styles.input_label}>*QUIZ</label>
                <div className={styles.quizList} ref={quizListRef}>
                  {quizImgArray?.map((file, i) => (
                    <Quiz
                      key={i}
                      quizNum={i}
                      file={quizImgArray[i]}
                      multipleFilter={multipleFilter}
                      quizImgArray={quizImgArray}
                      qnaArray={qnaArray}
                      setQuizImgArray={setQuizImgArray}
                      setQnaArray={setQnaArray}
                    />
                  ))}
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
                </div>
              </div>
              <div className={styles.input}>
                <label className={styles.input_label}>THUMBNAIL IMAGE</label>
              </div>
              <div className={styles.post}>
                <button
                  className={styles.postBtn}
                  onClick={() => {
                    console.log(quizListRef.current);
                    console.log(quizImgArray);
                  }}
                >
                  등록
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
