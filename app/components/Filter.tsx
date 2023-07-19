'use client';

import { useRef } from 'react';
import styles from 'app/styles/filter.module.scss';

// Filter 컴포넌트의 props 타입 interface
export interface Options {
  op1: string;
  op2: string;
  op3?: string;
  filterFocused: number;
  setFilterFocused: Function;
}

const Filter = (props: Options): React.ReactNode => {
  // 필터 DOM 정보를 확인하기 위한 useRef
  const op1Dom = useRef<HTMLLIElement>(null);
  const op2Dom = useRef<HTMLLIElement>(null);
  const op3Dom = useRef<HTMLLIElement>(null);

  // 필터의 클릭에 따라 상태를 변경하는 핸들러 함수
  const filterClickHandler = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target === op1Dom.current) {
      props.setFilterFocused(1);
    } else if (e.target === op2Dom.current) {
      props.setFilterFocused(2);
    } else if (e.target === op3Dom.current) {
      props.setFilterFocused(3);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ul
        className={props.op3 ? styles.filter_three : styles.filter_two}
        onClick={filterClickHandler}
      >
        <li
          className={`${styles.filter_option} ${
            props.filterFocused === 1 ? styles.filter_option_focused : ''
          }`}
          ref={op1Dom}
        >
          {props.op1}
        </li>
        <li
          className={`${styles.filter_option} ${
            props.filterFocused === 2 ? styles.filter_option_focused : ''
          }`}
          ref={op2Dom}
        >
          {props.op2}
        </li>
        {props.op3 ? (
          <li
            className={`${styles.filter_option} ${
              props.filterFocused === 3 ? styles.filter_option_focused : ''
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

export default Filter;
