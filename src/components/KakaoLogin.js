import styled from "styled-components";
import KakaoLogin from "../assets/svg/kakao_logo.png";

const KakaoLogo = styled.div`
    background-color: #fee500;
    width: 176px;
    height: 40px;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;
const KakaoContainer = styled.div`
    display: flex;
    padding: 10px 14px;
`;
const KakaoLabel = styled.label`
    color: #000000 85%;
    font-size: 14px;
`;
const KakaoSymbol = styled.img`
    width: 17px;
    height: 17px;
    margin-right: 14px;
`;

export const KaKaoLogin = () => {
    return (
        <KakaoLogo>
            <KakaoContainer>
                <KakaoSymbol src={KakaoLogin} alt="kakao logo" />
                <KakaoLabel>Login with Kakao</KakaoLabel>
            </KakaoContainer>
        </KakaoLogo>
    );
};
