import styled from "styled-components";

const Tooltip = styled.div`
    width: 70px;
    height: 90px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const TooltipTitle = styled.p`
    padding-top: 10px;
    margin-left: 20px;
    margin-bottom: -5px;
    font-size: 12px;
    font-weight: bold;
`;

const TooltipContent = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TooltipLabel = styled.label`
    font-size: 10px;
    font-weight: 300;
`;

const TooltipAcc = styled.div`
    margin: -12px 10px 0px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        const { time, cpm, acc, err } = item;
        return (
            <Tooltip>
                <TooltipTitle>{time}</TooltipTitle>
                <TooltipContent>
                    <TooltipLabel>CPM</TooltipLabel>
                    {cpm}
                </TooltipContent>
                <TooltipAcc>
                    <TooltipContent>
                        <TooltipLabel>ACC</TooltipLabel>
                        {acc}%
                    </TooltipContent>
                    <TooltipContent>
                        <TooltipLabel>ERR</TooltipLabel>
                        {err}%
                    </TooltipContent>
                </TooltipAcc>
            </Tooltip>
        );
    }

    return null;
}
