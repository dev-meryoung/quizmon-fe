'use client';

import { useState } from 'react';
import styles from 'app/styles/main.module.scss';
import QuizFilter from 'app/components/QuizFilter';
import QuizCard from 'app/components/QuizCard';
import Header from 'app/components/Header';

const Home = (): React.ReactNode => {
  // 퀴즈 필터 상태를 관리하기 위한 useState
  const [quizFilter1, setQuizFilter1] = useState<number>(1);
  const [quizFilter2, setQuizFilter2] = useState<number>(1);
  const [quizFilter3, setQuizFilter3] = useState<number>(1);
  const [quizFilter4, setQuizFilter4] = useState<number>(1);

  return (
    <div className={styles.contents}>
      <div className={styles.searchFilter}>
        <QuizFilter
          op1="전체"
          op2="이미지"
          op3="사운드"
          quizFilterFocused={quizFilter1}
          setQuizFilterFocused={setQuizFilter1}
        />
        {false ? (
          <QuizFilter
            op1="최신순"
            op2="인기순"
            op3="신고순"
            quizFilterFocused={quizFilter2}
            setQuizFilterFocused={setQuizFilter2}
          />
        ) : (
          <QuizFilter
            op1="최신순"
            op2="인기순"
            quizFilterFocused={quizFilter2}
            setQuizFilterFocused={setQuizFilter2}
          />
        )}
        {quizFilter2 === 2 ? (
          <QuizFilter
            op1="누적"
            op2="실시간"
            quizFilterFocused={quizFilter3}
            setQuizFilterFocused={setQuizFilter3}
          />
        ) : (
          ''
        )}
        {false ? (
          <QuizFilter
            op1="전체"
            op2="공개"
            op3="비공개"
            quizFilterFocused={quizFilter4}
            setQuizFilterFocused={setQuizFilter4}
          />
        ) : (
          ''
        )}
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
  );
};

export default Home;
