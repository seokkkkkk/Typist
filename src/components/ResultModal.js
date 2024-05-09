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
import { CustomTooltip } from "./CustomTooltip";
import { TextInfo } from "./TextInfo";
import { useEffect, useMemo } from "react";
import html2canvas from "html2canvas";
import { getCookie, setCookie } from "../utils/TypistCookie";

const Button = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
`;

const BoldText = styled.span`
    font-weight: 800;
    @media (max-width: 450px) {
        font-size: 12px;
    }
`;

const ResultButtons = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 42px;
    right: 60px;
    @media (max-width: 450px) {
        bottom: 63px;
        right: 42px;
    }
`;

const ResultText = styled.span`
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
`;

const ResultSection = styled.section`
    width: 70%;
    margin: 0px 70px 0px 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 450px) {
        width: 68%;
    }
`;

const ResultHeader = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 450px) {
        margin-top: 0px;
    }
`;

const ResultHr = styled.hr`
    width: 76%;
    margin: 20px 40px 20px 40px;
    @media (max-width: 450px) {
        margin: 25px 40px 25px 40px;
    }
`;

const ResultTitle = styled.div`
    font-size: 24px;
    font-weight: 800;
    margin-top: 20px;
    @media (max-width: 450px) {
        font-size: 22px;
    }
`;

const ResultContainer = styled.div`
    z-index: 100;
    position: absolute;
    left: -50%;
    width: 200%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const ResultBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 450px;
    height: 600px;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 450px) {
        width: 360px;
        height: 640px;
    }
`;

export function ResultModal({
    userData,
    data,
    handleCloseResult,
    result,
    handleLike,
    isLike,
    textInfo,
}) {
    function saveResultToCookie(result) {
        let prevResult = getCookie("result");
        if (!prevResult) prevResult = [];
        const resultData = {
            totalInput: result[0],
            syllable: result[1],
            cpm: result[2],
            acc: result[3],
            err: result[4],
            time: result[5],
            id: result[6],
            title: result[7],
            author: result[8],
            date: new Date().getTime(),
        };

        // 새 결과 추가 전에 배열의 크기를 확인하고, 30개 이상이면 가장 오래된 결과 제거
        if (prevResult.length >= 30) {
            prevResult.shift(); // 배열의 첫 번째 요소 제거 (가장 오래된 결과)
        }

        // 새 결과를 배열에 추가하고 쿠키 업데이트
        setCookie("result", JSON.stringify([...prevResult, resultData]));
    }
    useEffect(() => {
        saveResultToCookie(result);
    }, [result]);
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
    function handleKeyDown(e) {
        if (e.key === "Escape") {
            handleCloseResult();
        }
    }
    useEffect(() => {
        const modal = document.getElementById("result");
        if (modal) {
            modal.focus();
        }
    }, []);

    const LogoBox = styled(Logo)`
        width: 70px;
        height: 70px;
        @media (max-width: 450px) {
            margin-top: 10px;
            width: 60px;
            height: 60px;
        }
    `;

    const SmallText = styled.span`
        @media (max-width: 450px) {
            font-size: 12px;
        }
    `;
    const Xmargin = styled.div`
        height: 20px;
        @media (max-width: 450px) {
            height: 20px;
        }
    `;
    return (
        <ResultContainer
            onKeyDown={handleKeyDown}
            onClick={() => handleCloseResult()}
            tabIndex="0"
            id="result"
        >
            <ResultBox
                id="resultBox"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <ResultHeader>
                    <LogoBox />
                    <ResultTitle>Typist Result Report</ResultTitle>
                </ResultHeader>
                <ResultHr />
                <ResultSection>
                    <ResultText>
                        <BoldText>USERNAME</BoldText>
                        <SmallText>
                            {userData ? userData.name : "Guest"}
                        </SmallText>
                    </ResultText>
                    <ResultText>
                        <BoldText>TOTAL INPUT / SYLLABLE</BoldText>
                        <SmallText>
                            {result[0]} / {result[1]}
                        </SmallText>
                    </ResultText>
                </ResultSection>

                <ResultHr />

                <ResultSection>
                    <ResultText>
                        <BoldText>CPM</BoldText>
                        <SmallText>{result[2]}</SmallText>
                    </ResultText>
                    <ResultText>
                        <BoldText>ACC</BoldText>
                        <SmallText>{result[3]}%</SmallText>
                    </ResultText>
                    <ResultText>
                        <BoldText>ERR</BoldText>
                        <SmallText>{result[4]}%</SmallText>
                    </ResultText>
                    <ResultText>
                        <BoldText>TIME</BoldText>
                        <SmallText>{result[5]}초</SmallText>
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
                                    color: "#4B89DC",
                                },
                                {
                                    value: "ERR",
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
                            dot={{ r: 0 }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="err"
                            stroke="#FF0000"
                            legendType="triangle"
                            dot={{ r: 0 }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="acc"
                            stroke="#4B89DC"
                            legendType="square"
                            dot={{ r: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <Xmargin />
                <TextInfo
                    title={textInfo.title}
                    link={textInfo.link}
                    author={textInfo.author}
                    uploader={textInfo.uploader}
                    small={true}
                />
                <ResultButtons>
                    <Button onClick={() => handleLike()} name="like button">
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
