import styled from "styled-components";

import { ReactComponent as List } from "../assets/svg/features.svg";
import { slideInFromBottom, slideOutToBottom } from "../utils/animation";

const BottomText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TextUploader = styled(BottomText)`
    font-size: 12px;
    color: gray;
    @media (max-width: 550px) {
        font-size: 10px;
    }
`;

const TextAuthor = styled(BottomText)`
    font-size: 12px;
    color: gray;
    @media (max-width: 550px) {
        font-size: 10px;
    }
`;

const BottomMenuColumn = styled.div``;

const TextTitle = styled(BottomText)`
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    @media (max-width: 550px) {
        flex-direction: column;
        font-size: 14px;
    }
`;

const BottomMenuBody = styled.div`
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 가로로 3개의 열
    grid-auto-rows: auto; // 아래로 자동으로 늘어나게 설정
    justify-content: center;
    overflow-y: auto;
    padding: 10px;
    height: 60%;
    width: 90%;

    // Webkit 브라우저용 (Chrome, Safari 등)
    &::-webkit-scrollbar {
        display: none; // 스크롤바 비활성화
    }

    // Firefox용
    scrollbar-width: none; // 스크롤바 숨기기

    // MS Edge 및 IE 11용
    -ms-overflow-style: none; // 스크롤바 숨기기
`;

const BottomTextCell = styled.div`
    padding: 10px 12px 0px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${(props) => (props.$isSelected ? "#f0f0f0" : "white")};
    box-shadow: 2px 2px 5px 2px #bebebe, -5px -5px 10px #ffffff;
    border-radius: 10px;
    cursor: pointer;
    width: 88%;
    @media (max-width: 550px) {
        padding: 5px 6px 0px 6px;
    }
`;

const ListIcon = styled(List)`
    width: 20px;
    height: 20px;
    fill: black;
    margin-right: 10px;
`;

const BottomMenuTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin: -10px 0px 10px 0px;
    display: flex;
    justify-content: center;
`;

const BottomMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    max-width: 1000px;
    animation: ${(props) =>
            props.$isVisible ? slideInFromBottom : slideOutToBottom}
        0.3s ease-out forwards;
    width: 100%;
    height: 30%;
    bottom: 0;
    background-color: white;
    border-top: 1px solid lightgray;
    z-index: 10;
`;

export function MainBottomMenu({
    texts,
    onSelectText,
    currentTextIndex,
    isVisible,
}) {
    return (
        <BottomMenu $isVisible={isVisible}>
            <BottomMenuTitle>
                <ListIcon /> Text List
            </BottomMenuTitle>
            <BottomMenuBody>
                {texts.map((text, index) => (
                    <BottomTextCell
                        key={index}
                        onClick={() => onSelectText(index)}
                        $isSelected={index === currentTextIndex}
                    >
                        <BottomMenuColumn>
                            <TextTitle>
                                <span>
                                    {index + 1 + ". " + text.title + " "}
                                </span>
                                <TextAuthor>({text.author})</TextAuthor>
                            </TextTitle>
                        </BottomMenuColumn>
                        <BottomMenuColumn>
                            <TextUploader>
                                Uploaded by {text.uploader}
                            </TextUploader>
                        </BottomMenuColumn>
                    </BottomTextCell>
                ))}
            </BottomMenuBody>
        </BottomMenu>
    );
}
