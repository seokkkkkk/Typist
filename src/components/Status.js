import styled from "styled-components";

const Performance = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: start;
`;

const Stat = styled.div`
    white-space: nowrap;
    font-size: 12px;
    padding: 2px 2px 2px 2px;
    border: 2px solid gray;
    border-radius: 5px;
    margin-right: 10px;
`;

function Status({ cpm, acc, err, totalTime }) {
    return (
        <Performance>
            <Stat>CPM: {cpm ? cpm : 0}</Stat>
            <Stat>ACC: {acc ? acc : 0}%</Stat>
            <Stat>ERR: {err ? err : 0}%</Stat>
            <Stat>
                {totalTime
                    ? `${Math.floor(totalTime / 60)
                          .toString()
                          .padStart(2, "0")}:${Math.round(totalTime % 60)
                          .toString()
                          .padStart(2, "0")}`
                    : "00:00"}
            </Stat>
        </Performance>
    );
}

export { Status };
