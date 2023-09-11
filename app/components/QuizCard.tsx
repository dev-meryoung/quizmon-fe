'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from 'app/styles/quizCard.module.scss';
import test from 'public/imgs/test.jpg';
import { QuizListArray } from 'app/(header)/page';

export interface Options {
  data: QuizListArray;
}

const QuizCard = (props: Options): React.ReactNode => {
  // QuizCard 컴포넌트의 퀴즈 정보의 노출 상태를 관리하기 위한 useState
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // QuizCard 컴포넌트의 퀴즈 정보 노출 상태를 항상 토글하는 핸들러 함수
  const visibleHandler = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`${styles.wrapper} select_ban`}>
      <div className={styles.type}>
        <p>이미지</p>
      </div>
      <div
        className={`${styles.detail} ${isVisible ? styles.visible : ''}`}
        onClick={visibleHandler}
      >
        <p className={styles.label}>설명</p>
        <div className={styles.comment}>
          <p>{props.data.comment}</p>
        </div>
        <p className={styles.label}>누적 플레이</p>
        <div className={styles.playCount}>
          <p>{props.data.playCount}</p>
        </div>
      </div>
      <div className={styles.thumbnail}>
        <Image
          className={styles.thumbnail_img}
          src={props.data.thumbnailUrl}
          width={500}
          height={500}
          alt="이미지"
          priority
        />
      </div>
      <div className={styles.quizInfo}>
        <p className={styles.title}>{props.data.title}</p>
      </div>
      <div className={styles.btns}>
        <Link
          className={styles.playBtn}
          href={`/quiz/${props.data.urlId}`}
          target="_blank"
        >
          <svg
            className={styles.play_icon}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
          <p>플레이</p>
        </Link>
        <div className={styles.infoBtn} onClick={visibleHandler}>
          <svg
            className={styles.info_icon}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
