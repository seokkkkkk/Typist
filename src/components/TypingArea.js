import styled from "styled-components";
import { GivenText } from "../components/GivenText";
import { InputText } from "../components/InputText";
import { useState } from "react";

const TextArea = styled.span`
    margin-left: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    cursor: text;
    flex-wrap: wrap;
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
            <InputText
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
