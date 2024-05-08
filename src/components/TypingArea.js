import styled from "styled-components";
import { GivenText } from "../components/GivenText";
import { useState } from "react";
import { InputRenewal } from "./InputRenewal";

const TextArea = styled.span`
    margin-top: 10px;
    margin-left: 40px;
    cursor: text;
    margin-right: 35px;
    max-height: 30dvh;
    overflow-y: hidden;
`;

function TypingArea({
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
    inputRef,
}) {
    const [index, setIndex] = useState(0);
    const [isInput, setIsInput] = useState(false);

    return (
        <TextArea onClick={() => inputRef.current.focus()}>
            <InputRenewal
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
