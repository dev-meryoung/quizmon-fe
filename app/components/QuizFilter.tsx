'use client';

import { MouseEventHandler, useRef, useState } from 'react';
import styles from 'app/styles/quizFilter.module.scss';

// QuizFilter 컴포넌트의 props 타입 interface
export interface Options {
  op1: string;
  op2: string;
  op3?: string;
  quizFilterFocused: number;
  setQuizFilterFocused: Function;
}

const QuizFilter = (props: Options): React.ReactNode => {
  // 퀴즈 필터 DOM 정보를 확인하기 위한 useRef
  const op1Dom = useRef<HTMLLIElement>(null);
  const op2Dom = useRef<HTMLLIElement>(null);
  const op3Dom = useRef<HTMLLIElement>(null);

  // 필터의 클릭에 따라 상태를 변경하는 핸들러 함수
  const quizFilterClickHandler = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target === op1Dom.current) {
      props.setQuizFilterFocused(1);
    } else if (e.target === op2Dom.current) {
      props.setQuizFilterFocused(2);
    } else if (e.target === op3Dom.current) {
      props.setQuizFilterFocused(3);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ul
        className={props.op3 ? styles.quizFilter_three : styles.quizFilter_two}
        onClick={quizFilterClickHandler}
      >
        <li
          className={`${styles.quizFilter_option} ${
            props.quizFilterFocused === 1
              ? styles.quizFilter_option_focused
              : ''
          }`}
          ref={op1Dom}
        >
          {props.op1}
        </li>
        <li
          className={`${styles.quizFilter_option} ${
            props.quizFilterFocused === 2
              ? styles.quizFilter_option_focused
              : ''
          }`}
          ref={op2Dom}
        >
          {props.op2}
        </li>
        {props.op3 ? (
          <li
            className={`${styles.quizFilter_option} ${
              props.quizFilterFocused === 3
                ? styles.quizFilter_option_focused
                : ''
            }`}
            ref={op3Dom}
          >
            {props.op3}
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
};

export default QuizFilter;
