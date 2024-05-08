import styled from "styled-components";
import { slideInFromRight, slideOutToRight } from "../utils/animation";

import { ReactComponent as User } from "../assets/svg/user.svg";
import { ReactComponent as UserEdit } from "../assets/svg/settings.svg";
import { ReactComponent as Bell } from "../assets/svg/bell.svg";

export const MenuContainer = styled.section`
    position: fixed;
    right: 0;
    background-color: whitesmoke;
    box-shadow: -10px 0px 10px -10px rgba(0, 0, 0, 0.5);
    border: none;
    width: 400px;
    height: 100dvh;
    animation: ${(props) =>
            props.$isVisible ? slideInFromRight : slideOutToRight}
        0.3s ease-out forwards;
    //너비가 600 이하인 경우 너비 줄임 (반응형)
    @media (max-width: 800px) {
        position: fixed;
        width: 200px;
    }
    z-index: 11;
`;

export const ProfileImage = styled.span`
    margin-top: 60px;
    margin-bottom: 10px;
    background-color: white;
    overflow: hidden;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UserIcon = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
`;

export const DefaultIcon = styled(User)`
    width: 60px;
    height: 60px;
    fill: gray;
    object-fit: cover;
`;

export const MenuContents = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 800px) {
        margin-right: 10px;
    }
`;

export const Nickname = styled.span`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Logout = styled.span`
    font-size: 12px;
    color: gray;
    cursor: pointer;
    &:hover {
        border-bottom: 1px solid black;
    }
`;

export const Profile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const EditButton = styled(UserEdit)`
    width: 10px;
    height: 10px;
    fill: gray;
    margin-left: 4px;
    cursor: pointer;
`;

export const ProfileEditButtons = styled.div`
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const NotificationContainer = styled.div`
    position: absolute;
    right: 2em;
    top: 20px;
    cursor: pointer;
`;

export const NotificationIcon = styled(Bell)`
    width: 25px;
    height: 25px;
    fill: gray;
`;

export const NotificationNumber = styled.span`
    color: white;
    border: 2px solid whitesmoke;
    background-color: red;
    border-radius: 50%;
    width: 13px;
    height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 1000;
    position: relative;
    bottom: 18px;
    left: 15px;
`;

export const StatusContatiner = styled(MenuContents)`
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-top: 20px;
    align-items: start;
    @media (min-height: 1200px) {
        height: 70%;
    }
    @media (max-height: 880px) {
        height: 58%;
    }
    @media (max-height: 840px) {
        height: 42%;
    }
`;

export const StatTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

export const RecentCards = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow-y: auto; // Y축 스크롤 활성화
    // Webkit 브라우저용 (Chrome, Safari 등)
    &::-webkit-scrollbar {
        display: none; // 스크롤바 비활성화
    }
    // Firefox용
    scrollbar-width: none; // 스크롤바 숨기기

    // MS Edge 및 IE 11용
    -ms-overflow-style: none; // 스크롤바 숨기기
`;
