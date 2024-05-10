import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Hangul from "hangul-js";
import CustomCaretInput from "./CustomCaretInput";
import { mildShake } from "../utils/animation";

import defaultSound1 from "../assets/sounds/default1.mp3";
import defaultSound2 from "../assets/sounds/default2.mp3";
import defaultSound3 from "../assets/sounds/default3.mp3";
import invalidSound from "../assets/sounds/invalid.mp3";
import spaceSound from "../assets/sounds/space.mp3";
import deleteSound from "../assets/sounds/delete.mp3";
import SoundPlayer from "../utils/SoundPlayer";
import errorSound from "../assets/sounds/error.mp3";

const TypingWords = styled.div`
    top: 1px;
    position: relative;
    height: 1px;
    overflow: nowrap;
`;

const Char = styled.span`
    font-size: 20px;
    min-width: 6px;
    color: gray;
    display: inline-block;
    background-color: transparent;
    margin-bottom: 8px;
`;

const CorrectChar = styled(Char)`
    color: #2f2f2f;
`;
const IncorrectChar = styled(Char)`
    color: red;
    text-decoration: underline;
    animation: ${mildShake} 0.5s ease-in-out;
`;

function checkCharacterType(input) {
    const hangulRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    const englishRegex = /^[a-zA-Z\s]*$/;
    const specialRegex = /[^\w\s]/;
    const numberRegex = /[0-9]/;

    if (input === "Backspace") {
        return "Backspace";
    } else if (input === " ") {
        return "Space";
    } else if (input === "Shift") {
        return "Shift";
    } else if (input.length !== 1) {
        return "Unknown";
    } else if (hangulRegex.test(input)) {
        return "Hangul";
    } else if (englishRegex.test(input)) {
        return "English";
    } else if (numberRegex.test(input)) {
        return "Number";
    } else if (specialRegex.test(input)) {
        return "Special Characters";
    } else {
        return "Unknown";
    }
}

