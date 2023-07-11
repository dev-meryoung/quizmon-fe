'use client';

import Image from 'next/image';
import styles from 'app/styles/login.module.scss';
import Link from 'next/link';
import quizmonLogo from 'public/imgs/quizmon-logo.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'app/components/Modal';
import LoadingSpinner from 'app/components/LoadingSpinner';
import apiClient from 'app/utils/apiClient';

const Login = (): React.ReactNode => {
  // 로그인 시 사용되는 값(아이디, 비밀번호, 비밀번호 확인)을 관리하기 위한 useState
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  // 로그인 페이지에서 발생하는 오류 메시지를 관리하기 위한 useState
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 로그인 페이지에서 발생하는 오류 메시지 모달의 노출 여부를 관리하는 useState
  const [viewModal, setViewModal] = useState<boolean>(false);

  // 페이지 내 로딩 상태 여부를 관리하는 useState
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 페이지 이동을 위한 useRouter
  const router = useRouter();

  // 오류 메시지 모달 창을 닫기 위한 핸들러 함수
  const modalCloseHandler = (): void => {
    setViewModal(false);
    setErrorMsg('');
  };

  // 로그인 API
  const loginApiHandler = (): void => {
    setIsLoading(true);
    apiClient
      .login(id, pw)
      .then((data) => {
        if (data.code === 200) {
          setIsLoading(false);
          router.push('/');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setViewModal(true);
        setErrorMsg(error.response.data.message);
      });
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

  return (
    <>
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
            />
          </div>
          <div className={styles.input}>
            <input
              className={styles.input_text}
              type="password"
              spellCheck="false"
              placeholder="비밀번호"
              onChange={onChangePw}
            />
          </div>
          <button className={styles.login_btn} onClick={loginApiHandler}>
            로그인
          </button>
          <Link className={styles.join_btn} href={'/join'}>
            회원가입
          </Link>
        </div>
      </main>
      {errorMsg !== '' && viewModal ? (
        <Modal
          type="ERROR"
          description={errorMsg}
          modalCloseHandler={modalCloseHandler}
        />
      ) : (
        ''
      )}
      {isLoading ? <LoadingSpinner /> : ''}
    </>
  );
};

export default Login;
