import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../assets/svg/logo.svg";
import { SrOnly } from "../utils/SrOnly";
import { useState } from "react";

import { ReactComponent as GoogleLogin } from "../assets/svg/login_google.svg";
import { KaKaoLogin } from "./KakaoLogin";

const OrText = styled.span`
    font-size: 15px;
    position: relative;
    top: -15px;
    background-color: #fff;
    padding: 0 10px;
    position: relative;
    z-index: 1;
    @media (max-width: 500px) {
        font-size: 12px;
        top: -13px;
    }
    @media (max-width: 450px) {
        font-size: 10px;
    }
`;

const LoginBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: white;
    width: 450px;
    height: 535px;
    @media (max-width: 500px) {
        width: 400px;
        height: 490px;
    }
    @media (max-width: 450px) {
        width: 300px;
        height: 450px;
    }
    min-width: 300px;
    min-height: 400px;
`;

const Logo = styled(LogoIcon)`
    margin: 40px auto;
    display: block;
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    @media (max-width: 450px) {
        width: 40px;
        height: 40px;
    }
    min-width: 40px;
    min-height: 40px;
`;

const Title = styled.div`
    margin-top: 40px;
    font-weight: bold;
    text-align: center;
    font-size: 25px;
    @media (max-width: 500px) {
        font-size: 20px;
        margin-top: 30px;
    }
    @media (max-width: 450px) {
        font-size: 15px;
        margin-top: 20px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-top: 15px;
    @media (max-width: 500px) {
        margin-top: 10px;
    }
    @media (max-width: 450px) {
        margin-top: 10px;
    }
`;

const Fieldset = styled.fieldset`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    margin: 0;
    padding: 0;
`;

const Inputs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
`;

const Input = styled.input`
    padding: 0 20px;
    border-radius: 10px;
    border: none;
    background-color: #f5f5f5;
    outline: none;
    height: 50px;
    width: 360px;
    @media (max-width: 500px) {
        font-size: 15px;
        width: 320px;
        height: 45px;
    }
    @media (max-width: 450px) {
        font-size: 12px;
        width: 220px;
        height: 35px;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 8px;

    font-size: 18px;
    color: white;
    background-color: #2f2f2f;

    height: 50px;
    width: 400px;

    margin-bottom: 15px;

    @media (max-width: 500px) {
        font-size: 15px;
        width: 360px;
        height: 45px;
    }
    @media (max-width: 450px) {
        font-size: 12px;
        width: 260px;
        height: 35px;
    }
`;

const LinkText = styled.div`
    color: #f5c518;
    cursor: pointer;
    @media (max-width: 500px) {
        font-size: 15px;
    }
    @media (max-width: 450px) {
        font-size: 12px;
    }
`;

const Typist = styled.span`
    color: #7f7f7f;
    margin-right: 8px;
    @media (max-width: 500px) {
        font-size: 15px;
    }
    @media (max-width: 450px) {
        font-size: 12px;
    }
`;

const TypistLine = styled.div`
    margin-top: 5px;
    @media (max-width: 500px) {
        font-size: 15px;
    }
    @media (max-width: 450px) {
        font-size: 12px;
    }
`;

const SocialLoginButtons = styled.div`
    display: flex;
    gap: 20px;
    @media (max-width: 500px) {
        gap: 5px;
    }
    @media (max-width: 450px) {
        gap: 10px;
        flex-direction: column;
    }
`;

export const LoginModal = ({ setLoginModalOpen }) => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <LoginBackground onClick={() => setLoginModalOpen(false)}>
            <LoginContainer onClick={(e) => e.stopPropagation()}>
                <header>
                    <Logo />
                    <Title>Login to Typist</Title>
                </header>
                <Form method="" action="">
                    <Fieldset>
                        <SrOnly as="legend">Login</SrOnly>
                        <Inputs>
                            <SrOnly htmlFor="id">ID</SrOnly>
                            <Input
                                type="text"
                                id="id"
                                placeholder="Email address"
                            />
                            <SrOnly htmlFor="password">Password</SrOnly>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                            />
                        </Inputs>
                    </Fieldset>
                    {isLogin ? (
                        <Button type="submit">Sign In</Button>
                    ) : (
                        <Button type="submit">Create an account</Button>
                    )}

                    {isLogin ? (
                        <>
                            <LinkText>Forgot password?</LinkText>
                            <TypistLine>
                                <Typist>New Typist?</Typist>
                                <LinkText
                                    as="span"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Create an account
                                </LinkText>
                            </TypistLine>
                        </>
                    ) : (
                        <TypistLine>
                            <Typist>Already have an account?</Typist>
                            <LinkText
                                as="span"
                                onClick={() => setIsLogin(true)}
                            >
                                Sign In
                            </LinkText>
                        </TypistLine>
                    )}
                </Form>
                <Hr />
                <OrText>OR</OrText>
                <SocialLoginButtons>
                    <GoogleLogin />
                    <KaKaoLogin />
                </SocialLoginButtons>
            </LoginContainer>
        </LoginBackground>
    );
};

const Hr = styled.hr`
    margin-top: 20px;
    border: 1px solid #f5f5f5;
    width: 390px;
    @media (max-width: 500px) {
        width: 350px;
    }
    @media (max-width: 450px) {
        width: 250px;
    }
`;
