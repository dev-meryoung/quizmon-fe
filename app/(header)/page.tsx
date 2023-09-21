'use client';

import { useEffect, useState } from 'react';
import styles from 'app/styles/main.module.scss';
import Filter from 'app/components/Filter';
import QuizCard from 'app/components/QuizCard';
import LoadingSpinner from 'app/components/LoadingSpinner';
import { useAuthorCheck } from 'app/hooks/useAuthorCheck';
import stringCrypto from 'app/utils/stringCrypto';
import AdminModal from 'app/components/AdminModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNewQuizList } from 'app/hooks/useNewQuizList';
import { useAllHotQuizList } from 'app/hooks/useAllHotQuizList';
import { useRTHotQuizList } from 'app/hooks/useRTHotQuizList';
import setURLQueryString from 'app/utils/setURLQueryString';
import Image from 'next/image';
import noneQuizImg from 'public/imgs/none-quiz.svg';
import { useReportQuizList } from 'app/hooks/useReportQuizList';

export interface QuizListArray {
  comment: string;
  limitTime: number;
  playCount: number;
  quizId: string;
  reportCount: number;
  thumbnailUrl: string;
  timeStamp: string;
  title: string;
  type: string;
  urlId: string;
}

const Home = (): React.ReactNode => {
  // 페이지 이동을 위한 useRouter
  const router = useRouter();

  // 쿼리 파라미터 값을 사용하기 위한 useSearchParams
  const params = useSearchParams();

  // 메인 페이지의 마운트 상태를 관리하기 위한 useState
  const [mounted, setMounted] = useState<boolean>(false);

  // 퀴즈 필터 상태를 관리하기 위한 useState
  const [quizFilter1, setQuizFilter1] = useState<number>(1); // (1 : 최신순, 2 : 인기순)
  const [quizFilter2, setQuizFilter2] = useState<number>(1); // (1 : 누적(인기), 2 : 실시간(인기))

  // 관리자 필터 상태를 관리하기 위한 useState
  const [adminQuizFilter1, setAdminQuizFilter1] = useState<number>(2); // (1 : 신고순 ON, 2 : 신고순 OFF)
  const [adminQuizFilter2, setAdminQuizFilter2] = useState<number>(2); // (1 : 전체 공개글, 2 : 공개 퀴즈, 3 : 비공개 퀴즈)

  // 필터에 따른 정렬 상태을 관리하기 위한 useState
  const [filterState, setFilterState] = useState<number[]>([1, 2]); // (1 : 최신순, 2 : 실시간 인기순, 3 : 누적 인기순, 4 : 신고순 / 1 : 전체, 2 : 공개, 3 : 비공개)

  // 퀴즈 목록 데이터 요청 여부를 관리하기 위한 useState
  const [queAPI, setQueAPI] = useState<boolean>(false);

  // 다음 퀴즈 목록 최신순 데이터 요청 시 필요한 가장 마지막 퀴즈의 생성 시간을 관리하기 위한 useState
  const [timeStamp, setTimeStamp] = useState<string | null>(null);

  // 다음 퀴즈 목록 인기순 데이터 요청 시 필요한 가장 마지막 퀴즈의 순번을 관리하기 위한 useState
  const [seqNum, setSeqNum] = useState<number>(0);

  // 불러온 퀴즈 목록 데이터를 관리하기 위한 useState
  const [quizListArray, setQuizListArray] = useState<QuizListArray[]>([]);

  // 메인 페이지에서 발생하는 모달 메시지를 관리하기 위한 useState
  const [modalMsg, setModalMsg] = useState<string>('');

  // 메인 페이지에서 발생하는 인포 모달의 노출 여부를 관리하는 useState
  const [viewInfoModal, setViewInfoModal] = useState<boolean>(false);

  // 메인 페이지에서 발생하는 관리자 모달의 노출 여부를 관리하는 useState
  const [viewAdminModal, setViewAdminModal] = useState<boolean>(false);

  // JWT 토큰 검증 관련 useQuery Custom Hook
  const {
    authorCheckData,
    authorRefetch,
    isAuthorCheckLoading,
    isAuthorCheckSuccess,
    isAuthorCheckError,
    authorCheckError,
  } = useAuthorCheck();

  // 최신순 퀴즈 목록 불러오기 관련 useQuery
  const {
    newQuizListData,
    newQuizListRefetch,
    isNewQuizListLoading,
    isNewQuizListSuccess,
    isNewQuizListError,
    newQuizListError,
  } = useNewQuizList(filterState, params.get('keyword'), timeStamp);

  // 누적 인기순 퀴즈 목록 불러오기 관련 useQuery
  const {
    allHotQuizListData,
    allHotQuizListRefetch,
    isAllHotQuizListLoading,
    isAllHotQuizListSuccess,
    isAllHotQuizListError,
    allHotQuizListError,
  } = useAllHotQuizList(filterState, params.get('keyword'), seqNum);

  // 실시간 인기순 퀴즈 목록 불러오기 관련 useQuery
  const {
    rtHotQuizListData,
    rtHotQuizListRefetch,
    isRTHotQuizListLoading,
    isRTHotQuizListSuccess,
    isRTHotQuizListError,
    rtHotQuizListError,
  } = useRTHotQuizList(filterState, params.get('keyword'), seqNum);

  // 신고순 퀴즈 목록 불러오기 관련 useQuery
  const {
    reportQuizListData,
    reportQuizListRefetch,
    isReportQuizListLoading,
    isReportQuizListSuccess,
    isReportQuizListError,
    reportQuizListError,
  } = useReportQuizList(filterState, params.get('keyword'), timeStamp);

  // 스크롤 이벤트가 발생했을 때 실행할 핸들러 함수
  const scrollHandler = (): void => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    // 현재 스크롤 위치 + 창의 높이 >= 문서의 전체 높이일 때 최하단에 도착
    if (scrollY + windowHeight >= bodyHeight) {
      setQueAPI(true);
    } else {
      setQueAPI(false);
    }
  };

  // 관리자 모달 창을 열기 위한 핸들러 함수
  const adminModalOpenHandler = (): void => {
    if (isAuthorCheckSuccess) {
      if (authorCheckData.admin) {
        setViewAdminModal(true);
      }
    } else if (isAuthorCheckError) {
      setModalMsg(authorCheckError.response.data.message);
      setViewInfoModal(true);
    }
  };

  // 모달 창을 닫기 위한 핸들러 함수
  const modalCloseHandler = (): void => {
    setViewAdminModal(false);
    setViewInfoModal(false);
    setModalMsg('');
  };

  // 최초 회원정보 페이지 마운트 과정을 관리하기 위한 useEffect
  useEffect(() => {
    setMounted(true);

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', scrollHandler);

    // 관리자 로그인 상태라면 토큰 검증
    if (localStorage.getItem('user')?.split(':')[1] === stringCrypto('true')) {
      authorRefetch();
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [authorRefetch]);

  // 퀴즈 필터와 관리자 필터의 조작을 관리하기 위한 useEffect
  useEffect(() => {
    if (quizFilter1 === 1 || quizFilter1 === 2) {
      setAdminQuizFilter1(2);
    }
  }, [quizFilter1]);

  useEffect(() => {
    if (adminQuizFilter1 === 1) {
      setQuizFilter1(3);
    } else if (adminQuizFilter1 === 2) {
      setQuizFilter1(1);
    }
  }, [adminQuizFilter1]);

  // 퀴즈 필터의 변경 시 일어나는 과정을 관리하기 위한 useEffect
  useEffect(() => {
    setSeqNum(0);
    setTimeStamp(null);

    if (quizFilter1 === 1) {
      if (adminQuizFilter2 === 1) {
        setFilterState([1, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([1, 2]);
      } else {
        setFilterState([1, 3]);
      }
    } else if (quizFilter1 === 2 && quizFilter2 === 1) {
      if (adminQuizFilter2 === 1) {
        setFilterState([3, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([3, 2]);
      } else {
        setFilterState([3, 3]);
      }
    } else if (quizFilter1 === 2 && quizFilter2 === 2) {
      if (adminQuizFilter2 === 1) {
        setFilterState([2, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([2, 2]);
      } else {
        setFilterState([2, 3]);
      }
    } else if (adminQuizFilter1 === 1) {
      if (adminQuizFilter2 === 1) {
        setFilterState([4, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([4, 2]);
      } else {
        setFilterState([4, 3]);
      }
    }
  }, [quizFilter1, quizFilter2, adminQuizFilter1, adminQuizFilter2]);

  // 정렬 상태에 따라 데이터를 요청하는 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (filterState[0] === 1) {
      newQuizListRefetch();
    } else if (filterState[0] === 2) {
      rtHotQuizListRefetch();
    } else if (filterState[0] === 3) {
      allHotQuizListRefetch();
    } else if (filterState[0] === 4) {
      reportQuizListRefetch();
    }
  }, [
    filterState,
    newQuizListRefetch,
    allHotQuizListRefetch,
    rtHotQuizListRefetch,
    reportQuizListRefetch,
  ]);

  // 페이지 하단에서의 무한 스크롤 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (queAPI) {
      if (filterState[0] === 1) {
        newQuizListRefetch();
      } else if (filterState[0] === 3) {
        allHotQuizListRefetch();
      } else if (filterState[0] === 2) {
        rtHotQuizListRefetch();
      } else if (filterState[0] === 4) {
        reportQuizListRefetch();
      }
    }
  }, [
    queAPI,
    filterState,
    newQuizListRefetch,
    allHotQuizListRefetch,
    rtHotQuizListRefetch,
    reportQuizListRefetch,
  ]);

  // 퀴즈 목록을 불러오는 과정을 관리하기 위한 useEffect
  useEffect(() => {
    !queAPI ? setQuizListArray([]) : '';

    if (newQuizListData && filterState[0] === 1) {
      setQuizListArray((quizListArray) => [
        ...quizListArray,
        ...newQuizListData.quizArray,
      ]);
    } else if (allHotQuizListData && filterState[0] === 3) {
      setQuizListArray((quizListArray) => [
        ...quizListArray,
        ...allHotQuizListData.quizArray,
      ]);
    } else if (rtHotQuizListData && filterState[0] === 2) {
      setQuizListArray((quizListArray) => [
        ...quizListArray,
        ...rtHotQuizListData.quizArray,
      ]);
    } else if (reportQuizListData && filterState[0] === 4) {
      setQuizListArray((quizListArray) => [
        ...quizListArray,
        ...reportQuizListData.quizArray,
      ]);
    }
  }, [
    filterState,
    newQuizListData,
    allHotQuizListData,
    rtHotQuizListData,
    reportQuizListData,
  ]);

  useEffect(() => {
    if (
      filterState[0] === 1 &&
      newQuizListData &&
      newQuizListData.quizArray.length >= 20
    ) {
      setTimeStamp(newQuizListData.quizArray[19].timeStamp);
    } else if (
      filterState[0] === 3 &&
      allHotQuizListData &&
      allHotQuizListData.quizArray.length >= 20
    ) {
      setSeqNum((seqNum) => seqNum + allHotQuizListData.quizArray.length + 1);
    } else if (
      filterState[0] === 2 &&
      rtHotQuizListData &&
      rtHotQuizListData.quizArray.length >= 20
    ) {
      setSeqNum((seqNum) => seqNum + rtHotQuizListData.quizArray.length + 1);
    } else if (
      filterState[0] === 4 &&
      reportQuizListData &&
      reportQuizListData.quizArray.length >= 20
    ) {
      setTimeStamp(reportQuizListData.quizArray[19].timeStamp);
    }
  }, [
    filterState,
    newQuizListData,
    allHotQuizListData,
    rtHotQuizListData,
    reportQuizListData,
  ]);

  return (
    <>
      {isAuthorCheckLoading ||
      isNewQuizListLoading ||
      isAllHotQuizListLoading ||
      isRTHotQuizListLoading ||
      isReportQuizListLoading ? (
        <LoadingSpinner />
      ) : (
        ''
      )}
      <main className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.filterMore}>
            <div className={styles.quizFilter}>
              <div className={styles.quizFilterSet}>
                <Filter
                  op1="최신순"
                  op2="인기순"
                  filterFocused={quizFilter1}
                  setFilterFocused={setQuizFilter1}
                />
                {quizFilter1 === 2 ? (
                  <Filter
                    op1="누적"
                    op2="실시간"
                    filterFocused={quizFilter2}
                    setFilterFocused={setQuizFilter2}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={styles.more}>
              <button
                className={styles.newQuizBtn}
                onClick={() => {
                  if (localStorage.getItem('jwt') === null) {
                    router.push('/login');
                  } else {
                    router.push('/quiz/new');
                  }
                }}
              >
                <svg
                  className={styles.newQuiz_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </button>
              {mounted &&
              localStorage.getItem('user')?.split(':')[1] ===
                stringCrypto('true') ? (
                <div className={styles.admin}>
                  <svg
                    className={styles.admin_icon}
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    onClick={adminModalOpenHandler}
                  >
                    <title>관리자 기능</title>
                    <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                  </svg>
                  {viewAdminModal ? (
                    <AdminModal
                      filterFocused1={adminQuizFilter1}
                      filterFocused2={adminQuizFilter2}
                      setFilterFocused1={setAdminQuizFilter1}
                      setFilterFocused2={setAdminQuizFilter2}
                      modalCloseHandler={modalCloseHandler}
                    />
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className={styles.quizList}>
            {quizListArray.length > 0
              ? quizListArray.map((data) => {
                  return <QuizCard key={data.quizId} data={data} />;
                })
              : ''}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
