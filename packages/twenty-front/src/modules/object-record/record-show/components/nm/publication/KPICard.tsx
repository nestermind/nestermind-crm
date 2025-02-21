import styled from '@emotion/styled';
import { ReactNode } from 'react';

const StyledKPICard = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledLabelContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StyledIcon = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.font.color.tertiary};
  display: flex;
`;

const StyledLabel = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const StyledValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

type KPICardProps = {
  label: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
};

export const KPICard = ({ label, value, icon }: KPICardProps) => (
  <StyledKPICard>
    <StyledLabelContainer>
      {icon && <StyledIcon>{icon}</StyledIcon>}
      <StyledLabel>{label}</StyledLabel>
    </StyledLabelContainer>
    {typeof value === 'string' || typeof value === 'number' ? (
      <StyledValue>{value}</StyledValue>
    ) : (
      value
    )}
  </StyledKPICard>
);
