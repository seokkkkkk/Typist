import styled from "styled-components";
import { GivenText } from "../components/GivenText";
import { useEffect, useRef, useState } from "react";
import { InputRenewal } from "./InputRenewal";

const TextArea = styled.span`
    font-family: "D2Coding";
    margin-top: 10px;
    margin-left: 40px;
    cursor: text;
    margin-right: 35px;
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 70dvh;
    @media (max-height: 885px) {
        max-height: 65dvh;
    }
    @media (max-height: 720px) {
        max-height: 58dvh;
    }
    @media (max-height: 630px) {
        max-height: 54dvh;
    }
    @media (max-height: 560px) {
        max-height: 45dvh;
    }
    @media (max-height: 485px) {
        max-height: 38dvh;
    }
    @media (max-height: 460px) {
        max-height: 35dvh;
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
    inputFocus,
}) {
    const [index, setIndex] = useState(0);
    const [isInput, setIsInput] = useState(false);

    useEffect(() => {
        if (isInput && inputFocus.current) {
            inputFocus.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [index, isInput]);

    return (
        <TextArea
            onClick={() => {
                if (inputFocus.current) {
                    inputFocus.current.focus();
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
                inputFocus={inputFocus}
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
