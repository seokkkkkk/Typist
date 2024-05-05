import styled from "styled-components";
import { slideInFromRight } from "../utils/animation";

const MenuContainer = styled.section`
    background-color: whitesmoke;
    box-shadow: 10px 0px 10px 5px rgba(0, 0, 0, 0.5);
    border: none;
    width: 400px;
    height: 100vh;
    animation: ${slideInFromRight} 0.3s ease-out forwards;
`;

export function RightMenu() {
    return (
        <MenuContainer>
            <div>이름</div>
            <div>정보수정</div>
            <div>알림</div>
            <div>로그아웃</div>
            <div>평균타수</div>
            <div>최근 기록</div>
            <div></div>
            <div></div>
        </MenuContainer>
    );
}
