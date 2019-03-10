import React from "react";
import styled from '@emotion/styled';

const Nav = (props) => {
  const {text} = props;
  return (
    <TopNav className="top-nav">
      {text}
    </TopNav>
  );
};

const TopNav = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
  height: 70px;
  font-size: 5vh;
  background-color: #2c3e50;
`

export default Nav;
