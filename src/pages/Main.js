import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TextInfo } from "../components/TextInfo";
import { TypingArea } from "../components/TypingArea";
import { ResultModal } from "../components/ResultModal";
import { RightMenu } from "../components/RightMenu";
import { MainMenuBar } from "../components/MainMenuBar";

import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as Setting } from "../assets/svg/settings.svg";
import { MainBottomMenu } from "../components/MainBottomMenu";
import { getCookie, setCookie } from "../utils/TypistCookie";
import { EndOfText } from "../components/EndAlert";

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

const SettingIcon = styled(Setting)`
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

const PageContainer = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
`;

export function Main() {
    const [isLike, setIsLike] = useState(false);
    const [totalTime, setTotalTime] = useState(null);
    const [cpm, setCpm] = useState(0);
    const [acc, setAcc] = useState(0);
    const [err, setErr] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [bottomMenuOpen, setBottomMenuOpen] = useState(false);
    const [resultReady, setResultReady] = useState(false);
    const [resultModal, setResultModal] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const inputRef = useRef(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [data, setData] = useState([
        { time: "00:00", cpm: 0, acc: 100, err: 0 },
    ]);
    const [texts, setTexts] = useState([
        {
            title: "나의 일기",
            author: "정윤석",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 좋다.",
            id: 1,
        },
        {
            title: "나의 일기",
            author: "정지원",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 춥다.",
            id: 2,
        },
        {
            title: "나의 일기",
            author: "정희경",
            uploader: "yundol",
            link: "https://github.com/seokkkkkk",
            text: "오늘은 날씨가 덥다.",
            id: 3,
        },
    ]);
    const [currentText, setCurrentText] = useState(texts[0]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        setCurrentText(texts[currentTextIndex]);
    }, [currentTextIndex, texts]);

    function handleReload() {
        setIsLoading(true);
        setOpenAlert(false);
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
        if (texts.length > currentTextIndex + 1)
            setCurrentTextIndex(currentTextIndex + 1);
        else setOpenAlert(true);
    }

    useEffect(() => {
        if (resultReady) {
            setResult((prevResult) => [
                ...prevResult,
                cpm,
                acc,
                err,
                totalTime,
                currentText.id,
                currentText.title,
                currentText.author,
            ]);
            handleReload();
            setResultReady(false);
        }
    }, [resultReady, cpm, acc, err, totalTime, result, data, currentText]);

    useEffect(() => {
        if (!resultReady && result.length > 5) {
            setResultModal(true);
        }
    }, [resultReady, result]);

    useEffect(() => {
        let likeIds = getCookie("likeIds") || [];
        setIsLike(likeIds.includes(currentText.id));
    }, [currentText.id]);

    function handleCurrentText({ indexDiff }) {
        if (typeof indexDiff !== "number") {
            console.error("indexDiff is not a number:", indexDiff);
            return;
        }

        setCurrentTextIndex((prevIndex) => {
            const newIndex = prevIndex + indexDiff;

            if (newIndex >= 0 && newIndex < texts.length) {
                handleReload();
                return newIndex;
            }
            return prevIndex;
        });
    }

    function handleTextSelect(index) {
        setCurrentTextIndex(index);
        setBottomMenuOpen(false);
    }

    function handleBottomMenuOpen() {
        setBottomMenuOpen(!bottomMenuOpen);
    }

    function handleLike() {
        let likeIds = getCookie("likeIds");
        try {
            likeIds = JSON.parse(likeIds);
        } catch (error) {
            likeIds = [];
        }

        if (!Array.isArray(likeIds)) {
            likeIds = [];
        }

        if (!isLike) {
            let newLikeIds = [...likeIds, currentText.id];
            setCookie("likeIds", JSON.stringify(newLikeIds));
        } else {
            let filteredLikeIds = likeIds.filter((id) => id !== currentText.id);
            setCookie("likeIds", JSON.stringify(filteredLikeIds));
        }
        setIsLike(!isLike);
    }
    return (
        <MainPage>
            <div
                onClick={() => {
                    setMenuOpen(false);
                    if (bottomMenuOpen) setBottomMenuOpen(false);
                }}
                style={{ width: "100%" }}
            >
                <MainLogo>
                    <LogoStyle width="30px" height="30px" />
                    <MainHeader>Typist</MainHeader>
                </MainLogo>
                <section>
                    <MainBody>
                        <MainMenuBar
                            acc={acc}
                            cpm={cpm}
                            currentTextIndex={currentTextIndex}
                            err={err}
                            handleCurrentText={handleCurrentText}
                            handleReload={handleReload}
                            handleBottomMenuOpen={handleBottomMenuOpen}
                            isLoading={isLoading}
                            texts={texts}
                            totalTime={totalTime}
                            isLike={isLike}
                            handleLike={handleLike}
                        />
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
                                text={currentText.text}
                                inputRef={inputRef}
                            />
                        )}
                    </MainBody>
                </section>
                <footer>
                    {!isLoading && (
                        <TextInfo
                            title={currentText.title}
                            link={currentText.link}
                            author={currentText.author}
                            uploader={currentText.uploader}
                        />
                    )}
                </footer>
            </div>
            {!menuOpen && <SettingIcon onClick={() => setMenuOpen(true)} />}
            {menuOpen && <RightMenu />}
            {resultModal && (
                <ResultModal
                    data={data}
                    result={result}
                    setIsLike={setIsLike}
                    isLike={isLike}
                    handleCloseResult={handleCloseResult}
                    id={currentText.id}
                />
            )}
            {
                <>
                    {bottomMenuOpen && (
                        <PageContainer
                            onClick={() => setBottomMenuOpen(false)}
                        />
                    )}
                    <MainBottomMenu
                        texts={texts}
                        onSelectText={handleTextSelect}
                        currentTextIndex={currentTextIndex}
                        isVisible={bottomMenuOpen}
                    />
                </>
            }
            {openAlert && <EndOfText setOpenAlert={setOpenAlert} />}
        </MainPage>
    );
}
