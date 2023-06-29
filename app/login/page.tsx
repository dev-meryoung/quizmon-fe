'use client';

import Image from 'next/image';
import styles from 'app/styles/login.module.scss';
import Link from 'next/link';
import quizmonIcon from 'public/imgs/quizmon-icon.svg';

const Login = (): React.ReactNode => {
  return (
    <div className={styles.contents}>
      <div className={styles.loginWrapper}>
        <div className={styles.logo}>
          <Image
            className={styles.logo_img}
            src={quizmonIcon}
            alt="quizmon"
            title="퀴즈몬"
            priority={true}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input_text}
            type="text"
            spellCheck="false"
            placeholder="아이디"
          />
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
    </div>
  );
};

export default Login;
