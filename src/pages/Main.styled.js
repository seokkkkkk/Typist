import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../assets/svg/logo.svg";

export const MainPage = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
`;

export const MainLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;

export const MainBody = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 50px 30px 0 25spx;
`;

export const Footer = styled.footer`
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    @media (min-width: 1001px) {
        width: 1001px;
    }
`;

export const MainHeader = styled.header`
    font-size: 24px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

export const Logo = styled(LogoIcon)`
    width: 30px;
    height: 30px;
    margin-top: 35px;
    margin-right: 10px;
`;

export const PageContainer = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
`;

export const RemainingArea = styled.div`
    left: -50%;
    width: 200%;
    height: 100%;
    position: absolute;
    background-color: transparent;
`;
