import styled from '@emotion/styled';
import { t } from '@lingui/core/macro';
import { IconCheck, IconInfoCircle } from 'twenty-ui';

const StyledProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(4)} 0;
`;

const StyledProgressHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledProgressTitle = styled.div`
  color: ${({ theme }) => theme.font.color.secondary};
  font-size: ${({ theme }) => theme.font.size.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledProgressBarContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledProgressBar = styled.div`
  background: ${({ theme }) => theme.background.tertiary};
  border-radius: ${({ theme }) => theme.border.radius.pill};
  flex-grow: 1;
  height: 6px;
  overflow: hidden;
  position: relative;
`;

const StyledProgressFill = styled.div<{ percentage: number }>`
  background: ${({ theme, percentage }) =>
    percentage < 50
      ? theme.color.yellow
      : percentage < 80
        ? theme.color.blue
        : theme.color.green50};
  border-radius: ${({ theme }) => theme.border.radius.pill};
  height: 100%;
  transition: width 0.3s ease-in-out;
  width: ${({ percentage }) => percentage}%;
`;

const StyledPercentage = styled.div<{ percentage: number }>`
  color: ${({ theme, percentage }) =>
    percentage < 50
      ? theme.color.yellow
      : percentage < 80
        ? theme.color.blue
        : theme.color.green50};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

type CompletionProgressProps = {
  percentage: number;
};

export const CompletionProgress = ({ percentage }: CompletionProgressProps) => (
  <StyledProgressContainer>
    <StyledProgressHeader>
      <StyledProgressTitle>
        <strong>{t`Publication completion -`}</strong>
        {percentage < 80
          ? t`Add more details to improve your listing`
          : t`Looking good!`}
        {percentage < 80 ? (
          <IconInfoCircle size={16} />
        ) : (
          <IconCheck size={16} />
        )}
      </StyledProgressTitle>
    </StyledProgressHeader>
    <StyledProgressBarContainer>
      <StyledProgressBar>
        <StyledProgressFill percentage={percentage} />
      </StyledProgressBar>
      <StyledPercentage percentage={percentage}>
        {Math.round(percentage)}%
      </StyledPercentage>
    </StyledProgressBarContainer>
  </StyledProgressContainer>
);
