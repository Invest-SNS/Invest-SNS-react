import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideNavbar from "~/components/side-bar/SideNavbar";
const SideLayout = () => {
  return (
    <Container>
      <Outlet />
      <SideNavbar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  position: relative;
  overflow: hidden;
  z-index: 999;
  background-color: white;
  border-left: 1px solid #e2e2e2;
`;
export default SideLayout;
