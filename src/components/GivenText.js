import styled from "styled-components";

const Char = styled.span.attrs((props) => ({
    style: {
        fontSize: "20px",
        minWidth: "6px",
        display: "inline-block",
        color: props.$isTyping ? "transparent" : "gray",
        backgroundColor: "transparent",
        marginBottom: "8px",
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
