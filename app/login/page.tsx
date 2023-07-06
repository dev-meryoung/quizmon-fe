'use client';

import Image from 'next/image';
import styles from 'app/styles/login.module.scss';
import Link from 'next/link';
import quizmonLogo from 'public/imgs/quizmon-logo.svg';

const Login = (): React.ReactNode => {
  return (
    <main className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            className={styles.logo_img}
            src={quizmonLogo}
            alt="quizmon"
            title="퀴즈몬"
            priority={true}
          />
        </Link>
      </div>
      <div className={styles.contents}>
        <div className={styles.input}>
          <input
            className={styles.input_text}
            type="text"
            spellCheck="false"
            placeholder="아이디"
          />
        </div>
        <div className={styles.input}>
          <input
            className={styles.input_text}
            type="password"
            spellCheck="false"
            placeholder="비밀번호"
          />
        </div>
        <button className={styles.login_btn}>로그인</button>
        <Link className={styles.join_btn} href={'/join'}>
          회원가입
        </Link>
      </div>
    </main>
  );
};

export default Login;
