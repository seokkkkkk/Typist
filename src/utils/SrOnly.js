import styled from "styled-components";

export const SrOnly = styled.label`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0); /* 구형 브라우저를 위해 사용 */
    clip-path: polygon(0 0, 0 0, 0 0); /* inset(50%) 와 동일한 표현 */
    border: 0;
`;
