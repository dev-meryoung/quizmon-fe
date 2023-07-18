'use client';

import styles from 'app/styles/user.module.scss';
import { useEffect, useState } from 'react';
import userRegExp from 'app/utils/userRegExp';
import LoadingSpinner from 'app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useUserEdit } from 'app/hooks/useUserEdit';
import Modal from 'app/components/Modal';
import { useUserWithdraw } from 'app/hooks/useUserWithdraw';

const User = (): React.ReactNode => {
  // 페이지 이동을 위한 useRouter
  const router = useRouter();

  // 회원정보 페이지의 마운트 상태를 관리하기 위한 useState
  const [mounted, setMounted] = useState<boolean>(false);

  // userEdit 컴포넌트의 노출 여부를 관리하기 위한 useState
  const [viewUserEdit, setViewUserEdit] = useState<boolean>(false);

  // 회원정보 페이지에서 발생하는 모달 메시지를 관리하기 위한 useState
  const [modalMsg, setModalMsg] = useState<string>('');

  // 회원정보 페이지에서 발생하는 인포 모달의 노출 여부를 관리하는 useState
  const [viewInfoModal, setViewInfoModal] = useState<boolean>(false);

  // 회원정보 페이지에서 발생하는 액션 모달의 노출 여부를 관리하는 useState
  const [viewActionModal, setViewActionModal] = useState<boolean>(false);

  // 회원정보 값(아이디, 비밀번호, 비밀번호 확인)을 관리하기 위한 useState
  const [id, setId] = useState<string>('');
  const [currentPw, setCurrentPw] = useState<string>('');
  const [newPw, setNewPw] = useState<string>('');
  const [confirmNewPw, setConfirmNewPw] = useState<string>('');

  // 회원정보 수정 시 유효성 검사 결과를 관리하기 위한 useState (0 : 초기값, 1 : 성공, 2 : 실패)
  const [checkCurrentPw, setCheckCurrentPw] = useState<number>(0);
  const [checkNewPw, setCheckNewPw] = useState<number>(0);
  const [checkConfirmNewPw, setCheckConfirmNewPw] = useState<number>(0);

  // 회원정보 수정 시 유효성 검사 결과에 문제가 있는 컴포넌트를 강조(흔들림 효과)하기 위한 useState
  const [vibraCurrentPw, setVibraCurrentPw] = useState<boolean>(false);
  const [vibraNewPw, setVibraNewPw] = useState<boolean>(false);
  const [vibraConfirmNewPw, setVibraConfirmNewPw] = useState<boolean>(false);

  // 모달 창을 닫기 위한 핸들러 함수
  const modalCloseHandler = (): void => {
    setViewInfoModal(false);
    setViewActionModal(false);

    if (modalMsg === '탈퇴가 완료되었습니다.') {
      router.push('/');
      router.refresh();
    }

    setModalMsg('');
  };

  // userEdit 컴포넌트의 노출 여부 상태를 변경하고 input 값을 초기화하는 핸들러 함수
  const viewUserEditHandler = (): void => {
    setViewUserEdit(!viewUserEdit);

    setCurrentPw('');
    setNewPw('');
    setConfirmNewPw('');
    setCheckNewPw(0);
    setCheckConfirmNewPw(0);
  };

  // 내 정보 수정 시 현재 비밀번호의 유효성 검사를 실행하는 currentPwCheckHandler 함수
  const currentPwCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (currentPw.length === 0) {
      setCheckCurrentPw(0);
    } else {
      setCheckCurrentPw(1);
    }
  };

  // 내 정보 수정 시 새로운 비밀번호의 유효성 검사를 실행하는 newPwCheckHandler 함수
  const newPwCheckHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (newPw.length === 0) {
      setCheckNewPw(0);
      return;
    }

    if (userRegExp('PW', newPw) && currentPw !== newPw) {
      setCheckNewPw(1);
    } else {
      setCheckNewPw(2);
    }

    if (newPw !== confirmNewPw) {
      if (confirmNewPw.length === 0) return;
      setCheckConfirmNewPw(2);
    } else {
      setCheckConfirmNewPw(1);
    }
  };

  // 현재 비밀번호 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeCurrentPw = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowCurrentPw: string = e.target.value;
    setCurrentPw(nowCurrentPw);
  };

  // 새로운 비밀번호 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeNewPw = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nowNewPw: string = e.target.value;
    setNewPw(nowNewPw);
  };

  // 새로운 비밀번호 확인 값의 변화를 useState에 적용하기 위한 onChange 함수
  const onChangeConfirmNewPw = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const nowConfirmNewPw: string = e.target.value;
    setConfirmNewPw(nowConfirmNewPw);
  };

  // 최초 회원정보 페이지 마운트 과정을 관리하기 위한 useEffect
  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('jwt') === null) {
      router.push('/login');
    } else {
      if (localStorage.getItem('user')) {
        const userId: string | undefined = localStorage
          .getItem('user')
          ?.split(':')[0];

        if (userId) {
          setId(userId);
        }
      }
    }
  }, [router]);

  // 회원정보 수정 관련 useMutate Custom Hook
  const {
    userEditMutate,
    isUserEditLoading,
    isUserEditSuccess,
    isUserEditError,
    userEditError,
  } = useUserEdit(currentPw, newPw);

  // 정보 수정 버튼이 클릭되었을 때 실행하는 editHandler 함수
  const userEditHandler = (): void => {
    if (checkCurrentPw === 1 && checkNewPw === 1 && checkConfirmNewPw === 1) {
      userEditMutate();
    } else {
      if (checkCurrentPw !== 1) {
        setCheckCurrentPw(2);
        setVibraCurrentPw(true);
        setTimeout(() => {
          setVibraCurrentPw(false);
        }, 300);
      }

      if (checkNewPw !== 1) {
        setCheckNewPw(2);
        setVibraNewPw(true);
        setTimeout(() => {
          setVibraNewPw(false);
        }, 300);
      }

      if (checkConfirmNewPw !== 1) {
        setCheckConfirmNewPw(2);
        setVibraConfirmNewPw(true);
        setTimeout(() => {
          setVibraConfirmNewPw(false);
        }, 300);
      }
    }
  };

  // 회원정보 수정 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (isUserEditSuccess) {
      setModalMsg('회원정보 수정에 성공했습니다.');
      setViewInfoModal(true);
      setCurrentPw('');
      setNewPw('');
      setConfirmNewPw('');
    }

    if (isUserEditError) {
      setModalMsg(userEditError.response.data.message);
      setCheckCurrentPw(2);
      setViewInfoModal(true);
    }
  }, [isUserEditSuccess, isUserEditError, userEditError]);

  // 회원탈퇴 관련 useMutate Custom Hook
  const {
    userWithdrawMutate,
    isUserWithdrawLoading,
    isUserWithdrawSuccess,
    isUserWithdrawError,
    userWithdrawError,
  } = useUserWithdraw(currentPw);

  // 회원탈퇴 버튼이 클릭되었을 때 실행하는 userWithdrawHandler 함수
  const userWithdrawHandler = (): void => {
    if (checkCurrentPw === 1) {
      userWithdrawMutate();
      setViewActionModal(false);
    } else {
      if (checkCurrentPw !== 1) {
        setViewActionModal(false);
        setCheckCurrentPw(2);
        setVibraCurrentPw(true);
        setTimeout(() => {
          setVibraCurrentPw(false);
        }, 300);
      }
    }
  };

  // 회원탈퇴 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (isUserWithdrawSuccess) {
      localStorage.removeItem('jwt');
      setModalMsg('탈퇴가 완료되었습니다.');
      setViewInfoModal(true);
    }

    if (isUserWithdrawError) {
      setModalMsg(userWithdrawError.response.data.message);
      setViewInfoModal(true);

      if (userWithdrawError.response.data.code === 11301) {
        setCheckCurrentPw(2);
      }
    }
  }, [router, isUserWithdrawSuccess, isUserWithdrawError, userWithdrawError]);

  return (
    <>
      {viewInfoModal ? (
        <Modal
          type="INFO"
          description={modalMsg}
          modalCloseHandler={modalCloseHandler}
        />
      ) : (
        ''
      )}
      {viewActionModal ? (
        <Modal
          type="ACTION"
          description="정말 탈퇴하시겠습니까?"
          actionBtn="탈퇴"
          modalActionHandler={userWithdrawHandler}
          modalCloseHandler={modalCloseHandler}
        />
      ) : (
        ''
      )}
      {isUserEditLoading || isUserWithdrawLoading ? <LoadingSpinner /> : ''}
      {mounted && localStorage.getItem('jwt') !== null ? (
        <main className={styles.container}>
          <div className={styles.contents}>
            {viewUserEdit ? (
              <div className={styles.userEdit}>
                <div className={styles.title}>
                  <p>내 정보 수정</p>
                  <div className={styles.back}>
                    <svg
                      className={styles.back_icon}
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                      onClick={viewUserEditHandler}
                    >
                      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.input}>
                  <label className={styles.input_label}>ID</label>
                  <input
                    className={styles.input_text}
                    type="text"
                    spellCheck="false"
                    placeholder="아이디"
                    value={id}
                    maxLength={20}
                    disabled
                  />
                </div>
                <div
                  className={`${styles.input} ${
                    vibraCurrentPw ? styles.input_vibration : ''
                  }`}
                >
                  <label className={styles.input_label}>
                    *Current Password
                  </label>
                  <input
                    className={
                      checkCurrentPw !== 2
                        ? styles.input_text
                        : styles.input_text_error
                    }
                    type="password"
                    spellCheck="false"
                    placeholder="현재 비밀번호"
                    value={currentPw}
                    onBlur={currentPwCheckHandler}
                    onChange={onChangeCurrentPw}
                    maxLength={20}
                  />
                  {checkCurrentPw === 2 ? (
                    <div className={styles.edit_check}>
                      <svg
                        className={styles.warn_icon}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                      </svg>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div
                  className={`${styles.input} ${
                    vibraNewPw ? styles.input_vibration : ''
                  }`}
                >
                  <label className={styles.input_label}>
                    *New Password (4~20자 영문 대/소문자, 숫자, 특수문자)
                  </label>
                  <input
                    className={
                      checkNewPw !== 2
                        ? styles.input_text
                        : styles.input_text_error
                    }
                    type="password"
                    spellCheck="false"
                    placeholder="새로운 비밀번호"
                    value={newPw}
                    onBlur={newPwCheckHandler}
                    onChange={onChangeNewPw}
                    maxLength={20}
                  />
                  <div className={styles.edit_check}>
                    {checkNewPw === 2 ? (
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
                    ) : checkNewPw === 1 ? (
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
                <div
                  className={`${styles.input} ${
                    vibraConfirmNewPw ? styles.input_vibration : ''
                  }`}
                >
                  <label className={styles.input_label}>
                    *Confirm New Password
                  </label>
                  <input
                    className={
                      checkConfirmNewPw !== 2
                        ? styles.input_text
                        : styles.input_text_error
                    }
                    type="password"
                    spellCheck="false"
                    placeholder="새로운 비밀번호 확인"
                    value={confirmNewPw}
                    onBlur={newPwCheckHandler}
                    onChange={onChangeConfirmNewPw}
                    maxLength={20}
                  />
                  <div className={styles.edit_check}>
                    {checkConfirmNewPw === 2 ? (
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
                    ) : checkConfirmNewPw === 1 ? (
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
                <button className={styles.edit_btn} onClick={userEditHandler}>
                  정보 수정
                </button>
                <a
                  className={styles.delete_btn}
                  onClick={() => {
                    setViewActionModal(true);
                  }}
                >
                  회원탈퇴
                </a>
              </div>
            ) : (
              <div className={styles.btns}>
                <button className={styles.btn} id="myQuizBtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="150"
                    viewBox="0 0 448 512"
                  >
                    <path d="M64 256c0 88.4 71.6 160 160 160c28.9 0 56-7.7 79.4-21.1l-72-86.4c-11.3-13.6-9.5-33.8 4.1-45.1s33.8-9.5 45.1 4.1l70.9 85.1C371.9 325.8 384 292.3 384 256c0-88.4-71.6-160-160-160S64 167.6 64 256zM344.9 444.6C310 467 268.5 480 224 480C100.3 480 0 379.7 0 256S100.3 32 224 32s224 100.3 224 224c0 56.1-20.6 107.4-54.7 146.7l47.3 56.8c11.3 13.6 9.5 33.8-4.1 45.1s-33.8 9.5-45.1-4.1l-46.6-55.9z" />
                  </svg>
                  <svg
                    width="179"
                    height="50"
                    viewBox="0 0 179 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.47 0.889999H18.23V10.76H19.64V0.889999H25.4V26.27H19.64V15.86H18.23V26.27H12.47V0.889999ZM0.5 0.889999H6.32V21.62C7 21.62 7.81 21.57 8.75 21.47C9.71 21.37 10.6 21.22 11.42 21.02V26.27H0.5V0.889999ZM36.4906 26.27C36.7706 24.49 37.0206 22.76 37.2406 21.08C37.4806 19.4 37.6906 17.72 37.8706 16.04C38.0506 14.36 38.2006 12.66 38.3206 10.94C38.4406 9.22 38.5206 7.42 38.5606 5.54H28.2406V0.889999H44.8906C44.8506 3.19 44.7806 5.4 44.6806 7.52C44.5806 9.62 44.4506 11.69 44.2906 13.73C44.1306 15.77 43.9206 17.82 43.6606 19.88C43.4206 21.94 43.1306 24.07 42.7906 26.27H36.4906ZM46.3906 0.889999H52.3906V9.86H55.0906V14.96H52.3906V26.27H46.3906V0.889999ZM63.1367 0.889999H79.6367V14.57H63.1367V0.889999ZM81.1367 0.889999H87.1367V5.96H89.8367V11.06H87.1367V18.47H81.1367V0.889999ZM71.3867 2.18C71.3467 3.18 71.1667 4.03 70.8467 4.73C70.5467 5.43 70.1267 6.01 69.5867 6.47C69.0467 6.91 68.4067 7.23 67.6667 7.43C66.9267 7.63 66.1267 7.74 65.2667 7.76C66.1467 7.78 66.9567 7.9 67.6967 8.12C68.4567 8.32 69.1067 8.65 69.6467 9.11C70.1867 9.57 70.6067 10.17 70.9067 10.91C71.2267 11.65 71.3867 12.55 71.3867 13.61C71.3867 12.55 71.5367 11.65 71.8367 10.91C72.1367 10.17 72.5567 9.57 73.0967 9.11C73.6367 8.65 74.2767 8.31 75.0167 8.09C75.7767 7.87 76.6067 7.75 77.5067 7.73C76.6467 7.71 75.8467 7.6 75.1067 7.4C74.3667 7.2 73.7267 6.88 73.1867 6.44C72.6467 6 72.2167 5.43 71.8967 4.73C71.5767 4.03 71.4067 3.18 71.3867 2.18ZM69.1367 16.46V21.62L75.7367 21.59C77.6967 21.57 79.6767 21.49 81.6767 21.35C83.6767 21.21 85.5467 21 87.2867 20.72V26.27H63.1367V16.46H69.1367ZM91.0273 0.889999H115.927V4.73C114.507 4.95 113.017 5.11 111.457 5.21C109.897 5.29 108.107 5.33 106.087 5.33H97.0273V7.31H106.087C108.107 7.31 109.897 7.27 111.457 7.19C113.017 7.09 114.507 6.93 115.927 6.71V11.75H91.0273V0.889999ZM91.0273 12.8H115.927V17.45H91.0273V12.8ZM97.0273 18.41V21.62L104.527 21.59C106.487 21.57 108.467 21.49 110.467 21.35C112.467 21.21 114.337 21 116.077 20.72V26.27H91.0273V18.41H97.0273ZM125.773 14.57H136.003C136.043 14.19 136.083 13.82 136.123 13.46C136.163 13.08 136.193 12.7 136.213 12.32H125.773V7.88H136.363V5.54H125.623V0.889999H142.873C142.873 2.13 142.863 3.33 142.843 4.49C142.843 5.65 142.823 6.79 142.783 7.91C142.763 9.03 142.713 10.14 142.633 11.24C142.573 12.34 142.463 13.45 142.303 14.57H143.473V19.22H137.623V26.27H131.323V19.22H125.773V14.57ZM144.673 0.889999H150.673V26.27H144.673V0.889999ZM153.664 0.889999H178.564V5.54H172.654L178.564 17.39H171.664L166.114 5.51L160.564 17.39H153.664L159.574 5.54H153.664V0.889999ZM153.664 21.62H178.564V26.27H153.664V21.62Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  className={styles.btn}
                  id="userEditBtn"
                  onClick={viewUserEditHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="130"
                    height="150"
                    viewBox="0 0 640 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
                  </svg>
                  <svg
                    width="151"
                    height="50"
                    viewBox="0 0 151 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.47 0.889999H18.23V10.76H19.64V0.889999H25.4V26.27H19.64V15.86H18.23V26.27H12.47V0.889999ZM0.5 0.889999H6.32V21.62C7 21.62 7.81 21.57 8.75 21.47C9.71 21.37 10.6 21.22 11.42 21.02V26.27H0.5V0.889999ZM51.1161 5.54H49.0161L51.5961 13.91H45.4461L43.3461 5.51L41.2461 13.91H35.0961L37.6761 5.54H35.0961V0.889999H51.5961V4.94H54.1461V0.889999H60.1461V13.91H54.1461V10.04H51.1161V5.54ZM60.2961 20.54C60.2961 21.36 60.1761 22.12 59.9361 22.82C59.7161 23.52 59.3761 24.12 58.9161 24.62C58.4561 25.14 57.8861 25.54 57.2061 25.82C56.5261 26.12 55.7361 26.27 54.8361 26.27H40.5561C39.6561 26.27 38.8661 26.12 38.1861 25.82C37.5061 25.54 36.9361 25.14 36.4761 24.62C36.0161 24.12 35.6661 23.52 35.4261 22.82C35.2061 22.12 35.0961 21.36 35.0961 20.54C35.0961 19.72 35.2061 18.96 35.4261 18.26C35.6661 17.56 36.0161 16.96 36.4761 16.46C36.9361 15.94 37.5061 15.54 38.1861 15.26C38.8661 14.96 39.6561 14.81 40.5561 14.81H54.8361C55.7361 14.81 56.5261 14.96 57.2061 15.26C57.8861 15.54 58.4561 15.94 58.9161 16.46C59.3761 16.96 59.7161 17.56 59.9361 18.26C60.1761 18.96 60.2961 19.72 60.2961 20.54ZM47.6961 15.38C47.6761 16.1 47.5161 16.77 47.2161 17.39C46.9161 17.99 46.3961 18.53 45.6561 19.01C44.9361 19.47 43.9461 19.84 42.6861 20.12C41.4461 20.38 39.8561 20.52 37.9161 20.54C39.8561 20.58 41.4461 20.74 42.6861 21.02C43.9461 21.28 44.9361 21.64 45.6561 22.1C46.3961 22.56 46.9161 23.1 47.2161 23.72C47.5161 24.34 47.6761 25 47.6961 25.7C47.7161 25 47.8661 24.34 48.1461 23.72C48.4461 23.1 48.9661 22.56 49.7061 22.1C50.4461 21.64 51.4361 21.28 52.6761 21.02C53.9361 20.74 55.5361 20.58 57.4761 20.54C55.5361 20.52 53.9361 20.38 52.6761 20.12C51.4361 19.84 50.4461 19.47 49.7061 19.01C48.9661 18.53 48.4461 17.99 48.1461 17.39C47.8661 16.77 47.7161 16.1 47.6961 15.38ZM88.0367 0.889999V17.15H78.7367V21.62H88.0367V26.27H63.1367V21.62H72.4367V17.15H63.1367V0.889999H69.1367V4.07H82.0367V0.889999H88.0367ZM75.5867 4.52C75.5867 6.46 74.6367 7.96 72.7367 9.02C70.8367 10.06 67.9967 10.6 64.2167 10.64C67.9967 10.7 70.8367 11.23 72.7367 12.23C74.6367 13.21 75.5867 14.66 75.5867 16.58C75.5867 14.66 76.5267 13.2 78.4067 12.2C80.3067 11.2 83.1467 10.67 86.9267 10.61C83.1467 10.57 80.3067 10.03 78.4067 8.99C76.5267 7.95 75.5867 6.46 75.5867 4.52ZM107.183 0.889999H113.483L122.783 13.25H115.883L110.333 5.51L104.783 13.25H97.8828L107.183 0.889999ZM97.8828 14.51H122.783V19.16H113.483V26.27H107.183V19.16H97.8828V14.51ZM141.643 5.54H139.543L142.123 13.91H135.973L133.873 5.51L131.773 13.91H125.623L128.203 5.54H125.623V0.889999H142.123V4.94H144.673V0.889999H150.673V13.91H144.673V10.04H141.643V5.54ZM150.823 20.54C150.823 21.36 150.703 22.12 150.463 22.82C150.243 23.52 149.903 24.12 149.443 24.62C148.983 25.14 148.413 25.54 147.733 25.82C147.053 26.12 146.263 26.27 145.363 26.27H131.083C130.183 26.27 129.393 26.12 128.713 25.82C128.033 25.54 127.463 25.14 127.003 24.62C126.543 24.12 126.193 23.52 125.953 22.82C125.733 22.12 125.623 21.36 125.623 20.54C125.623 19.72 125.733 18.96 125.953 18.26C126.193 17.56 126.543 16.96 127.003 16.46C127.463 15.94 128.033 15.54 128.713 15.26C129.393 14.96 130.183 14.81 131.083 14.81H145.363C146.263 14.81 147.053 14.96 147.733 15.26C148.413 15.54 148.983 15.94 149.443 16.46C149.903 16.96 150.243 17.56 150.463 18.26C150.703 18.96 150.823 19.72 150.823 20.54ZM138.223 15.38C138.203 16.1 138.043 16.77 137.743 17.39C137.443 17.99 136.923 18.53 136.183 19.01C135.463 19.47 134.473 19.84 133.213 20.12C131.973 20.38 130.383 20.52 128.443 20.54C130.383 20.58 131.973 20.74 133.213 21.02C134.473 21.28 135.463 21.64 136.183 22.1C136.923 22.56 137.443 23.1 137.743 23.72C138.043 24.34 138.203 25 138.223 25.7C138.243 25 138.393 24.34 138.673 23.72C138.973 23.1 139.493 22.56 140.233 22.1C140.973 21.64 141.963 21.28 143.203 21.02C144.463 20.74 146.063 20.58 148.003 20.54C146.063 20.52 144.463 20.38 143.203 20.12C141.963 19.84 140.973 19.47 140.233 19.01C139.493 18.53 138.973 17.99 138.673 17.39C138.393 16.77 138.243 16.1 138.223 15.38Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </main>
      ) : (
        ''
      )}
    </>
  );
};

export default User;
