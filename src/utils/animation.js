import { keyframes } from "styled-components";

export const slideInFromRight = () => keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideOutToRight = keyframes`
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 0;
    }
`;

export const slideInFromBottom = () => keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideOutToBottom = () => keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
  `;

export const rotateAnimation = () => keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
`;

export const mildShake = keyframes`
  0%, 100% { transform: translateX(0); }
  25%, 75% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
`;

export const blinkCaret = keyframes`
  from, to { opacity: 1; }
  50% { opacity: 0; }
`;

export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;
