'use client';

import styles from 'app/styles/adminModal.module.scss';
import { MouseEventHandler } from 'react';
import Filter from './Filter';

// AdminModal 컴포넌트의 props 타입 interface
export interface Options {
  filterFocused1: number;
  filterFocused2: number;
  setFilterFocused1: Function;
  setFilterFocused2: Function;
  modalCloseHandler: MouseEventHandler;
}

const AdminModal = (props: Options): React.ReactNode => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.option}>
          <p className={styles.option_title}>신고순</p>
          <Filter
            op1="ON"
            op2="OFF"
            filterFocused={props.filterFocused1}
            setFilterFocused={props.setFilterFocused1}
          />
        </div>
        <div className={styles.option}>
          <p className={styles.option_title}>공개범위</p>
          <Filter
            op1="전체"
            op2="공개"
            op3="비공개"
            filterFocused={props.filterFocused2}
            setFilterFocused={props.setFilterFocused2}
          />
        </div>
        <button className={styles.btn} onClick={props.modalCloseHandler}>
          <svg
            className={styles.btn_icon}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default AdminModal;
