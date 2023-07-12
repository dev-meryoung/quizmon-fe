'use client';

import { useState } from 'react';
import styles from 'app/styles/main.module.scss';
import QuizFilter from 'app/components/QuizFilter';
import QuizCard from 'app/components/QuizCard';

const Home = (): React.ReactNode => {
  // 퀴즈 필터 상태를 관리하기 위한 useState
  const [quizFilter1, setQuizFilter1] = useState<number>(1);
  const [quizFilter2, setQuizFilter2] = useState<number>(1);

  return (
    <>
      <main className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.filterMore}>
            <div className={styles.quizFilter}>
              <div className={styles.quizFilterSet}>
                <QuizFilter
                  op1="최신순"
                  op2="인기순"
                  quizFilterFocused={quizFilter1}
                  setQuizFilterFocused={setQuizFilter1}
                />
                {quizFilter1 === 2 ? (
                  <QuizFilter
                    op1="누적"
                    op2="실시간"
                    quizFilterFocused={quizFilter2}
                    setQuizFilterFocused={setQuizFilter2}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={styles.more}>
              <button className={styles.newQuizBtn}>
                <svg
                  className={styles.newQuiz_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
              <div className={styles.dot}>
                <svg
                  className={styles.dot_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 128 512"
                >
                  <title>정보</title>
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.quizList}>
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
