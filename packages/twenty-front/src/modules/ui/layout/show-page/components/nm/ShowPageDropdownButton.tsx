import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { IconChevronRight, IconComponent } from 'twenty-ui';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledAccordionContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  overflow: hidden;
  width: 100%;
`;

const StyledDropdownButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.background.primary};
  border: none;
  display: grid;
  grid-template-columns: 1fr 1fr 24px;
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)};
  width: 100%;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.background.secondary};
  }
`;

const StyledDropdownIconAndText = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.font.color.secondary};
`;

const StyledDropdownValue = styled.div`
  text-align: start;
`;

const StyledChevronIcon = styled(motion.div)`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`;

const StyledAccordionContent = styled(motion.div)`
  border-top: 1px solid ${({ theme }) => theme.border.color.light};
  overflow: hidden;
  width: 100%;
`;

const StyledContentContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
`;

type ShowPageDropdownButtonProps = {
  icon: IconComponent;
  label: string;
  value: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
};

export const ShowPageDropdownButton = ({
  icon: Icon,
  label,
  value,
  children,
  onClick,
}: ShowPageDropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <StyledContainer>
      <StyledAccordionContainer>
        <StyledDropdownButton onClick={handleClick}>
          <StyledDropdownIconAndText>
            <Icon size={16} />
            <div>{label}</div>
          </StyledDropdownIconAndText>
          <StyledDropdownValue>{value}</StyledDropdownValue>
          <StyledChevronIcon
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <IconChevronRight size={16} />
          </StyledChevronIcon>
        </StyledDropdownButton>

        <AnimatePresence>
          {isOpen && children && (
            <StyledAccordionContent
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <StyledContentContainer>{children}</StyledContentContainer>
            </StyledAccordionContent>
          )}
        </AnimatePresence>
      </StyledAccordionContainer>
    </StyledContainer>
  );
};