function InputRenewal({
    canType,
    setCanType,
    text,
    index,
    setIndex,
    setIsInput,
    inputRef,
    setCpm,
    setAcc,
    setErr,
    totalTime,
    setTotalTime,
    reload,
    setReload,
    setResultOpen,
    setResult,
    setData,
}) {
    const [typingPart, setTypingPart] = useState("");
    const [letters, setLetters] = useState([]);
    const [correct, setCorrect] = useState(0);
    const [inputCount, setInputCount] = useState(0);
    const [isTypingStarted, setIsTypingStarted] = useState(false);

    const origin = text.split("");
    const timerRef = useRef(null);

    const [isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        if (isTypingStarted) {
            // 타이머 시작
            timerRef.current = setInterval(() => {
                setTotalTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current); // 타이머 정리
            }
        };
    }, [isTypingStarted, setTotalTime]);

    useEffect(() => {
        if (reload) {
            clearInterval(timerRef.current);
        }
    }, [reload, setReload]);

    useEffect(() => {
        if (letters.length === origin.length) {
            setResult([inputCount, letters.length]);
            clearInterval(timerRef.current);
            setCanType(false);
            setResultOpen(true);
        }
    }, [
        letters,
        origin,
        setResultOpen,
        setReload,
        setResult,
        inputCount,
        setCanType,
    ]);

    useEffect(() => {
        if (letters.length === origin.length) {
            setResult([inputCount, letters.length]);
            clearInterval(timerRef.current);
            setCanType(false);
            setResultOpen(true);
        }
    }, [
        letters,
        origin,
        setResultOpen,
        setReload,
        setResult,
        inputCount,
        setCanType,
    ]);

    useEffect(() => {
        if (typingPart.length > 0) {
            setIsInput(true);
        } else {
            setIsInput(false);
        }
    }, [typingPart, setIsInput]);

    useEffect(() => {
        if (letters.length > 0 && totalTime > 0) {
            const timeInSeconds = totalTime;
            const cpm = Math.round((inputCount / timeInSeconds) * 60);
            const acc = Math.round((correct / letters.length) * 100);
            const err = Math.round(
                ((letters.length - correct) / letters.length) * 100
            );
            setCpm(cpm);
            setAcc(acc);
            setErr(err);
            setData((currentData) => {
                const currentTime = `${Math.floor(totalTime / 60)
                    .toString()
                    .padStart(2, "0")}:${(totalTime % 60)
                    .toString()
                    .padStart(2, "0")}`;
                const lastEntry = currentData[currentData.length - 1];

                if (lastEntry && lastEntry.time === currentTime) {
                    return [
                        ...currentData.slice(0, -1),
                        { ...lastEntry, cpm, acc, err },
                    ];
                } else {
                    return [
                        ...currentData,
                        { time: currentTime, cpm, acc, err },
                    ];
                }
            });
        }
    }, [
        totalTime,
        inputCount,
        correct,
        letters.length,
        setAcc,
        setCpm,
        setErr,
        setData,
    ]);

    function handleLetterAdd(e) {
        setLetters([...letters, typingPart]);
        setIndex(index + 1);
        setTypingPart("");
        setIsInput(false);
    }

    function printDebug() {
        console.log("letters: ", letters);
        console.log("typingPart: ", typingPart);
        console.log("inputCount: ", inputCount);
        console.log("index: ", index);
        console.log("correct: ", correct);
    }

    const defaultEffect = new SoundPlayer(
        [defaultSound1, defaultSound2, defaultSound3],
        3
    );
    const errorEffect = new SoundPlayer([errorSound], 5);
    const spaceEffect = new SoundPlayer([spaceSound], 1.5);
    const deleteEffect = new SoundPlayer([deleteSound], 1.5);
    const invalidEffect = new SoundPlayer([invalidSound], 0.3);

    function handleInvalid() {
        setIsInvalid(true);
        invalidEffect.play();
    }

    function handleCorrect() {
        setCorrect(correct + 1);
        defaultEffect.play();
    }

    function handleKeyDown(e) {
        if (!canType) {
            return;
        }
        if (!isTypingStarted) {
            setIsTypingStarted(true); // 타이핑 시작 감지
        }
        switch (checkCharacterType(e.key)) {
            case "Backspace":
                if (letters.length > 0 || typingPart !== "") {
                    deleteEffect.play();
                    if (typingPart === "") {
                        setLetters(letters.slice(0, -1));
                        setIndex(index - 1);
                        if (letters[index - 1] === origin[index - 1]) {
                            setCorrect(correct - 1);
                        }
                        setInputCount(
                            inputCount -
                                Hangul.disassemble(letters[index - 1]).length
                        );
                    } else {
                        setInputCount(inputCount - 1);
                        setTypingPart(
                            Hangul.assemble(
                                Hangul.disassemble(typingPart).slice(0, -1)
                            )
                        );
                        setIsInput(true);
                    }
                }
                break;
            case "Space":
                if (origin[index] === " ") {
                    spaceEffect.play();
                    setInputCount(inputCount + 1);
                    if (typingPart !== "") {
                        handleLetterAdd();
                    }
                    handleCorrect();
                    setIndex(index + 1);
                    setLetters([...letters, " "]);
                } else {
                    handleInvalid();
                }
                break;
            case "Shift":
                break;
            case "Hangul":
                if (checkCharacterType(origin[index]) !== "Hangul") {
                    handleInvalid();
                    break;
                }
                if (typingPart === "") {
                    if (e.key === origin[index]) {
                        handleCorrect();
                        setIndex(index + 1);
                        setInputCount(inputCount + 1);
                        setIsInput(false);
                        setLetters([...letters, e.key]);
                    } else {
                        if (Hangul.disassemble(origin[index])[0] !== e.key) {
                            errorEffect.play();
                            setIsInput(false);
                            setLetters([...letters, e.key]);
                            setIndex(index + 1);
                            setInputCount(inputCount + 1);
                        } else {
                            defaultEffect.play();
                            setIsInput(true);
                            setTypingPart(e.key);
                            setInputCount(inputCount + 1);
                        }
                    }
                } else {
                    var newHangul = Hangul.assemble(typingPart + e.key);
                    if (newHangul.length > 1) {
                        errorEffect.play();
                        setLetters([...letters, typingPart]);
                        setInputCount(inputCount + 1);
                        if (origin[index + 1] === " ") {
                            setIndex(index + 1);
                            setTypingPart("");
                            break;
                        } else {
                            setIsInput(true);
                            setIndex(index + 1);
                            setTypingPart(e.key);
                        }
                    } else {
                        if (newHangul === origin[index]) {
                            setLetters([...letters, newHangul]);
                            setTypingPart("");
                            setIsInput(false);
                            setInputCount(inputCount + 1);
                            setIndex(index + 1);
                            handleCorrect();
                        } else {
                            defaultEffect.play();
                            setIsInput(true);
                            setTypingPart(newHangul);
                            setInputCount(inputCount + 1);
                        }
                    }
                }
                break;
            case "Number":
            case "Special Characters":
            case "English":
                if (origin[index] === " ") {
                    handleInvalid();
                    break;
                }
                if (typingPart === "") {
                    if (
                        checkCharacterType(origin[index]) !==
                        checkCharacterType(e.key)
                    ) {
                        handleInvalid();
                        break;
                    }
                    setLetters([...letters, e.key]);
                    setInputCount(inputCount + 1);
                    if (e.key === origin[index]) {
                        handleCorrect();
                    } else {
                        errorEffect.play();
                    }
                    setIndex(index + 1);
                } else if (checkCharacterType(origin[index] === "Hangul")) {
                    errorEffect.play();
                    setLetters([...letters, typingPart]);
                    setTypingPart("");
                    setIsInput(false);
                    setIndex(index + 1);
                } else {
                    setLetters([...letters, typingPart, e.key]);
                    setTypingPart("");
                    setIsInput(false);
                    setIndex(index + 2);
                    setInputCount(inputCount + 1);
                    if (e.key === origin[index - 1]) {
                        handleCorrect();
                    } else {
                        errorEffect.play();
                    }
                }
                break;
            default:
                errorEffect.play();
                break;
        }
    }

    return (
        <TypingWords>
            {letters.map((letter, i) =>
                letter === origin[i] ? (
                    <CorrectChar key={i}>{letter}</CorrectChar>
                ) : (
                    <IncorrectChar key={i}>{letter}</IncorrectChar>
                )
            )}
            <CustomCaretInput
                ref={inputRef}
                onKeyDown={handleKeyDown}
                value={typingPart}
                setIsInvalid={setIsInvalid}
                isInvalid={isInvalid}
            />
        </TypingWords>
    );
}
export { InputRenewal };
