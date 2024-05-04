import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/svg/logo.svg";

import { TextInfo } from "../components/TextInfo";
import { Status } from "../components/Status";
import { TypingArea } from "../components/TypingArea";

import { ReactComponent as MenuBurger } from "../assets/svg/menu-burger.svg";

import { ReactComponent as Left } from "../assets/svg/angle-left.svg";
import { ReactComponent as Right } from "../assets/svg/angle-right.svg";
import { ReactComponent as Select } from "../assets/svg/list.svg";
import { ReactComponent as Reload } from "../assets/svg/rotate-right.svg";

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

const Burger = styled(MenuBurger)`
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
    const [reloadKey, setReloadKey] = useState(0);
    const [reload, setReload] = useState(false);

    function handleReload() {
        setReloadKey((prevKey) => prevKey + 1);
        setCpm(0);
        setAcc(0);
        setErr(0);
        setTotalTime(null);
        setReload(true);
    }

    return (
        <MainPage>
            <div onClick={() => setMenuOpen(false)}>
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
                                    <Select
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
        </MainPage>
    );
}
