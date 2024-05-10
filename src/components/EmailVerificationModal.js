import styled from "styled-components";
import { SrOnly } from "../utils/SrOnly";
import { useState } from "react";

const LoginBackground = styled.div`
    position: absolute;
    width: 200%;
    height: 100%;
    left: -50%;
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
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background-color: white;
    width: 450px;
    height: 300px;
    @media (max-width: 500px) {
        width: 400px;
    }
    @media (max-width: 450px) {
        width: 300px;
    }
    min-width: 300px;
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
const InvalidType = styled(Typist)`
    color: red;
    margin-bottom: 0px;
    margin-top: 10px;
`;

export const EmailVerificationModal = () => {
    const [isInvalid, setIsInvalid] = useState(false);
    return (
        <LoginBackground>
            <LoginContainer>
                <Title>Typist Verification</Title>
                <Typist>Enter the verification code sent to your email</Typist>
                {isInvalid && (
                    <InvalidType>Invalid code. Please try again.</InvalidType>
                )}
                <Form method="" action="">
                    <Inputs>
                        <SrOnly htmlFor="typist-code">ID</SrOnly>
                        <Input
                            type="text"
                            id="typist-code"
                            placeholder="Verification Code"
                        />
                    </Inputs>
                    <Button type="submit">Confirm Authentication</Button>
                </Form>
            </LoginContainer>
        </LoginBackground>
    );
};
