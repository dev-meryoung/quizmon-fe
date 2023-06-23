'use client';

import styles from 'app/styles/main.module.scss';
import Filter from 'app/components/Filter';
import QuizCard from 'app/components/QuizCard';

const Home = (): React.ReactNode => {
  return (
    <main className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.filter}>
          <Filter />
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
  );
};

export default Home;
