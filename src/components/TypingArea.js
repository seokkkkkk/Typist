import styled from "styled-components";
import { GivenText } from "../components/GivenText";
import { InputText } from "../components/InputText";
import { useRef, useState } from "react";

const TextArea = styled.span`
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
}) {
    const [index, setIndex] = useState(0);
    const [isInput, setIsInput] = useState(false);
    const text =
        "저는 정윤석 입니다. 안녕하세요 저는 정윤석 입니다. 안녕하세요 저는 정윤석 입니다. 안녕하세요 저는 정윤석 입니다. 안녕하세요 저는 정윤석 입니다. 안녕하세요 저는 정윤석 입니다. 안녕하세요 저는 정윤석 입니다. 안녕하세요 저는 정윤석 입니다. ";
    const inputRef = useRef(null);

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
            />
            <GivenText text={text} index={index} isInput={isInput} />
        </TextArea>
    );
}

export { TypingArea };
