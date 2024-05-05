import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { shakeAnimation } from "../utils/animation";

const TypingWords = styled.div`
    position: absolute;
    top: 178.5px;
    margin-right: 30px;
`;

const InputChar = styled.input`
    background-color: transparent;
    caret-color: gray;
    border: none;
    outline: none;
    padding: 0px;
    font-size: 20px;
    width: 17px;
    display: inline-block;
    animation: ${(props) =>
        props.isError
            ? css`
                  ${shakeAnimation} 0.5s ease
              `
            : "none"};
`;
const Char = styled.span`
    font-size: 20px;
    width: 17px;
    color: gray;
    display: inline-block;
    background-color: transparent;
`;

const CorrectChar = styled(Char)`
    color: black;
`;
const IncorrectChar = styled(Char)`
    color: red;
    text-decoration: underline;
`;

function InputText({
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
    const [input, setInput] = useState("");
    const [letters, setLetters] = useState([]);
    const [correct, setCorrect] = useState(0);

    const [totalCh, setTotalCh] = useState(0);
    const [currentCh, setCurrentCh] = useState(0);
    const [letterCount, setLetterCount] = useState([]);

    const [isTypingStarted, setIsTypingStarted] = useState(false);
    const timerRef = useRef(null);

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
        if (letters.length > 0 && totalTime > 0) {
            const timeInSeconds = totalTime;
            const cpm = Math.round((totalCh / timeInSeconds) * 60);
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
        totalCh,
        correct,
        letters.length,
        setAcc,
        setCpm,
        setErr,
        setData,
    ]);

    const [isError, setIsError] = useState(false);

    const origin = text.split("");

    useEffect(() => {
        if (reload) {
            clearInterval(timerRef.current);
            setReload(false);
        }
    }, [reload, setReload]);

    useEffect(() => {
        if (letters.length === origin.length) {
            setResult([letters.length, totalCh]);
            clearInterval(timerRef.current);
            setResultOpen(true);
            setReload(true);
        }
    }, [letters, origin, setResultOpen, setReload, setResult, totalCh]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
        handleInput(inputValue);

        if (!isTypingStarted) {
            setIsTypingStarted(true); // 타이핑 시작 감지
        }
    };

    const handleKeyDown = (e) => {
        if (e.nativeEvent.keyCode === 8 && letters.length > 0 && input === "") {
            setLetters(letters.slice(0, -1));
            setIndex(index - 1);
            if (letters[index - 1] === origin[index - 1]) {
                setCorrect(correct - 1);
            }
            deleteCharacterCount();
        } else if (input.length > 0) {
            if (e.nativeEvent.keyCode === 8) {
                setCurrentCh(currentCh - 1);
            }
        }
    };

    const addCharacterCount = () => {
        setTotalCh(totalCh + currentCh + 1);
        setLetterCount([...letterCount, currentCh + 1]);
        setCurrentCh(0);
    };

    const deleteCharacterCount = () => {
        var ch = letterCount[index - 1];
        setLetterCount(letterCount.slice(0, -1));
        setTotalCh(totalCh - ch);
        setCurrentCh(0);
    };

    const handleInput = (inputValue) => {
        if (inputValue === origin[index]) {
            setIsInput(false);
            setLetters([...letters, inputValue]);
            setInput("");
            setIsError(false);
            setCurrentCh(currentCh + 1);
            addCharacterCount();
            setIndex(index + 1);
            setCorrect(correct + 1);
        } else if (origin[index] === " " && inputValue !== " ") {
            setInput("");
            setIsError(true);
        } else if (origin[index] !== " " && inputValue === " ") {
            setInput("");
            setIsError(true);
        } else if (currentCh === 2 || inputValue.length > 1) {
            setIsInput(false);
            setIsError(false);
            setLetters([...letters, inputValue.split("")[0]]);
            setInput("");
            setCurrentCh(currentCh + 1);
            addCharacterCount();
            setIndex(index + 1);
        } else {
            setIsInput(true);
            setIsError(false);
            setCurrentCh(currentCh + 1);
        }
        if (inputValue.length === 0) {
            setIsInput(false);
            setCurrentCh(0);
        }
    };

    return (
        <TypingWords onClick={() => inputRef.current.focus()}>
            {letters.map((letter, i) =>
                letter === origin[i] ? (
                    <CorrectChar key={i}>{letter}</CorrectChar>
                ) : (
                    <IncorrectChar key={i}>{letter}</IncorrectChar>
                )
            )}
            <InputChar
                name="typing-area"
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                isError={isError}
            />
        </TypingWords>
    );
}

export { InputText };
