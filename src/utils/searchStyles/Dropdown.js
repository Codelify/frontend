import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  /* border: 1px solid lightgrey; */
`;

const DropDownItem = styled.div`
  width: 50%;
  border-bottom: 1px solid lightgrey;
  background: ${props => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 0.1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? "lightgrey" : "white")};
  img {
    margin-right: 10px;
  }

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
