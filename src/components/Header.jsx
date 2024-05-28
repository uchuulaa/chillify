import styled from '@emotion/styled';
import { space, color, layout, typography, flexbox } from 'styled-system';

const HeaderWrapper = styled.header(
  space,
  color,
  layout,
  typography,
  flexbox
);

const Logo = styled.h1(
  typography
);

const Header = () => {
  return (
    <HeaderWrapper
      bg="purple"
      color="white"
      p={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo fontSize={7} style={{ margin: 0 }}>Chillify</Logo>
    </HeaderWrapper>
  );
};

export default Header;
