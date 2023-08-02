'use client';

import Image from 'next/image';
import styles from 'app/styles/listInQuiz.module.scss';
import { useRef, useState } from 'react';

export interface QnaArrayType {
  optionArray: string[];
  answerArray: string[];
  answerNum: number;
}

// Quiz 컴포넌트의 props 타입 interface
export interface Options {
  quizNum: number;
  multipleFilter: number;
  quizImgArray: File[];
  qnaArray: QnaArrayType[];
  setQuizImgArray: Function;
  setQnaArray: Function;
}

const ListInQuiz = (props: Options): React.ReactNode => {
  // 퀴즈 생성에 필요한 이미지를 관리하기 위한 useState
  const quizImgArray = props.quizImgArray;
  const setQuizImgArray = props.setQuizImgArray;

  // 퀴즈 생성에 필요한 정답 값을 관리하기 위한 useState
  const qnaArray = props.qnaArray;
  const setQnaArray = props.setQnaArray;

  // 객관식 보기 체크 값을 관리하기 위한 useState
  const [multipleCheck, setMultipleCheck] = useState<number>(1);

  // 객관식 보기 체크박스 커스텀을 위해 기존 input을 식별하기 위한 useRef
  const multipleCheck1 = useRef<HTMLInputElement>(null);
  const multipleCheck2 = useRef<HTMLInputElement>(null);
  const multipleCheck3 = useRef<HTMLInputElement>(null);
  const multipleCheck4 = useRef<HTMLInputElement>(null);

  // 이미지 파일 첨부 시 사용되는 기존 input을 식별하기 위한 useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 정답 값이 변경되었을 때 useState에 적용하기 위한 onChange 함수
  const onChangeShortAnswers = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const updateQnaArray = [...qnaArray];

    updateQnaArray[props.quizNum].answerArray[parseInt(e.target.name) - 1] =
      e.target.value;

    setQnaArray(updateQnaArray);
  };

  // 객관식 보기 값이 변경되었을 때 useState에 적용하기 위한 onChange 함수
  const onChangeMultipleAnswers = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const updateQnaArray = [...qnaArray];

    updateQnaArray[props.quizNum].optionArray[parseInt(e.target.name) - 1] =
      e.target.value;

    setQnaArray(updateQnaArray);
  };

  // 객관식 보기 체크 값이 변경되었을 때 오직 1개의 체크만 useState에 적용하기 위한 onChange 함수
  const onChangeMultipleCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.value === '1') {
      setMultipleCheck(1);
    } else if (e.target.value === '2') {
      setMultipleCheck(2);
    } else if (e.target.value === '3') {
      setMultipleCheck(3);
    } else if (e.target.value === '4') {
      setMultipleCheck(4);
    }

    const updateQnaArray = [...qnaArray];

    updateQnaArray[props.quizNum].answerArray[0] =
      updateQnaArray[props.quizNum].optionArray[parseInt(e.target.value) - 1];

    setQnaArray(updateQnaArray);
  };

  // 새로운 이미지 파일이 첨부되었을 때 최신화하기 위한 onChange 함수
  const onChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const nowImageFile: File[] | null = Array.from(e.target.files);

      const updateImgArray = [...quizImgArray];

      updateImgArray[props.quizNum] = nowImageFile[0];

      setQuizImgArray(updateImgArray);
    }
  };

  // 퀴즈 위치 변경 기능을 실행하기 위한 moveBtnHandler 함수
  const moveBtnHandler = (act: string): void => {
    if (act === 'UP' && props.quizNum !== 0) {
      const updateImgArray = [...quizImgArray];
      const updateQnaArray = [...qnaArray];

      const tempImg = updateImgArray[props.quizNum - 1];
      const tempQna = updateQnaArray[props.quizNum - 1];

      updateImgArray[props.quizNum - 1] = updateImgArray[props.quizNum];
      updateImgArray[props.quizNum] = tempImg;
      updateQnaArray[props.quizNum - 1] = updateQnaArray[props.quizNum];
      updateQnaArray[props.quizNum] = tempQna;

      setQuizImgArray(updateImgArray);
      setQnaArray(updateQnaArray);
    } else if (act === 'DOWN' && props.quizNum !== quizImgArray.length - 1) {
      const updateImgArray = [...quizImgArray];
      const updateQnaArray = [...qnaArray];

      const tempImg = updateImgArray[props.quizNum + 1];
      const tempQna = updateQnaArray[props.quizNum + 1];

      updateImgArray[props.quizNum + 1] = updateImgArray[props.quizNum];
      updateImgArray[props.quizNum] = tempImg;
      updateQnaArray[props.quizNum + 1] = updateQnaArray[props.quizNum];
      updateQnaArray[props.quizNum] = tempQna;

      setQuizImgArray(updateImgArray);
      setQnaArray(updateQnaArray);
    }
  };

  // 중복 정답을 추가하기 위한 addBtnHandler 함수
  const addBtnHandler = (i: number): void => {
    if (i === 2) {
      const updateQnaArray = [...qnaArray];

      updateQnaArray[props.quizNum].answerNum = 2;

      setQnaArray(updateQnaArray);
    } else if (i === 3) {
      const updateQnaArray = [...qnaArray];

      updateQnaArray[props.quizNum].answerNum = 3;

      setQnaArray(updateQnaArray);
    }
  };

  // 입력된 정답 값을 삭제하고 재정렬하기 위한 removeBtnHandler 함수
  const removeBtnHandler = (i: number): void => {
    const updateQnaArray = [...qnaArray];
    if (i === 1) {
      if (updateQnaArray[props.quizNum].answerNum === 3) {
        updateQnaArray[props.quizNum].answerNum = 2;
        updateQnaArray[props.quizNum].answerArray[0] =
          updateQnaArray[props.quizNum].answerArray[1];
        updateQnaArray[props.quizNum].answerArray[1] =
          updateQnaArray[props.quizNum].answerArray[2];
        updateQnaArray[props.quizNum].answerArray[2] = '';
      } else if (updateQnaArray[props.quizNum].answerNum === 2) {
        updateQnaArray[props.quizNum].answerNum = 1;
        updateQnaArray[props.quizNum].answerArray[0] =
          updateQnaArray[props.quizNum].answerArray[1];
        updateQnaArray[props.quizNum].answerArray[1] = '';
      } else {
        updateQnaArray[props.quizNum].answerArray[0] = '';
      }
    } else if (i === 2) {
      if (updateQnaArray[props.quizNum].answerNum === 3) {
        updateQnaArray[props.quizNum].answerNum = 2;
        updateQnaArray[props.quizNum].answerArray[1] =
          updateQnaArray[props.quizNum].answerArray[2];
        updateQnaArray[props.quizNum].answerArray[2] = '';
      } else {
        updateQnaArray[props.quizNum].answerNum = 1;
        updateQnaArray[props.quizNum].answerArray[1] = '';
      }
    } else if (i === 3) {
      updateQnaArray[props.quizNum].answerNum = 2;
      updateQnaArray[props.quizNum].answerArray[2] = '';
    }
    setQnaArray(updateQnaArray);
  };

  // 문제 삭제를 위한 quizDeleteHandler 함수
  const quizDeleteHandler = (): void => {
    const updateImgArray = [...quizImgArray];
    const updataQnaArray = [...qnaArray];

    updateImgArray.splice(props.quizNum, 1);
    updataQnaArray.splice(props.quizNum, 1);

    setQuizImgArray(updateImgArray);
    setQnaArray(updataQnaArray);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.quizMoveNum}>
        <div className={styles.quizMoveUp} onClick={() => moveBtnHandler('UP')}>
          <svg
            className={styles.quizMoveUp_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        </div>

        <div className={styles.quizNum}>{props.quizNum + 1}</div>

        <div
          className={styles.quizMoveDown}
          onClick={() => moveBtnHandler('DOWN')}
        >
          <svg
            className={styles.quizMoveDown_icon}
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </div>
      </div>
      <div className={styles.quizImgWrapper}>
        <Image
          className={styles.quizImg}
          src={URL.createObjectURL(props.quizImgArray[props.quizNum])}
          alt={`${props.quizNum}`}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.quizInfo}>
        {props.multipleFilter === 1 ? (
          <div className={styles.answers}>
            <p className={styles.answers_title}>보기 (정답 보기에 체크)</p>
            <div className={styles.multipleAnswer}>
              <p className={styles.multipleNum}>1.</p>
              <input
                className={styles.multiple_text}
                type="text"
                spellCheck="false"
                name="1"
                value={qnaArray[props.quizNum].optionArray[0]}
                onChange={onChangeMultipleAnswers}
              />
              <div
                className={
                  multipleCheck === 1
                    ? styles.multiple_check_focused
                    : styles.multiple_check
                }
                onClick={() => multipleCheck1.current?.click()}
              >
                <svg
                  className={styles.multiple_check_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <input
                  type="checkbox"
                  style={{ display: 'none' }}
                  ref={multipleCheck1}
                  value={1}
                  onChange={onChangeMultipleCheck}
                />
              </div>
            </div>
            <div className={styles.multipleAnswer}>
              <p className={styles.multipleNum}>2.</p>
              <input
                className={styles.multiple_text}
                type="text"
                spellCheck="false"
                name="2"
                value={qnaArray[props.quizNum].optionArray[1]}
                onChange={onChangeMultipleAnswers}
              />
              <div
                className={
                  multipleCheck === 2
                    ? styles.multiple_check_focused
                    : styles.multiple_check
                }
                onClick={() => multipleCheck2.current?.click()}
              >
                <svg
                  className={styles.multiple_check_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <input
                  type="checkbox"
                  style={{ display: 'none' }}
                  ref={multipleCheck2}
                  value={2}
                  onChange={onChangeMultipleCheck}
                />
              </div>
            </div>
            <div className={styles.multipleAnswer}>
              <p className={styles.multipleNum}>3.</p>
              <input
                className={styles.multiple_text}
                type="text"
                spellCheck="false"
                name="3"
                value={qnaArray[props.quizNum].optionArray[2]}
                onChange={onChangeMultipleAnswers}
              />
              <div
                className={
                  multipleCheck === 3
                    ? styles.multiple_check_focused
                    : styles.multiple_check
                }
                onClick={() => multipleCheck3.current?.click()}
              >
                <svg
                  className={styles.multiple_check_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <input
                  type="checkbox"
                  style={{ display: 'none' }}
                  ref={multipleCheck3}
                  value={3}
                  onChange={onChangeMultipleCheck}
                />
              </div>
            </div>
            <div className={styles.multipleAnswer}>
              <p className={styles.multipleNum}>4.</p>
              <input
                className={styles.multiple_text}
                type="text"
                spellCheck="false"
                name="4"
                value={qnaArray[props.quizNum].optionArray[3]}
                onChange={onChangeMultipleAnswers}
              />
              <div
                className={
                  multipleCheck === 4
                    ? styles.multiple_check_focused
                    : styles.multiple_check
                }
                onClick={() => multipleCheck4.current?.click()}
              >
                <svg
                  className={styles.multiple_check_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <input
                  type="checkbox"
                  style={{ display: 'none' }}
                  ref={multipleCheck4}
                  value={4}
                  onChange={onChangeMultipleCheck}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.answers}>
            <p className={styles.answers_title}>정답 (중복 포함 최대 3개)</p>
            <div className={styles.shortAnswer}>
              <input
                className={styles.shortAnswer_text}
                type="text"
                spellCheck="false"
                name="1"
                value={qnaArray[props.quizNum].answerArray[0]}
                onChange={onChangeShortAnswers}
              />
              <svg
                className={styles.removeBtn_icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                onClick={() => removeBtnHandler(1)}
              >
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </div>
            {qnaArray[props.quizNum].answerNum >= 2 ? (
              <div className={styles.shortAnswer}>
                <input
                  className={styles.shortAnswer_text}
                  type="text"
                  spellCheck="false"
                  name="2"
                  value={qnaArray[props.quizNum].answerArray[1]}
                  onChange={onChangeShortAnswers}
                />
                <svg
                  className={styles.removeBtn_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  onClick={() => removeBtnHandler(2)}
                >
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              </div>
            ) : (
              <div
                className={styles.addAnswer}
                onClick={() => addBtnHandler(2)}
              >
                <svg
                  className={styles.add_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </div>
            )}
            {qnaArray[props.quizNum].answerNum === 3 ? (
              <div className={styles.shortAnswer}>
                <input
                  className={styles.shortAnswer_text}
                  type="text"
                  spellCheck="false"
                  name="3"
                  value={qnaArray[props.quizNum].answerArray[2]}
                  onChange={onChangeShortAnswers}
                />
                <svg
                  className={styles.removeBtn_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  onClick={() => removeBtnHandler(3)}
                >
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              </div>
            ) : qnaArray[props.quizNum].answerNum === 2 ? (
              <div
                className={styles.addAnswer}
                onClick={() => addBtnHandler(3)}
              >
                <svg
                  className={styles.add_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
      <div className={styles.quizBtns}>
        <button
          className={styles.quizImgEditBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg
            className={styles.quizImgEdit_icon}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
          </svg>
          <svg
            width="42"
            height="34"
            viewBox="0 0 42 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.832031 4.395C0.832031 3.875 0.917031 3.395 1.08703 2.955C1.25703 2.505 1.51203 2.125 1.85203 1.815C2.20203 1.495 2.64203 1.245 3.17203 1.065C3.70203 0.884999 4.32203 0.794999 5.03203 0.794999C5.74203 0.794999 6.36203 0.884999 6.89203 1.065C7.42203 1.245 7.85703 1.495 8.19703 1.815C8.54703 2.125 8.80703 2.505 8.97703 2.955C9.14703 3.395 9.23203 3.875 9.23203 4.395V10.185C9.23203 10.715 9.14703 11.2 8.97703 11.64C8.80703 12.08 8.54703 12.455 8.19703 12.765C7.85703 13.085 7.42203 13.335 6.89203 13.515C6.36203 13.695 5.74203 13.785 5.03203 13.785C4.32203 13.785 3.70203 13.695 3.17203 13.515C2.64203 13.335 2.20203 13.085 1.85203 12.765C1.51203 12.455 1.25703 12.08 1.08703 11.64C0.917031 11.2 0.832031 10.715 0.832031 10.185V4.395ZM10.282 0.944999H13.282V13.635H10.282V0.944999ZM5.03203 1.275C5.03203 2.375 4.91203 3.305 4.67203 4.065C4.44203 4.825 4.14203 5.445 3.77203 5.925C3.40203 6.395 2.98203 6.74 2.51203 6.96C2.05203 7.17 1.59703 7.285 1.14703 7.305C1.59703 7.325 2.05203 7.445 2.51203 7.665C2.98203 7.875 3.40203 8.215 3.77203 8.685C4.14203 9.155 4.44203 9.77 4.67203 10.53C4.91203 11.28 5.03203 12.205 5.03203 13.305C5.03203 12.205 5.14703 11.28 5.37703 10.53C5.61703 9.77 5.92203 9.155 6.29203 8.685C6.66203 8.205 7.07703 7.86 7.53703 7.65C7.99703 7.43 8.45203 7.31 8.90203 7.29C8.45203 7.27 7.99703 7.155 7.53703 6.945C7.07703 6.725 6.66203 6.38 6.29203 5.91C5.92203 5.44 5.61703 4.825 5.37703 4.065C5.14703 3.305 5.03203 2.375 5.03203 1.275ZM14.7773 0.944999H23.1773V13.635H14.7773V0.944999ZM24.2273 0.944999H27.2273V13.635H24.2273V0.944999ZM18.9773 1.275C18.9773 2.375 18.8573 3.305 18.6173 4.065C18.3873 4.825 18.0873 5.445 17.7173 5.925C17.3473 6.395 16.9273 6.74 16.4573 6.96C15.9973 7.17 15.5423 7.285 15.0923 7.305C15.5423 7.325 15.9973 7.445 16.4573 7.665C16.9273 7.875 17.3473 8.215 17.7173 8.685C18.0873 9.155 18.3873 9.77 18.6173 10.53C18.8573 11.28 18.9773 12.205 18.9773 13.305C18.9773 12.205 19.0923 11.28 19.3223 10.53C19.5623 9.77 19.8673 9.155 20.2373 8.685C20.6073 8.205 21.0223 7.86 21.4823 7.65C21.9423 7.43 22.3973 7.31 22.8473 7.29C22.3973 7.27 21.9423 7.155 21.4823 6.945C21.0223 6.725 20.6073 6.38 20.2373 5.91C19.8673 5.44 19.5623 4.825 19.3223 4.065C19.0923 3.305 18.9773 2.375 18.9773 1.275ZM38.1727 0.944999H41.1727V13.635H38.1727V0.944999ZM30.2377 3.27H28.6477V0.944999H37.3477V3.27H35.7577L37.4977 13.635H34.4227L32.9977 3.555L31.5727 13.635H28.4977L30.2377 3.27ZM17.2547 27.05H16.0547V27.935H7.80469V20.945H10.8047V22.04H13.0547V20.945H16.0547V21.785H17.2547V20.945H20.2547V29.735H17.2547V27.05ZM11.9297 22.445C11.9197 22.835 11.8547 23.185 11.7347 23.495C11.6247 23.805 11.4697 24.07 11.2697 24.29C11.0797 24.5 10.8547 24.665 10.5947 24.785C10.3347 24.905 10.0597 24.97 9.76969 24.98C10.0697 24.99 10.3497 25.06 10.6097 25.19C10.8697 25.31 11.0947 25.485 11.2847 25.715C11.4847 25.945 11.6397 26.225 11.7497 26.555C11.8697 26.875 11.9297 27.235 11.9297 27.635C11.9297 27.235 11.9847 26.875 12.0947 26.555C12.2047 26.225 12.3547 25.945 12.5447 25.715C12.7447 25.485 12.9747 25.31 13.2347 25.19C13.5047 25.06 13.7897 24.99 14.0897 24.98C13.7997 24.97 13.5247 24.905 13.2647 24.785C13.0047 24.665 12.7747 24.5 12.5747 24.29C12.3847 24.07 12.2297 23.805 12.1097 23.495C11.9997 23.185 11.9397 22.835 11.9297 22.445ZM16.0547 24.8H17.2547V24.035H16.0547V24.8ZM10.8047 28.88V31.31L14.5547 31.295C15.5347 31.285 16.5247 31.245 17.5247 31.175C18.5247 31.105 19.4597 31 20.3297 30.86V33.635H7.80469V28.88H10.8047ZM31.2 26.735H29.22L29.1 27.455H25.95C26.08 26.775 26.18 26.065 26.25 25.325C26.33 24.585 26.395 23.875 26.445 23.195H21.675V20.945H29.7C29.69 21.045 29.68 21.145 29.67 21.245C29.67 21.335 29.67 21.43 29.67 21.53H31.2V20.945H34.2V27.455H31.2V26.735ZM29.49 24.485H31.2V23.78H29.55L29.49 24.485ZM34.275 30.77C34.275 31.18 34.215 31.56 34.095 31.91C33.985 32.26 33.815 32.56 33.585 32.81C33.355 33.07 33.07 33.27 32.73 33.41C32.39 33.56 31.995 33.635 31.545 33.635H24.405C23.955 33.635 23.56 33.56 23.22 33.41C22.88 33.27 22.595 33.07 22.365 32.81C22.135 32.56 21.96 32.26 21.84 31.91C21.73 31.56 21.675 31.18 21.675 30.77C21.675 30.36 21.73 29.98 21.84 29.63C21.96 29.28 22.135 28.98 22.365 28.73C22.595 28.47 22.88 28.27 23.22 28.13C23.56 27.98 23.955 27.905 24.405 27.905H31.545C31.995 27.905 32.39 27.98 32.73 28.13C33.07 28.27 33.355 28.47 33.585 28.73C33.815 28.98 33.985 29.28 34.095 29.63C34.215 29.98 34.275 30.36 34.275 30.77ZM27.975 28.19C27.965 28.55 27.885 28.885 27.735 29.195C27.585 29.495 27.325 29.765 26.955 30.005C26.595 30.235 26.1 30.42 25.47 30.56C24.85 30.69 24.055 30.76 23.085 30.77C24.055 30.79 24.85 30.87 25.47 31.01C26.1 31.14 26.595 31.32 26.955 31.55C27.325 31.78 27.585 32.05 27.735 32.36C27.885 32.67 27.965 33 27.975 33.35C27.985 33 28.06 32.67 28.2 32.36C28.35 32.05 28.61 31.78 28.98 31.55C29.35 31.32 29.845 31.14 30.465 31.01C31.095 30.87 31.895 30.79 32.865 30.77C31.895 30.76 31.095 30.69 30.465 30.56C29.845 30.42 29.35 30.235 28.98 30.005C28.61 29.765 28.35 29.495 28.2 29.195C28.06 28.885 27.985 28.55 27.975 28.19Z"
              fill="white"
            />
          </svg>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={onChangeImageFile}
          />
        </button>
        <button className={styles.quizDeleteBtn} onClick={quizDeleteHandler}>
          <svg
            className={styles.quizDelete_icon}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
          <svg
            width="28"
            height="14"
            viewBox="0 0 28 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.3 0.944999H6.75L9.45 7.605H6.3L5.025 4.305L3.75 7.605H0.6L3.3 0.944999ZM9.75 0.944999H12.75V2.955H14.1V5.505H12.75V7.605H9.75V0.944999ZM9.75 13.635V10.38H0.75V8.055H12.75V13.635H9.75ZM20.1553 3.27L20.3503 5.88H21.3853V0.944999H23.9953V13.635H21.3853V8.43H20.5303L20.9203 13.635H18.3103L17.7703 3.255L17.2303 13.635H14.6203L15.3853 3.27H14.6203V0.944999H20.7703V3.27H20.1553ZM24.5353 0.944999H27.1453V13.635H24.5353V0.944999Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ListInQuiz;
