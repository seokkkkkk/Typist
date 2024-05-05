import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { ReactComponent as Logo } from "../assets/svg/logo.svg";

import { TextInfo } from "../components/TextInfo";
import { Status } from "../components/Status";
import { TypingArea } from "../components/TypingArea";

import { ReactComponent as List } from "../assets/svg/menu-burger.svg";
import { ReactComponent as Left } from "../assets/svg/angle-left.svg";
import { ReactComponent as Right } from "../assets/svg/angle-right.svg";
import { ReactComponent as Reload } from "../assets/svg/rotate-right.svg";
import { ReactComponent as Setting } from "../assets/svg/settings.svg";
import { ResultModal } from "../components/ResultModal";
import { RightMenu } from "../components/RightMenu";
import { rotateAnimation } from "../utils/animation";

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

const ConditionalRotatingReload = styled(Reload)`
    animation: ${(props) =>
        props.$isLoading
            ? css`
                  ${rotateAnimation} 0.5s linear
              `
            : "none"};
`;

export function Main() {
    const [totalTime, setTotalTime] = useState(null);
    const [cpm, setCpm] = useState(0);
    const [acc, setAcc] = useState(0);
    const [err, setErr] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [resultReady, setResultReady] = useState(false);
    const [resultModal, setResultModal] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [result, setResult] = useState([]);
    const [data, setData] = useState([
        { time: "00:00", cpm: 0, acc: 100, err: 0 },
    ]);

    function handleReload() {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500);
        setReloadKey((prevKey) => prevKey + 1);
        setCpm(0);
        setAcc(0);
        setErr(0);
        setTotalTime(null);
        setReload(true);
    }

    function handleCloseResult() {
        setResultModal(false);
        setResult([]);
        setData([{ time: "00:00", cpm: 0, acc: 100, err: 0 }]);
    }

    useEffect(() => {
        if (resultReady) {
            setResult((prevResult) => [
                ...prevResult,
                cpm,
                acc,
                err,
                totalTime,
            ]);
            handleReload();
            setResultReady(false);
        }
    }, [resultReady, cpm, acc, err, totalTime, result, data]);

    useEffect(() => {
        if (!resultReady && result.length > 5) {
            setResultModal(true);
        }
    }, [resultReady, result]);

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
                                    <ConditionalRotatingReload
                                        aria-label="다시하기"
                                        width="15px"
                                        height="20px"
                                        fill="gray"
                                        $isLoading={isLoading}
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
                        {!isLoading && (
                            <TypingArea
                                key={reloadKey}
                                setAcc={setAcc}
                                setErr={setErr}
                                setCpm={setCpm}
                                totalTime={totalTime}
                                setTotalTime={setTotalTime}
                                reload={reload}
                                setReload={setReload}
                                setResultOpen={setResultReady}
                                setResult={setResult}
                                setData={setData}
                            />
                        )}
                    </MainBody>
                </section>
                <footer>
                    {!isLoading && (
                        <TextInfo
                            title="나의 일기"
                            link="https://github.com/seokkkkkk"
                            author="정윤석"
                            uploader="yundol"
                        />
                    )}
                </footer>
            </div>
            {!menuOpen && <Burger onClick={() => setMenuOpen(true)} />}
            {menuOpen && <RightMenu />}
            {resultModal && (
                <ResultModal
                    data={data}
                    result={result}
                    setIsLike={setIsLike}
                    isLike={isLike}
                    handleCloseResult={handleCloseResult}
                />
            )}
        </MainPage>
    );
}
