import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { blinkCaret, shake } from "../utils/animation";

const CustomCaret = styled.div`
    display: inline-block;
    position: relative;
    width: 0px;
    height: 17px;
    border-left: 4px solid
        ${(props) =>
            props.$isFocused &&
            (props.$isInvalid ? "red" : "rgba(0, 0, 0, 0.3)")};
    right: ${(props) => props.position || "1px"};
    top: 2px;
    animation: ${blinkCaret} 1s steps(1) infinite,
        ${(props) =>
            props.$isInvalid
                ? css`
                      ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both
                  `
                : "none"};
    transition: right 0.3s ease-out, border-color 0.3s ease; // Adds transition for color and position
`;

const CustomInput = styled.input`
    position: relative;
    right: 4px;
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

const CustomCaretInput = ({
    onKeyDown,
    value,
    isInvalid,
    setIsInvalid,
    inputFocus,
}) => {
    // Set to reset isInvalid and isWrong after the animation completes
    useEffect(() => {
        if (isInvalid) {
            const timer = setTimeout(() => {
                setIsInvalid(false);
            }, 820); // The longest animation duration plus a small buffer
            return () => clearTimeout(timer);
        }
    }, [isInvalid, setIsInvalid]);

    return (
        <>
            <CustomCaret $isInvalid={isInvalid} $isFocused={false} />
            <CustomInput
                name="typing-area"
                ref={inputFocus}
                type="text"
                value={value}
                onKeyDown={onKeyDown}
                onChange={() => {}}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                autoFocus
            />
        </>
    );
};

export default CustomCaretInput;
