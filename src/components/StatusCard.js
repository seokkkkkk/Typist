import styled from "styled-components";

const StatLabel = styled.label`
    font-size: 12px;
    font-weight: bold;
`;

const Stat = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Stats = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 20px 10px 20px;
`;

const StatValue = styled.span`
    font-size: 12px;
`;

const TextInfo = styled.div`
    margin: 10px 20px 10px 20px;
`;

const TextTitle = styled.span`
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;
const TextAuthor = styled.span`
    font-size: 12px;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;
const ResultCard = styled.div`
    margin: 10px 10px 10px 10px;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    width: 90%;
`;

export function StatusCard({ title, author, cpm, acc, err }) {
    return (
        <ResultCard>
            {title && author && (
                <TextInfo>
                    <TextTitle>{title}</TextTitle>
                    <TextAuthor>({author})</TextAuthor>
                </TextInfo>
            )}
            <Stats>
                <Stat>
                    <StatLabel>CPM</StatLabel>
                    <StatValue>{cpm}</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>ACC</StatLabel>
                    <StatValue>{acc}%</StatValue>
                </Stat>
                <Stat>
                    <StatLabel>ERR</StatLabel>
                    <StatValue>{err}%</StatValue>
                </Stat>
            </Stats>
        </ResultCard>
    );
}
