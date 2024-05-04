import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const TypingWords = styled.div`
    position: absolute;
    top: 158.5px;
    margin-right: 30px;
`;

const InputChar = styled.input`
    background-color: transparent;
    caret-color: gray;
    border: none;
    outline: none;
    padding: 0px;
    font-size: 20px;
    width: 20px;
`;

const Char = styled.span`
    font-size: 20px;
    width: 20px;
    color: gray;
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
            setCpm(Math.round((totalCh / timeInSeconds) * 60));
            setAcc(Math.round((correct / letters.length) * 100));
            setErr(
                Math.round(((letters.length - correct) / letters.length) * 100)
            );
        }
    }, [totalTime, totalCh, correct, letters.length, setAcc, setCpm, setErr]);

    if (reload) {
        clearInterval(timerRef.current);
        setReload(false);
    }

    const origin = text.split("");

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
            setCurrentCh(currentCh + 1);
            addCharacterCount();
            setIndex(index + 1);
            setCorrect(correct + 1);
        } else if (origin[index] === " " && inputValue !== " ") {
            setInput("");
        } else if (origin[index] !== " " && inputValue === " ") {
            setInput("");
        } else if (currentCh === 2 || inputValue.length > 1) {
            setIsInput(false);
            setLetters([...letters, inputValue.split("")[0]]);
            setInput("");
            setCurrentCh(currentCh + 1);
            addCharacterCount();
            setIndex(index + 1);
        } else {
            setIsInput(true);
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
                autoFocus
            />
        </TypingWords>
    );
}

export { InputText };
