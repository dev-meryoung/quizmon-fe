'use client';

import { useRef, useState } from 'react';
import styles from 'app/styles/filter.module.scss';

const Filter = (): React.ReactNode => {
  // Filter 컴포넌트 내의 1차 - 2차 - 3차 필터의 상태를 관리하기 위한 useState
  const [firstFilter, setFirstFilter] = useState<number>(1);
  const [secondFilter, setSecondFilter] = useState<number>(1);

  // 필터 DOM 정보를 확인하기 위한 useRef
  const f1_1 = useRef(null);
  const f1_2 = useRef(null);

  // 필터의 클릭에 따라 필터 상태를 변경하는 핸들러 함수
  const filterClickHandler = () => {
    console.log(f1_1.current, f1_2.current);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.filter_number_three} onClick={filterClickHandler}>
        <li
          className={`${styles.filter_option} ${styles.filter_option_focused}`}
          ref={f1_1}
        >
          전체
        </li>
        <li className={styles.filter_option} ref={f1_2}>
          이미지
        </li>
        <li className={styles.filter_option}>사운드</li>
      </ul>
      <ul className={styles.filter_number_two}>
        <li
          className={`${styles.filter_option} ${styles.filter_option_focused}`}
        >
          최신순
        </li>
        <li className={styles.filter_option}>인기순</li>
      </ul>
      <ul className={styles.filter_number_two}>
        <li
          className={`${styles.filter_option} ${styles.filter_option_focused}`}
        >
          누적
        </li>
        <li className={styles.filter_option}>실시간</li>
      </ul>
    </div>
  );
};

export default Filter;
