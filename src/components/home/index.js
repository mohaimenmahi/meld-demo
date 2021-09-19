import React from "react";
import styled from "styled-components";
import LoginModal from "./views/modal";

const HomeIndex = () => {
  return (
    <HomeStyle>
      <LoginModal />
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  background-color: #282c34;
  height: 100vh;
`;

export default HomeIndex;
