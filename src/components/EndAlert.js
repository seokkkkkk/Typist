import styled from "styled-components";
import { ReactComponent as NoData } from "../assets/svg/nodata.svg";

const EndAlertBackground = styled.div`
    position: absolute;
    width: 200%;
    left: -50%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10;
`;
const EndAlert = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%); // X와 Y 방향으로 각각 50% 이동
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;
`;

const EndAlertTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
`;
const EndAlertText = styled.div`
    font-size: 15px;
    color: gray;
`;
export function EndOfText({ setOpenAlert }) {
    return (
        <EndAlertBackground onClick={() => setOpenAlert(false)}>
            <EndAlert onClick={() => setOpenAlert(false)}>
                <NoData width="50px" height="50px" fill="gray" />
                <EndAlertTitle>No more text to type</EndAlertTitle>
                <EndAlertText>We'll prepare more for you</EndAlertText>
            </EndAlert>
        </EndAlertBackground>
    );
}
