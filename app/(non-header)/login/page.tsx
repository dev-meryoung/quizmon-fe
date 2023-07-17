'use client';

import Image from 'next/image';
import styles from 'app/styles/login.module.scss';
import Link from 'next/link';
import quizmonLogo from 'public/imgs/quizmon-logo.svg';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'app/components/Modal';
import LoadingSpinner from 'app/components/LoadingSpinner';
import { useLogin } from 'app/hooks/useLogin';

const Login = (): React.ReactNode => {
  // 페이지 이동을 위한 useRouter
  const router = useRouter();

  // 로그인 시 사용되는 값(아이디, 비밀번호, 비밀번호 확인)을 관리하기 위한 useState
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  // 로그인 페이지에서 발생하는 모달 메시지를 관리하기 위한 useState
  const [modalMsg, setModalMsg] = useState<string>('');

  // 로그인 페이지에서 발생하는 인포 모달의 노출 여부를 관리하는 useState
  const [viewInfoModal, setViewInfoModal] = useState<boolean>(false);

  // 모달 창을 닫기 위한 핸들러 함수
  const modalCloseHandler = (): void => {
    setViewInfoModal(false);
    setModalMsg('');
  };

  // 아이디 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowId: string = e.target.value;
    setId(nowId);
  };

  // 비밀번호 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowPw: string = e.target.value;
    setPw(nowPw);
  };

  // 로그인 관련 useMutate Custom Hook
  const {
    loginMutate,
    isLoginLoading,
    isLoginSuccess,
    isLoginError,
    loginError,
  } = useLogin(id, pw);

  // 로그인 버튼이 클릭되었을 때 실행하는 loginHandler 함수
  const loginHandler = (): void => {
    loginMutate();
  };

  // 로그인 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (isLoginError) {
      setModalMsg(loginError.response.data.message);
      setViewInfoModal(true);
    }

    if (isLoginSuccess) {
      router.push('/');
    }
  }, [router, isLoginSuccess, isLoginError, loginError]);

  // 엔터 키 클릭 이벤트를 감지하고 로그인을 실행하는 onKeyDown 함수
  const onEnterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !viewInfoModal) {
      loginHandler();
    }
  };

  return (
    <>
      {isLoginLoading ? <LoadingSpinner /> : ''}
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
              onChange={onChangeId}
              onKeyDown={onEnterKeyDown}
            />
          </div>
          <div className={styles.input}>
            <input
              className={styles.input_text}
              type="password"
              spellCheck="false"
              placeholder="비밀번호"
              onChange={onChangePw}
              onKeyDown={onEnterKeyDown}
            />
          </div>
          <button className={styles.login_btn} onClick={loginHandler}>
            로그인
          </button>
          <Link className={styles.join_btn} href={'/join'}>
            회원가입
          </Link>
        </div>
      </main>
      {modalMsg !== '' && viewInfoModal ? (
        <Modal
          type="INFO"
          description={modalMsg}
          modalCloseHandler={modalCloseHandler}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Login;
