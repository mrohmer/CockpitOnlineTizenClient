import React from 'react';
import styled, {keyframes} from 'styled-components';

const shakeAnimation = keyframes`
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(3%);
  }
`;
const lineAnimation = keyframes`
  0% {
    stroke-dashoffset: 22;
  }

  25% {
    stroke-dashoffset: 22;
  }

  50% {
    stroke-dashoffset: 0;
  }

  51% {
    stroke-dashoffset: 0;
  }

  80% {
    stroke-dashoffset: -22;
  }

  100% {
    stroke-dashoffset: -22;
  }
`

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1.5);
  transform-origin: center;
`;

const G = styled.g`
  fill: none;
  stroke: #ff9a5a;
  fill-rule: evenodd;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: translate(2 1);
`;
const Path = styled.path`
  animation: ${shakeAnimation} 0.2s ease-in-out infinite alternate;
  stroke-width: 3px;
`;
const Line = styled.path`
  transform-origin: center right;
  stroke-dasharray: 22;
  animation: ${lineAnimation} 0.8s ease-in-out infinite;
  animation-fill-mode: both;
  stroke-width: 3px;
`;
const TopLine = styled(Line)`
  animation-delay: 0s;
`;
const MiddleLine = styled(Line)`
  animation-delay: 0.2s;
`;
const BottomLine = styled(Line)`
  animation-delay: 0.4s;
`;
const Wheel = styled.ellipse`
  fill: black;
  stroke-width: 3.2px;
`
export default function Loading() {
  return (
    <Root>
      <svg width="102" height="40" xmlns="http://www.w3.org/2000/svg">
        <G>
          <Path d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"/>
          <Wheel cx="83.493" cy="30.25" rx="6.922" ry="6.808"/>
          <Wheel cx="46.511" cy="30.25" rx="6.922" ry="6.808"/>
          <TopLine d="M22.5 16.5H2.475"/>
          <MiddleLine d="M20.5 23.5H.4755"/>
          <BottomLine d="M25.5 9.5h-19"/>
        </G>
      </svg>
    </Root>
  )
}
