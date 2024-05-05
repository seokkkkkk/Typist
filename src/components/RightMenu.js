import styled from "styled-components";
import { slideInFromRight } from "../utils/animation";

import { ReactComponent as User } from "../assets/svg/user.svg";
import { ReactComponent as UserEdit } from "../assets/svg/settings.svg";
import { ReactComponent as Bell } from "../assets/svg/bell.svg";
import { StatusCard } from "./StatusCard";
import { Developer } from "./Developer";

const MenuContainer = styled.section`
    background-color: whitesmoke;
    box-shadow: 10px 0px 10px 5px rgba(0, 0, 0, 0.5);
    border: none;
    width: 400px;
    height: 100vh;
    animation: ${slideInFromRight} 0.3s ease-out forwards;
`;

const ProfileImage = styled.span`
    background-color: white;
    overflow: hidden;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UserIcon = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
`;

const DefaultIcon = styled(User)`
    width: 40px;
    height: 40px;
    fill: gray;
    object-fit: cover;
`;

const MenuContents = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Nickname = styled.span`
    font-size: 15px;
    font-weight: bold;
`;

const Logout = styled.span`
    font-size: 12px;
    color: gray;
    cursor: pointer;
    &:hover {
        border-bottom: 1px solid black;
    }
`;

const Profile = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const EditButton = styled(UserEdit)`
    width: 10px;
    height: 10px;
    fill: gray;
    margin-left: 4px;
    cursor: pointer;
`;

const ProfileEditButtons = styled.div`
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const NotificationContainer = styled.div`
    position: absolute;
    right: 2em;
    top: 20px;
    cursor: pointer;
`;

const NotificationIcon = styled(Bell)`
    width: 25px;
    height: 25px;
    fill: gray;
`;

const NotificationNumber = styled.span`
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

const StatusContatiner = styled(MenuContents)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    align-items: start;
`;

const StatTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const RecentCards = styled.div`
    display: flex;
    width: 100%;
    max-height: 360px;
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

function Notification({ number }) {
    var printNumber = number;
    if (printNumber > 99) printNumber = "99";
    return (
        <NotificationContainer>
            <NotificationIcon />
            {number > 0 && (
                <NotificationNumber>{printNumber}</NotificationNumber>
            )}
        </NotificationContainer>
    );
}

export function RightMenu() {
    return (
        <MenuContainer>
            <Notification number={100} />
            <MenuContents>
                <Profile>
                    <ProfileImage>
                        <DefaultIcon />
                    </ProfileImage>
                    <Nickname>Yundol</Nickname>
                </Profile>
                <ProfileEditButtons>
                    <Logout>logout</Logout>
                    <EditButton name="edit profile" />
                </ProfileEditButtons>
            </MenuContents>
            <StatusContatiner>
                <StatTitle>Best</StatTitle>
                <StatusCard
                    title="나의 일기"
                    author="정윤석"
                    cpm="239"
                    acc="98"
                    err="2"
                />
                <StatTitle>Average</StatTitle>
                <StatusCard cpm="239" acc="98" err="2" />
                <StatTitle>Recent</StatTitle>
                <RecentCards>
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                    <StatusCard
                        title="나의 일기"
                        author="정윤석"
                        cpm="239"
                        acc="98"
                        err="2"
                    />
                </RecentCards>
            </StatusContatiner>
            <footer>
                <Developer />
            </footer>
        </MenuContainer>
    );
}
