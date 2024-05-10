import styled from "styled-components";
import { ReactComponent as NoData } from "../assets/svg/nodata.svg";

const NoDataContainer = styled.div`
    margin: 10px 10px 10px 10px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    width: 90%;
`;

const NoDataText = styled.div`
    font-size: 14px;
    color: gray;
`;

const NoDataTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
    @media (max-width: 801px) {
        display: none;
    }
`;

const NoDataTitleMini = styled(NoDataTitle)`
    display: none;
    @media (max-width: 801px) {
        display: inline;
    }
`;

const NoDataBody = styled.div`
    display: flex;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px 10px 10px 10px;
    gap: 10px;
`;

export function NoDataCard() {
    return (
        <NoDataContainer>
            <NoDataBody>
                <NoData width="20px" height="20px" fill="gray" />
                <NoDataTitle>No typist usage information yet.</NoDataTitle>
                <NoDataTitleMini>No typist usage</NoDataTitleMini>
                <NoDataTitleMini>information yet.</NoDataTitleMini>
                <NoDataText> Let's get started now!</NoDataText>
            </NoDataBody>
        </NoDataContainer>
    );
}
