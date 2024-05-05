import styled from "styled-components";

const Char = styled.span.attrs((props) => ({
    style: {
        fontSize: "20px",
        width: "17px",
        display: "inline-block",
        color: props.$isTyping ? "transparent" : "gray",
        backgroundColor: "transparent",
    },
}))``;

const GivenTextStyle = styled.div`
    bottom: 24px;
    z-index: -1;
`;

function GivenText({ text, index, isInput }) {
    return (
        <GivenTextStyle>
            {text.split("").map((ch, idx) => (
                <Char
                    key={idx}
                    $isTyping={(idx === index && isInput) || idx < index}
                >
                    {ch}
                </Char>
            ))}
        </GivenTextStyle>
    );
}

export { GivenText };
