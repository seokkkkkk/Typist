import React from "react";
import styled from "styled-components";
import LoadingAnimation from "../assets/svg/loading.svg";

const Background = styled.div`
    position: absolute;
    width: 200%;
    height: 140%;
    top: -30%;
    left: -50%;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BackgroundSmall = styled(Background)`
    height: 100%;
    top: 0;
`;

export function Loading() {
    return (
        <Background>
            <img src={LoadingAnimation} alt="loading" />
        </Background>
    );
}

export function LoadingSmall() {
    return (
        <BackgroundSmall>
            <img
                src={LoadingAnimation}
                alt="loading"
                width="100px"
                height="100px"
            />
        </BackgroundSmall>
    );
}
