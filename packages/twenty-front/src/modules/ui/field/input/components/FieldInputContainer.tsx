import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RGBA } from 'twenty-ui';

// eslint-disable-next-line @nx/workspace-styled-components-prefixed-with-styled
export const FieldInputContainer = styled.div<{ minWidth?: number }>`
  align-items: center;
  display: flex;
  min-height: 32px;
  min-width: ${(p) => p.minWidth ?? 200}px;
  width: 100%;
`;

// eslint-disable-next-line @nx/workspace-styled-components-prefixed-with-styled
export const FormFieldinputContainer = styled(FieldInputContainer)<{
  focused: boolean;
}>`
  background-color: ${({ theme }) => theme.background.transparent.lighter};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  ${({ focused, theme }) =>
    focused &&
    css`
      border-color: ${theme.color.blue};
      box-shadow: 0px 0px 0px 3px ${RGBA(theme.color.blue, 0.1)};
    `}
`;
