import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return (
    <Root>
      <Box>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Box>
    </Root>
  );
};

export default Spinner;

const Root = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const animate = keyframes`
  0%{
    width:150px;
    height:150px;
  }
 10%{
    width:130px;
    height:130px;
  }
  50%{
    width:100px;
    height:100px;
  }
  90%{
    width:130px;
    height:300px;
  }
  100%{
    width:100px;
    height:100px;
  }
`;

const rotate = keyframes`
  0%{
    transform:rotate(0deg)
  }
 10%{
   transform:rotate(0deg)
  }
  50%{
   transform:rotate(90deg)

  }
  90%{
   transform:rotate(90deg)

  }
  100%{
   transform:rotate(90deg)
  }
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  animation: ${animate} 1s linear infinite;
  transform: rotate(45deg);

  span {
    position: absolute;
    width: 50px;
    height: 50px;
    animation: ${rotate} 1s linear infinite;
  }

  span:nth-child(1) {
    top: 0;
    left: 0;
    background-color: #319795;
  }

  span:nth-child(2) {
    top: 0;
    right: 0;
    background-color: #319795;
  }

  span:nth-child(3) {
    bottom: 0;
    left: 0;
    background-color: #319795;
  }
  span:nth-child(4) {
    bottom: 0;
    right: 0;
    background-color: #319795;
  }
`;
