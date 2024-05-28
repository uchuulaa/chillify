// src/components/Footer.jsx
import styled from '@emotion/styled';
import { space, color, layout, typography, flexbox } from 'styled-system';

const FooterWrapper = styled.footer(
  space,
  color,
  layout,
  typography,
  flexbox
);

const Footer = () => {
  return (
    <FooterWrapper
      bg="gray"
      color="white"
      p={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <p style={{ margin: 0 }}>&copy; 2024 Music Platform. All rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;
