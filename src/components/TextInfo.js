import styled from "styled-components";
import { ReactComponent as LinkIcon } from "../assets/svg/link.svg";

const Info = styled.div`
    margin: 0 40px 0 40px;
    font-size: 15px;
    font-weight: 400;
    width: ${(props) => (props.$small ? "78%" : "100%")};
`;

const TextLink = styled.a`
    padding: 0 3px 0 3px;
    margin-left: 5px;
`;

const Text = styled.span``;

const Author = styled(Text)`
    margin-right: 10px;
`;

const Divider = styled.span`
    border-right: 2px solid gray;
    height: 14px;
`;

const Uploader = styled(Text)`
    margin-left: 10px;
    color: gray;
`;

const InfoColumn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin-bottom: 5px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
`;

function TextInfo({ title, link, author, uploader, small }) {
    return (
        <Info $small={small}>
            <hr />
            <InfoColumn>
                <b>{title}</b>
                <TextLink
                    href={link}
                    about="origin text link"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <LinkIcon width="12px" height="12px" fill="black" />
                </TextLink>
            </InfoColumn>
            <InfoColumn>
                <Author>{author}</Author>
                <Divider />
                <Uploader> {uploader}</Uploader>
            </InfoColumn>
            <hr />
        </Info>
    );
}
export { TextInfo };
