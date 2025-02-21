import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }: { theme: Theme }) => theme.spacing(1)};
  padding: ${({ theme }: { theme: Theme }) => theme.spacing(2)};
`;

const StyledText = styled.div`
  color: ${({ theme }: { theme: Theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }: { theme: Theme }) => theme.font.size.xs};
  font-weight: ${({ theme }: { theme: Theme }) => theme.font.weight.medium};
`;

const StyledImage = styled.img<{ size: number }>`
  aspect-ratio: 1.5;
  width: ${({ size }) => size}px;
`;

type NestermindBrandingProps = {
  size?: number;
};

const NestermindBranding = ({ size = 50 }: NestermindBrandingProps) => {
  return (
    <StyledContainer>
      <StyledText>Powered by</StyledText>
      <StyledImage
        src={'/images/integrations/nestermind-logo.svg'}
        alt="Nestermind logo"
        size={size}
      />
    </StyledContainer>
  );
};

export default NestermindBranding;
