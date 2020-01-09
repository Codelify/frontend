import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  padding-bottom:10px;
  background-color: rgba(237, 242, 248, 0.97);
`;

const DropDownItem = styled.div`
  width: 100%;
  padding-left:10px;
  padding-top:5px;
  padding-bottom:3px; 
  background-color: none;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 1rem;" : null)};
  display: flex;
  color: ${props => (props.highlighted ? "#319795" : "#2D3748")};
  font-weight: ${props => (props.highlighted ? "bold" : "regular")};
  &:hover {
    cursor: pointer;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const Root = styled.div`
  position: relative;
  width: 100%;
  /* case loading is taking time we can use a className and set loading state */
  /* input {
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  } */
`;

export { DropDown, DropDownItem, Root };
