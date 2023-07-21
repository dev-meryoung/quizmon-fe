'use client';

import { useRef, useState } from 'react';
import styles from 'app/styles/selectBox.module.scss';

// SelectBox 컴포넌트의 props 타입 interface
export interface Options {
  op1: string;
  op2: string;
  op3?: string;
  op4?: string;
  op5?: string;
  optionFocused: number;
  setOptionFocused: Function;
}

const SelectBox = (props: Options): React.ReactNode => {
  // 옵션 목록의 노출 여부를 관리하기 위한 useState
  const [viewOptions, setViewOptions] = useState<boolean>(false);

  // 옵션 DOM 정보를 확인하기 위한 useRef
  const op1Dom = useRef<HTMLDivElement>(null);
  const op2Dom = useRef<HTMLDivElement>(null);
  const op3Dom = useRef<HTMLDivElement>(null);
  const op4Dom = useRef<HTMLDivElement>(null);
  const op5Dom = useRef<HTMLDivElement>(null);

  // 옵션의 클릭에 따라 상태를 변경하는 핸들러 함수
  const optionClickHandler = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target === op1Dom.current) {
      props.setOptionFocused(1);
    } else if (e.target === op2Dom.current) {
      props.setOptionFocused(2);
    } else if (e.target === op3Dom.current) {
      props.setOptionFocused(3);
    } else if (e.target === op4Dom.current) {
      props.setOptionFocused(4);
    } else if (e.target === op5Dom.current) {
      props.setOptionFocused(5);
    }
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        setViewOptions(!viewOptions);
      }}
    >
      <div className={styles.selected_option}>
        {props.optionFocused === 1
          ? props.op1
          : props.optionFocused === 2
          ? props.op2
          : props.optionFocused === 3
          ? props.op3
          : props.optionFocused === 4
          ? props.op4
          : props.optionFocused === 5
          ? props.op5
          : ''}
      </div>
      <div className={styles.arrow}>
        <svg
          className={styles.arrow_icon}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
      </div>
      {viewOptions ? (
        <div className={styles.options}>
          <div
            className={`${styles.option} ${
              props.optionFocused === 1 ? styles.option_focused : ''
            }`}
            ref={op1Dom}
            onClick={optionClickHandler}
          >
            {props.op1}
          </div>
          <div
            className={`${styles.option} ${
              props.optionFocused === 2 ? styles.option_focused : ''
            }`}
            ref={op2Dom}
            onClick={optionClickHandler}
          >
            {props.op2}
          </div>
          {props.op3 ? (
            <div
              className={`${styles.option} ${
                props.optionFocused === 3 ? styles.option_focused : ''
              }`}
              ref={op3Dom}
              onClick={optionClickHandler}
            >
              {props.op3}
            </div>
          ) : (
            ''
          )}
          {props.op4 ? (
            <div
              className={`${styles.option} ${
                props.optionFocused === 4 ? styles.option_focused : ''
              }`}
              ref={op4Dom}
              onClick={optionClickHandler}
            >
              {props.op4}
            </div>
          ) : (
            ''
          )}
          {props.op5 ? (
            <div
              className={`${styles.option} ${
                props.optionFocused === 5 ? styles.option_focused : ''
              }`}
              ref={op5Dom}
              onClick={optionClickHandler}
            >
              {props.op5}
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SelectBox;
