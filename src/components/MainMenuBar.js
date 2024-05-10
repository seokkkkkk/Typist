import styled, { css } from "styled-components";
import { Status } from "../components/Status";
import { ReactComponent as Home } from "../assets/svg/home.svg";
import { ReactComponent as Left } from "../assets/svg/angle-left.svg";
import { ReactComponent as Right } from "../assets/svg/angle-right.svg";
import { ReactComponent as Reload } from "../assets/svg/rotate-right.svg";
import { ReactComponent as Like } from "../assets/svg/heart.svg";
import { ReactComponent as Liked } from "../assets/svg/heart_fill.svg";

import { rotateAnimation } from "../utils/animation";

const MenuBar = styled.div`
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: top;
`;

const MenuIcons = styled.div`
    margin-right: 10px;
    width: 120px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const MenuIcon = styled.span`
    cursor: pointer;
    width: 20px;
    margin-left: 2px;
`;

const LikeButton = styled(MenuIcon)`
    margin-right: 6px;
`;

const ConditionalRotatingReload = styled(Reload)`
    animation: ${(props) =>
        props.$isLoading
            ? css`
                  ${rotateAnimation} 0.5s linear
              `
            : "none"};
`;

export function MainMenuBar({
    cpm,
    acc,
    err,
    totalTime,
    isLoading,
    handleReload,
    handleCurrentText,
    handleMenuOpen,
    currentTextIndex,
    texts,
    isLike,
    handleLike,
}) {
    return (
        <MenuBar>
            <Status cpm={cpm} acc={acc} err={err} totalTime={totalTime} />
            <MenuIcons>
                <LikeButton onClick={handleLike} name="like button">
                    {isLike ? (
                        <Liked width="18px" height="20px" fill="red" />
                    ) : (
                        <Like width="18px" height="20px" fill="gray" />
                    )}
                </LikeButton>
                <MenuIcon onClick={() => handleReload()}>
                    <ConditionalRotatingReload
                        aria-label="다시하기"
                        width="15px"
                        height="20px"
                        fill="gray"
                        $isLoading={isLoading}
                    />
                </MenuIcon>
                <MenuIcon>
                    <Left
                        onClick={() => handleCurrentText({ indexDiff: -1 })}
                        aria-label="이전 글"
                        width="15px"
                        height="20px"
                        fill={currentTextIndex > 0 ? "gray" : "lightgray"}
                    />
                </MenuIcon>
                <MenuIcon>
                    <Right
                        onClick={() => handleCurrentText({ indexDiff: 1 })}
                        aria-label="다음 글"
                        width="15px"
                        height="20px"
                        fill={
                            currentTextIndex < texts.length - 1
                                ? "gray"
                                : "lightgray"
                        }
                    />
                </MenuIcon>
                <MenuIcon>
                    <Home
                        onClick={() => handleMenuOpen({ bool: true })}
                        aria-label="글 목록"
                        width="20px"
                        height="20px"
                        fill="gray"
                    />
                </MenuIcon>
            </MenuIcons>
        </MenuBar>
    );
}
