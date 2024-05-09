import styled from "styled-components";
import { GivenText } from "../components/GivenText";
import { useEffect, useRef, useState } from "react";
import { InputRenewal } from "./InputRenewal";

const TextArea = styled.span`
    margin-top: 10px;
    margin-left: 40px;
    cursor: text;
    margin-right: 35px;
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 60dvh;
    @media (min-height: 660px) {
        max-height: 50dvh;
    }
    @media (min-height: 720px) {
        max-height: 65dvh;
    }
    @media (min-height: 950px) {
        max-height: 73dvh;
    }
`;

function TypingArea({
    canType,
    setCanType,
    setAcc,
    setErr,
    setCpm,
    totalTime,
    setTotalTime,
    reload,
    setReload,
    setResultOpen,
    setResult,
    setData,
    text,
}) {
    const [index, setIndex] = useState(0);
    const [isInput, setIsInput] = useState(false);
    const inputRef = useRef(null);

    const textAreaRef = useRef(null);

    useEffect(() => {
        if (isInput && inputRef.current) {
            inputRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [index, isInput]);

    return (
        <TextArea
            ref={textAreaRef}
            onClick={() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }}
        >
            <InputRenewal
                canType={canType}
                setCanType={setCanType}
                text={text}
                index={index}
                setIndex={setIndex}
                setIsInput={setIsInput}
                inputRef={inputRef}
                setAcc={setAcc}
                setErr={setErr}
                setCpm={setCpm}
                totalTime={totalTime}
                setTotalTime={setTotalTime}
                reload={reload}
                setReload={setReload}
                setResultOpen={setResultOpen}
                setResult={setResult}
                setData={setData}
            />
            <GivenText text={text} index={index} isInput={isInput} />
        </TextArea>
    );
}

export { TypingArea };
