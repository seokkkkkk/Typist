import styled from "styled-components";
import { ReactComponent as Download } from "../assets/svg/download.svg";
import { ReactComponent as Share } from "../assets/svg/share.svg";
import { ReactComponent as Like } from "../assets/svg/heart.svg";
import { ReactComponent as Liked } from "../assets/svg/heart_fill.svg";
import { ReactComponent as Back } from "../assets/svg/cross.svg";
import { ReactComponent as Logo } from "../assets/svg/logo.svg";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { ChartDotSquare, ChartDotTriangle } from "./CustomDot";
import { CustomTooltip } from "./CustomTooltip";
import { TextInfo } from "./TextInfo";
import { useMemo } from "react";
import html2canvas from "html2canvas";

const Button = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
`;

const BoldText = styled.span`
    font-weight: 800;
`;

const ResultButtons = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 30px;
    right: 70px;
`;

const ResultText = styled.span`
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
`;

const ResultSection = styled.section`
    margin: 0px 70px 0px 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ResultHeader = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ResultHr = styled.hr`
    margin: 20px 40px 20px 40px;
`;

const ResultTitle = styled.div`
    font-size: 24px;
    font-weight: 800;
    margin-top: 20px;
`;

const ResultContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const ResultBox = styled.div`
    position: absolute;
    width: 450px;
    height: 600px;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export function ResultModal({
    data,
    handleCloseResult,
    result,
    setIsLike,
    isLike,
}) {
    const yAxisTicks = useMemo(() => {
        const maxCpm = Math.max(...data.map((item) => item.cpm));
        const minCpm = Math.min(...data.map((item) => item.cpm));
        const start = Math.floor(minCpm / 100) * 100;
        const end = Math.ceil(maxCpm / 100) * 100;
        const ticks = [];
        for (let i = start; i <= end; i += 100) {
            ticks.push(i);
        }
        return ticks;
    }, [data]);

    const downloadResult = () => {
        const resultBox = document.getElementById("resultBox"); // ResultBox에 id 추가
        html2canvas(resultBox).then((canvas) => {
            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.download = "result-report.png";
            link.href = image;
            link.click();
        });
    };

    const shareResult = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Typist Result Report",
                    text: "Check out my typing test results!",
                    url: document.location.href,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing:", error));
        } else {
            console.log("Share API not supported.");
        }
    };

    return (
        <ResultContainer>
            <ResultBox id="resultBox">
                <Button onClick={() => handleCloseResult()} name="back-button">
                    <Back
                        width="20px"
                        height="20px"
                        fill="gray"
                        style={{ margin: "15px -15px -15px 15px" }}
                    />
                </Button>
                <ResultHeader>
                    <Logo width="80px" height="80px" />
                    <ResultTitle>Typist Result Report</ResultTitle>
                </ResultHeader>

                <ResultHr />

                <ResultSection>
                    <ResultText>
                        <BoldText>USERNAME</BoldText>
                        <span>정윤석</span>
                    </ResultText>
                    <ResultText>
                        <BoldText>TOTAL INPUT / SYLLABLE</BoldText>
                        <span>
                            {result[0]} / {result[1]}
                        </span>
                    </ResultText>
                </ResultSection>

                <ResultHr />

                <ResultSection>
                    <ResultText>
                        <BoldText>CPM</BoldText>
                        <span>{result[2]}</span>
                    </ResultText>
                    <ResultText>
                        <BoldText>ACC</BoldText>
                        <span>{result[3]}%</span>
                    </ResultText>
                    <ResultText>
                        <BoldText>ERR</BoldText>
                        <span>{result[4]}%</span>
                    </ResultText>
                    <ResultText>
                        <BoldText>TIME</BoldText>
                        <span>{result[5]}초</span>
                    </ResultText>
                </ResultSection>

                <ResponsiveContainer
                    width="100%"
                    height={170}
                    style={{ fontSize: "10px" }}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 20,
                    }}
                >
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 5,
                            left: 10,
                            bottom: -20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" interval="1" />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            dataKey="cpm"
                            allowDataOverflow={true}
                            ticks={yAxisTicks}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            dataKey="err"
                            domain={[0, 100]}
                            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            dataKey="acc"
                            domain={[0, 100]}
                            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            align="center"
                            verticalAlign="bottom"
                            iconSize="6px"
                            payload={[
                                {
                                    value: "CPM",
                                    type: "circle",
                                    color: "#ADD468",
                                },
                                {
                                    value: "ACC",
                                    type: "square",
                                    color: "#4B89DC",
                                },
                                {
                                    value: "ERR",
                                    type: "triangle",
                                    color: "#FF0000",
                                },
                            ]}
                            wrapperStyle={{ bottom: -10 }} // 레전드와 차트 사이의 거리 조정
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="cpm"
                            stroke="#ADD468"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="err"
                            stroke="#FF0000"
                            legendType="triangle"
                            dot={<ChartDotTriangle fill="#FF0000" length={8} />}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="acc"
                            stroke="#4B89DC"
                            legendType="square"
                            dot={<ChartDotSquare fill="#4B89DC" length={6} />}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <TextInfo
                    title="나의 일기"
                    link="https://github.com/seokkkkkk"
                    author="정윤석"
                    uploader="yundol"
                />
                <ResultButtons>
                    <Button
                        onClick={() => setIsLike(!isLike)}
                        name="like button"
                    >
                        {isLike ? (
                            <Liked width="20px" height="20px" fill="red" />
                        ) : (
                            <Like width="20px" height="20px" fill="gray" />
                        )}
                    </Button>
                    <Button
                        onClick={() => downloadResult()}
                        name="download button"
                    >
                        <Download width="20px" height="20px" fill="gray" />
                    </Button>
                    <Button name="share button" onClick={() => shareResult()}>
                        <Share width="20px" height="20px" fill="gray" />
                    </Button>
                </ResultButtons>
            </ResultBox>
        </ResultContainer>
    );
}
