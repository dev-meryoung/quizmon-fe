'use client';

import styles from 'app/styles/join.module.scss';
import Image from 'next/image';
import { ReactEventHandler, useState } from 'react';
import Link from 'next/link';
import quizmonLogo from 'public/imgs/quizmon-logo.svg';

const Join = (): React.ReactNode => {
  // 회원가입 시 사용되는 값(아이디, 비밀번호, 비밀번호 확인)을 관리하기 위한 useState
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  // 회원가입 시 유효성 검사 결과를 관리하기 위한 useState (0 : 초기값, 1 : 성공, 2 : 실패)
  const [checkId, setCheckId] = useState<number>(0);
  const [checkPw, setCheckPw] = useState<number>(0);
  const [checkConfirm, setCheckConfirm] = useState<number>(0);

  // 유효성 검사 오류 대상에 대한 메시지를 관리하기 위한 useState
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 회원가입 시 아이디의 유효성 검사를 실행하는 idCheckHandler 함수
  const idCheckHandler = (): void => {
    // 아이디 유효성 검사 기준 : 영어 소문자와 숫자를 포함한 4~20자
    const idRegExp: RegExp = /^[a-z\d]{4,20}$/;

    if (id.length === 0) {
      setCheckId(0);
      return;
    }

    if (!idRegExp.test(id)) {
      setCheckId(2);
    } else {
      setCheckId(1);
    }
  };

  // 회원가입 시 비밀번호의 유효성 검사를 실행하는 pwCheckHandler 함수
  const pwCheckHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // 비밀번호 유효성 검사 기준 : 영어 대/소문자와 숫자, 특수문자를 포함한 4~20자
    const pwRegExp: RegExp = /^[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{4,20}$/;

    if (pw.length === 0) {
      setCheckPw(0);
      return;
    }

    if (!pwRegExp.test(pw)) {
      setCheckPw(2);
    } else {
      setCheckPw(1);
    }

    if (pw !== confirm) {
      if (confirm.length === 0) return;
      setCheckConfirm(2);
    } else {
      setCheckConfirm(1);
    }
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

  // 비밀번호 확인 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeConfirm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowConfirm: string = e.target.value;
    setConfirm(nowConfirm);
  };

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
          <label className={styles.input_label}>
            *ID (4~20자 영문 소문자, 숫자)
          </label>
          <input
            className={
              checkId !== 2 ? styles.input_text : styles.input_text_error
            }
            type="text"
            spellCheck="false"
            placeholder="아이디"
            onChange={onChangeId}
            onBlur={idCheckHandler}
            value={id}
            maxLength={20}
          />
          <div className={styles.join_check}>
            {checkId === 2 ? (
              <svg
                className={styles.warn_icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg>
            ) : checkId === 1 ? (
              <svg
                className={styles.check_icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              </svg>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles.input_label}>
            *Password (4~20자 영문 대/소문자, 숫자, 특수문자)
          </label>
          <input
            className={styles.input_text}
            type="password"
            spellCheck="false"
            placeholder="비밀번호"
            onChange={onChangePw}
            onBlur={pwCheckHandler}
            value={pw}
            maxLength={20}
          />
          <div className={styles.join_check}>
            {checkPw === 2 ? (
              <>
                <svg
                  className={styles.warn_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </>
            ) : checkPw === 1 ? (
              <svg
                className={styles.check_icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              </svg>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.input}>
          <label className={styles.input_label}>*Confirm Password</label>
          <input
            className={styles.input_text}
            type="password"
            spellCheck="false"
            placeholder="비밀번호 확인"
            onBlur={pwCheckHandler}
            onChange={onChangeConfirm}
            value={confirm}
            maxLength={20}
          />
          <div className={styles.join_check}>
            {checkConfirm === 2 ? (
              <>
                <svg
                  className={styles.warn_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
              </>
            ) : checkConfirm === 1 ? (
              <svg
                className={styles.check_icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              </svg>
            ) : (
              ''
            )}
          </div>
        </div>
        <button className={styles.join_btn}>회원가입</button>
        <Link className={styles.policy_btn} href={'/policy'}>
          개인정보처리방침
        </Link>
      </div>
    </main>
  );
};

export default Join;
