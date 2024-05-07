import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as ListIcon } from "../assets/svg/menu-burger.svg";

export const MainPage = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100dvh;
`;

export const List = styled(ListIcon)`
    margin-right: 5px;
    width: 60px;
    height: 60px;
    fill: gray;
    cursor: pointer;
`;

export const MainLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`;

export const MainBody = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 50px 30px 0 25spx;
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 40px;
    margin-bottom: 20px;
`;

export const MainHeader = styled.header`
    font-size: 24px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

export const LogoStyle = styled(Logo)`
    margin-top: 35px;
    margin-right: 10px;
`;

export const PageContainer = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
`;
