import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavSt = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 100px;
`;

export const NavLinkSt = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  padding: 15px;
  transition: all 0.3s;
  color: black;

  &.active {
    color: blue;
    border-bottom: 2px solid blue;
  }
`;
