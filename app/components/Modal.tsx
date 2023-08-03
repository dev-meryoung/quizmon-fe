'use client';

import styles from 'app/styles/modal.module.scss';
import Image from 'next/image';
import quizmonIcon from 'public/imgs/quizmon-icon.svg';
import BlurBackground from './BlurBackgrond';
import { KeyboardEvent, MouseEventHandler, useState } from 'react';

// Modal 컴포넌트의 props 타입 interface
export interface Options {
  type: string;
  description: string;
  actionBtn?: string;
  modalCloseHandler: MouseEventHandler;
  modalActionHandler?: MouseEventHandler;
}

const Modal = (props: Options): React.ReactNode => {
  return props.type === 'INFO' ? (
    <>
      <div className={styles.wrapper}>
        <Image className={styles.icon} src={quizmonIcon} alt="로고" />
        <div className={styles.title}>
          <p>알 림</p>
        </div>
        <div className={styles.description}>
          <p>{props.description}</p>
        </div>
        <div className={styles.btns}>
          <button className={styles.btn} onClick={props.modalCloseHandler}>
            닫기
          </button>
        </div>
      </div>
      <div onClick={props.modalCloseHandler}>
        <BlurBackground />
      </div>
    </>
  ) : props.type === 'ACTION' ? (
    <>
      <div className={styles.wrapper}>
        <Image className={styles.icon} src={quizmonIcon} alt="로고" />
        <div className={styles.title}>
          <p>알 림</p>
        </div>
        <div className={styles.description}>
          <p>{props.description}</p>
        </div>
        <div className={styles.btns}>
          <button className={styles.btn} onClick={props.modalActionHandler}>
            {props.actionBtn}
          </button>
          <button
            className={styles.cancelBtn}
            onClick={props.modalCloseHandler}
          >
            취소
          </button>
        </div>
      </div>
      <div onClick={props.modalCloseHandler}>
        <BlurBackground />
      </div>
    </>
  ) : (
    ''
  );
};

export default Modal;
