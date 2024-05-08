import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Hangul from "hangul-js";
import CustomCaretInput from "./CustomCaretInput";
import { mildShake } from "../utils/animation";

const TypingWords = styled.div`
    top: 1px;
    position: relative;
    height: 1px;
    overflow: nowrap;
`;

const InputChar = styled.input`
    background-color: transparent;
    caret-color: transparent;
    border: none;
    outline: none;
    padding: 0px;
    margin: 0px;
    font-size: 20px;
    min-width: 6px;
    display: inline-block;
    width: 20px;
    margin-bottom: 8px;
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
    color: black;
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

    if (input === "Backspace") {
        return "Backspace";
    } else if (input === " ") {
        return "Space";
    } else if (input === "Shift") {
        return "Shift";
    } else if (hangulRegex.test(input)) {
        return "Hangul";
    } else if (englishRegex.test(input)) {
        if (input.length > 1) {
            return "Trash";
        }
        return "English";
    } else if (specialRegex.test(input)) {
        return "Special Characters";
    } else {
        return "Unknown";
    }
}

function InputRenewal({
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
    const [isWrong, setIsWrong] = useState(false);

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
            setResultOpen(true);
        }
    }, [letters, origin, setResultOpen, setReload, setResult, inputCount]);

    useEffect(() => {
        if (letters.length === origin.length) {
            setResult([inputCount, letters.length]);
            clearInterval(timerRef.current);
            setResultOpen(true);
        }
    }, [letters, origin, setResultOpen, setReload, setResult, inputCount]);

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

    function handleKeyDown(e) {
        if (!isTypingStarted) {
            setIsTypingStarted(true); // 타이핑 시작 감지
        }
        switch (checkCharacterType(e.key)) {
            case "Backspace":
                if (letters.length > 0 || typingPart !== "") {
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
                    setInputCount(inputCount + 1);
                    if (typingPart !== "") {
                        handleLetterAdd();
                    }
                    setCorrect(correct + 1);
                    setIndex(index + 1);
                    setLetters([...letters, " "]);
                } else {
                    setIsInvalid(true);
                }
                break;
            case "Shift":
                break;
            case "Hangul":
                if (checkCharacterType(origin[index]) !== "Hangul") {
                    setIsInvalid(true);
                    break;
                }
                if (typingPart === "") {
                    setIsInput(true);
                    setTypingPart(e.key);
                    setInputCount(inputCount + 1);
                } else {
                    var newHangul = Hangul.assemble(typingPart + e.key);
                    if (newHangul.length > 1) {
                        setIsWrong(true);
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
                            setCorrect(correct + 1);
                        } else {
                            setIsInput(true);
                            setTypingPart(newHangul);
                            setInputCount(inputCount + 1);
                        }
                    }
                }
                break;
            case "Special Characters":
            case "English":
                if (origin[index] === " ") {
                    setIsInvalid(true);
                    break;
                }
                if (typingPart === "") {
                    if (checkCharacterType(origin[index]) === "Hangul") {
                        setIsInvalid(true);
                        break;
                    }
                    setLetters([...letters, e.key]);
                    setInputCount(inputCount + 1);
                    if (e.key === origin[index]) {
                        setCorrect(correct + 1);
                    } else {
                        setIsWrong(true);
                    }
                    setIndex(index + 1);
                } else if (checkCharacterType(origin[index] === "Hangul")) {
                    setIsWrong(true);
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
                        setCorrect(correct + 1);
                    } else {
                        setIsWrong(true);
                    }
                }
                break;
            default:
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
