import { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/svg/logo.svg";

import { TextInfo } from "../components/TextInfo";
import { Status } from "../components/Status";
import { TypingArea } from "../components/TypingArea";

import { ReactComponent as List } from "../assets/svg/menu-burger.svg";
import { ReactComponent as Left } from "../assets/svg/angle-left.svg";
import { ReactComponent as Right } from "../assets/svg/angle-right.svg";
import { ReactComponent as Reload } from "../assets/svg/rotate-right.svg";

import { ReactComponent as Setting } from "../assets/svg/settings.svg";

const MainHeader = styled.header`
    font-size: 24px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

const MainBody = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 50px 30px 0 40px;
`;

const MainPage = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const MenuBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: top;
`;

const MenuIcons = styled.div`
    margin-right: 10px;
    width: 120px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const MenuIcon = styled.span`
    cursor: pointer;
    width: 20px;
`;

const RightMenu = styled.section`
    background-color: whitesmoke;
    box-shadow: 10px 0px 10px 5px;
    border: none;
    width: 600px;
    height: 100vh;
`;

const Burger = styled(Setting)`
    width: 30px;
    height: 30px;
    fill: gray;
    position: absolute;
    bottom: 42px;
    right: 40px;
    cursor: pointer;
    z-index: 10;
`;

const MainLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-right: 40px;
`;

const LogoStyle = styled(Logo)`
    margin-top: 35px;
    margin-right: 10px;
`;

export function Main() {
    const [totalTime, setTotalTime] = useState(null);
    const [cpm, setCpm] = useState(0);
    const [acc, setAcc] = useState(0);
    const [err, setErr] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [resultOpen, setResultOpen] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [reload, setReload] = useState(false);

    const [result, setResult] = useState([]);

    function handleReload() {
        setReloadKey((prevKey) => prevKey + 1);
        setCpm(0);
        setAcc(0);
        setErr(0);
        setTotalTime(null);
        setReload(true);
    }

    function handleCloseResult() {
        setResultOpen(false);
        setResult([]);
    }
    useEffect(() => {
        if (resultOpen) {
            setResult([...result, cpm, acc, err, totalTime]);
        }
    }, [resultOpen]);

    useEffect(() => {
        if (reload) {
            handleReload();
        }
    }, [reload]);

    return (
        <MainPage>
            <div onClick={() => setMenuOpen(false)} style={{ width: "100%" }}>
                <MainLogo>
                    <LogoStyle width="30px" height="30px" />
                    <MainHeader>Typist</MainHeader>
                </MainLogo>
                <section>
                    <MainBody>
                        <MenuBar>
                            <Status
                                cpm={cpm}
                                acc={acc}
                                err={err}
                                totalTime={totalTime}
                            />
                            <MenuIcons>
                                <MenuIcon onClick={handleReload}>
                                    <Reload
                                        aria-label="다시하기"
                                        width="15px"
                                        height="20px"
                                        fill="gray"
                                    />
                                </MenuIcon>
                                <MenuIcon>
                                    <Left
                                        aria-label="이전 글"
                                        width="15px"
                                        height="20px"
                                        fill="gray"
                                    />
                                </MenuIcon>
                                <MenuIcon>
                                    <Right
                                        aria-label="다음 글"
                                        width="15px"
                                        height="20px"
                                        fill="gray"
                                    />
                                </MenuIcon>
                                <MenuIcon>
                                    <List
                                        aria-label="글 목록"
                                        width="20px"
                                        height="20px"
                                        fill="gray"
                                    />
                                </MenuIcon>
                            </MenuIcons>
                        </MenuBar>
                        <TypingArea
                            key={reloadKey}
                            setAcc={setAcc}
                            setErr={setErr}
                            setCpm={setCpm}
                            totalTime={totalTime}
                            setTotalTime={setTotalTime}
                            reload={reload}
                            setReload={setReload}
                            setResultOpen={setResultOpen}
                            setResult={setResult}
                        />
                    </MainBody>
                </section>
                <footer>
                    <TextInfo
                        title="나의 일기"
                        link="https://github.com/seokkkkkk"
                        author="정윤석"
                        uploader="yundol"
                    />
                </footer>
            </div>
            {!menuOpen && <Burger onClick={() => setMenuOpen(true)} />}
            {menuOpen && (
                <RightMenu>
                    <div>이름</div>
                    <div>정보수정</div>
                    <div>알림</div>
                    <div>로그아웃</div>
                    <div>평균타수</div>
                    <div>최근 기록</div>
                    <div></div>
                    <div></div>
                </RightMenu>
            )}
            {resultOpen && (
                <ResultModal onClick={() => handleCloseResult()}>
                    <ResultBody>
                        <div>x</div>
                        <div>정윤석</div>
                        <div>자소: {result[0]}</div>
                        <div>음절: {result[1]}</div>
                        <div>CPM: {result[2]}</div>
                        <div>ACC: {result[3]}%</div>
                        <div>TIME: {result[4]}초</div>
                        <div>제목</div>
                        <div>저자</div>
                        <div>업로더</div>
                        <div>날짜</div>
                    </ResultBody>
                </ResultModal>
            )}
        </MainPage>
    );
}

const ResultModal = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const ResultBody = styled.div`
    position: absolute;
    width: 450px;
    height: 600px;
    background-color: white;
    top: 50%; /* 상위 컨테이너 기준으로 50% 위치에 요소의 상단이 오도록 설정 */
    left: 50%; /* 상위 컨테이너 기준으로 50% 위치에 요소의 왼쪽이 오도록 설정 */
    transform: translate(
        -50%,
        -50%
    ); /* 요소의 크기에 따라 상단과 왼쪽으로 50%씩 이동하여 중앙에 정확히 위치시킴 */
`;
