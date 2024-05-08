import styled from "styled-components";
import { GivenText } from "../components/GivenText";
import { useRef, useState } from "react";
import { InputRenewal } from "./InputRenewal";

const TextArea = styled.span`
    margin-top: 10px;
    margin-left: 40px;
    cursor: text;
    margin-right: 35px;
    max-height: 30dvh;
    overflow-y: hidden;
    overflow-x: hidden;
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

    return (
        <TextArea
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
