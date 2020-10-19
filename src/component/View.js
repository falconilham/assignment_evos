import React, {forwardRef} from 'react';
import styled from 'styled-components';

let RawView = styled.div`
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  min-height: 0;
  min-width: 0;
  padding: 0;
  position: relative;
  z-index: 0;
  outline: none;
`;

export default forwardRef(({ children, ...otherProps }, ref) => {
  return (
    <RawView ref={ref} {...otherProps}>
      {children}
    </RawView>
  );
});