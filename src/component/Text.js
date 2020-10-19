

import React from 'react';
import styled from 'styled-components';

const FONT_SIZE = {
  xxLarge: '2rem',
  xLarge: '1.5rem',
  large: '1.4rem',
  medium: '1.3rem',
  small: '1.2rem',
  xSmall: '1.1rem',
  xxSmall: '1rem',
};

let StyledText = styled.span`
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
  'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
  sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
font-size: ${(props) => FONT_SIZE[props.size || 'small']};
font-weight: ${(props) => {
  if (props.weight) {
    return props.weight;
  }
  return props.bold ? '600' : '400';
}};
color: ${(props) => props.color};
font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
`;

let StyledLink = styled.a`
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
  'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
  sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
font-size: ${(props) => FONT_SIZE[props.size || 'small']};
font-weight: ${(props) => {
  if (props.weight) {
    return props.weight;
  }
  return props.bold ? '600' : '400';
}};
color: ${(props) => props.color};
font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
`;

function Text({ link, children, sup, ...otherProps }) {
    return link ? (
      <StyledLink {...otherProps}>
        {children}
        <sup>{sup}</sup>
      </StyledLink>
    ) : (
      <StyledText {...otherProps}>
        {children}
        <sup>{sup}</sup>
      </StyledText>
    );
  }
  
  export default Text;