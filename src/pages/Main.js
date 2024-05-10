import { useEffect, useMemo, useRef, useState } from "react";
import { TextInfo } from "../components/TextInfo";
import { TypingArea } from "../components/TypingArea";
import { ResultModal } from "../components/ResultModal";
import { RightMenu } from "../components/RightMenu";
import { MainMenuBar } from "../components/MainMenuBar";
import { MainBottomMenu } from "../components/MainBottomMenu";
import { getCookie, setCookie } from "../utils/TypistCookie";
import { EndOfText } from "../components/EndAlert";
import {
    Footer,
    Logo,
    MainBody,
    MainHeader,
    MainLogo,
    MainPage,
    RemainingArea,
} from "./Main.styled";
import { LoginModal } from "../components/LoginModal";
import { EmailVerificationModal } from "../components/EmailVerificationModal";
import { NicknameModal } from "../components/NicknameModal.js";
import AdviceAPI from "../api/AdviceAPI.js";
import { Loading } from "../components/Loading.js";
import { useDetect } from "../hook/useDetect.js";
export function Main() {
    const [isLike, setIsLike] = useState(false);
    const [totalTime, setTotalTime] = useState(null);
    const [cpm, setCpm] = useState(0);
    const [acc, setAcc] = useState(0);
    const [err, setErr] = useState(0);
    const [rightMenuOpen, setRightMenuOpen] = useState(false);
    const [bottomMenuOpen, setBottomMenuOpen] = useState(false);
    const [resultReady, setResultReady] = useState(false);
    const [resultModal, setResultModal] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [canType, setCanType] = useState(true);
    const [data, setData] = useState([
        { time: "00:00", cpm: 0, acc: 100, err: 0 },
    ]);
    const [resultData, setResultData] = useState([]);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [userData, setUserData] = useState({
        name: "yundol",
    });
    const inputFocus = useRef();
    const resultRef = useRef();
    //제스처 디텍터(사운드 플레이 위함)
    useDetect();
    async function getTexts(retryCount = 0) {
        if (retryCount >= 5) {
            console.error(
                "Maximum retry limit reached. Unable to fetch unique advice."
            );
            return;
        }
        try {
            const response = await AdviceAPI().fetchAdvice();
            if (response && response.length > 1) {
                var text = {
                    id: response[0],
                    title: `Advice #${response[0]}`,
                    text: response[1],
                    author: "Advice Slip",
                    uploader: "Advice Slip",
                };
                if (!texts.some((t) => t.id === text.id)) {
                    const newTexts = [...texts, text];
                    if (newTexts.length > 5) {
                        newTexts.shift();
                        setCurrentTextIndex((prevIndex) => prevIndex - 1);
                    }
                    setTexts(newTexts);
                } else {
                    getTexts(retryCount + 1); // Recursive call with incremented retry count
                }
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Failed to fetch advice:", error);
        }
    }

    // 첫 실행시 기본으로 5개의 텍스트를 가져옴(중복 제외)
    useEffect(() => {
        const loadInitialTexts = async () => {
            setIsLoading(true); // Start loading
            await getTexts(); // Wait for the first fetch to complete
            setIsLoading(false); // End loading after the second fetch completes
            setTimeout(async () => {
                await getTexts(); // After 2 seconds, fetch again
            }, 2000);
        };

        loadInitialTexts();
    }, []);

    async function handleNewText() {
        getTexts();
    }

    useEffect(() => {
        if (texts.length > 0) {
            setCurrentText(texts[currentTextIndex]);
        }
    }, [currentTextIndex, texts]);

    useEffect(() => {
        if (resultReady) {
            setCanType(false);
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
            setResultData(data);
            handleReload();
            setResultReady(false);
        }
    }, [resultReady, cpm, acc, err, totalTime, result, data, currentText]);

    useEffect(() => {
        if (!resultReady && result.length === 9) {
            setResultModal(true);
            handleNewText();
        }
    }, [resultReady, result]);

    useEffect(() => {
        if (currentText && currentText.id) {
            let likeIds = getCookie("likeIds") || [];
            setIsLike(likeIds.includes(currentText.id));
        }
    }, [currentText, currentTextIndex]);

    function handleReload() {
        setIsLoading(true);
        setOpenAlert(false);
        setTimeout(() => setIsLoading(false), 500);
        setReloadKey((prevKey) => prevKey + 1);
        setCpm(0);
        setAcc(0);
        setErr(0);
        setData([{ time: "00:00", cpm: 0, acc: 100, err: 0 }]);
        setTotalTime(null);
        setReload(true);
        inputFocus.current.focus();
    }

    function handleCloseResult() {
        setResultModal(false);
        setCanType(true);
        setResult([]);
        setData([{ time: "00:00", cpm: 0, acc: 100, err: 0 }]);
        if (texts.length > currentTextIndex + 1)
            setCurrentTextIndex(currentTextIndex + 1);
        else setOpenAlert(true);
        inputFocus.current.focus();
    }

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

    function handleRightMenuOpen() {
        setRightMenuOpen(!rightMenuOpen);
    }

    function handleBottomMenuOpen() {
        setBottomMenuOpen(!bottomMenuOpen);
    }

    function handleMenuClose() {
        if (rightMenuOpen) setRightMenuOpen(false);
        if (bottomMenuOpen) setBottomMenuOpen(false);
    }

    function handleLike() {
        let likeIds = getCookie("likeIds");
        if (likeIds && currentText.id) {
            if (!isLike) {
                let newLikeIds = [...likeIds, currentText.id];
                setCookie("likeIds", newLikeIds);
            } else {
                let filteredLikeIds = likeIds.filter(
                    (id) => id !== currentText.id
                );
                setCookie("likeIds", filteredLikeIds);
            }
        } else {
            setCookie("likeIds", [currentText.id]);
        }
        setIsLike(!isLike);
    }

    return (
        <MainPage>
            {isLoading && <Loading />}
            <MainLogo>
                <Logo />
                <MainHeader>Typist</MainHeader>
            </MainLogo>
            <MainBody>
                {texts && (
                    <MainMenuBar
                        acc={acc}
                        cpm={cpm}
                        currentTextIndex={currentTextIndex}
                        err={err}
                        handleCurrentText={handleCurrentText}
                        handleReload={handleReload}
                        handleMenuOpen={handleRightMenuOpen}
                        isLoading={isLoading}
                        texts={texts}
                        totalTime={totalTime}
                        isLike={isLike}
                        handleLike={handleLike}
                        handleNewText={handleNewText}
                        handleBottomMenuOpen={handleBottomMenuOpen}
                    />
                )}
                {!isLoading && currentText && (
                    <TypingArea
                        canType={canType}
                        setCanType={setCanType}
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
                        inputFocus={inputFocus}
                    />
                )}
            </MainBody>
            {(bottomMenuOpen || rightMenuOpen) && (
                <RemainingArea onClick={() => handleMenuClose()} />
            )}
            <Footer>
                {!isLoading && currentText && (
                    <TextInfo
                        title={currentText.title}
                        link={currentText.link}
                        author={currentText.author}
                        uploader={currentText.uploader}
                    />
                )}
            </Footer>
            <RightMenu
                userData={userData}
                isVisible={rightMenuOpen}
                setLoginModalOpen={setLoginModalOpen}
                handleMenuClose={handleMenuClose}
            />
            {resultModal && (
                <ResultModal
                    resultRef={resultRef}
                    userData={userData}
                    data={resultData}
                    result={result}
                    handleLike={handleLike}
                    isLike={isLike}
                    handleCloseResult={handleCloseResult}
                    textInfo={currentText}
                />
            )}
            {
                <MainBottomMenu
                    texts={texts}
                    onSelectText={handleTextSelect}
                    currentTextIndex={currentTextIndex}
                    isVisible={bottomMenuOpen}
                    handleNewText={handleNewText}
                    handleMenuClose={handleMenuClose}
                />
            }
            {openAlert && <EndOfText setOpenAlert={setOpenAlert} />}
            {loginModalOpen && (
                <LoginModal setLoginModalOpen={setLoginModalOpen} />
            )}
            {/* <EmailVerificationModal /> */}
            {/* <NicknameModal /> */}
        </MainPage>
    );
}
