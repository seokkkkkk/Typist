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
`;

const TextAuthor = styled(BottomText)`
    font-size: 12px;
    color: gray;
`;

const BottomMenuColumn = styled.div`
    margin: 0px 10px 0px 10px;
`;

const TextIndex = styled(BottomText)`
    font-weight: 1000;
    width: 20px;
    margin-right: 10px;
`;

const TextTitle = styled(BottomText)`
    font-weight: bold;
`;

const BottomMenuBody = styled.div`
    gap: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
    margin: 20px 40px 0 40px;
    padding: 10px;
    height: 100%;

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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${(props) => (props.$isSelected ? "#f0f0f0" : "white")};
    box-shadow: 5px 5px 5px 5px #bebebe, -5px -5px 10px #ffffff;
    border-radius: 10px;
    width: 30%;
    height: 80px;
    cursor: pointer;
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
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
`;

const BottomMenu = styled.div`
    animation: ${(props) =>
            props.$isVisible ? slideInFromBottom : slideOutToBottom}
        0.3s ease-out forwards;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    border-top: 1px solid lightgray;
    z-index: 10;
    height: 40%;
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
                        <TextIndex>{index + 1}</TextIndex>
                        <BottomMenuColumn>
                            <TextTitle>{text.title}</TextTitle>
                            <TextAuthor>({text.author})</TextAuthor>
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
