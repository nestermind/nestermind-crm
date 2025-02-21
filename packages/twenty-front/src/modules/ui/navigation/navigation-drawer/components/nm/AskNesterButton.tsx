import { Button, IconSparkles } from 'twenty-ui';

import { isNavigationDrawerExpandedState } from '@/ui/navigation/states/isNavigationDrawerExpanded';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const StyledButtonContainer = styled.div<{
  isNavigationDrawerExpanded: boolean;
}>`
  display: flex;
  justify-content: ${({ isNavigationDrawerExpanded }) =>
    isNavigationDrawerExpanded ? 'center' : 'flex-start'};
  padding: 0 ${({ theme }) => theme.spacing(2)} 0 0;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export const AskNesterButton = () => {
  // TODO: remove this once we have a working button
  const [showButton] = useState(false);

  const [isNavigationDrawerExpanded] = useRecoilState(
    isNavigationDrawerExpandedState,
  );

  if (!showButton) {
    return null;
  }

  return (
    <StyledButtonContainer
      isNavigationDrawerExpanded={isNavigationDrawerExpanded}
    >
      <Button
        variant="primary"
        accent="purple"
        fullWidth={isNavigationDrawerExpanded}
        title={isNavigationDrawerExpanded ? 'Ask Nester' : ''}
        Icon={IconSparkles}
        justify={isNavigationDrawerExpanded ? 'center' : 'flex-start'}
      />
    </StyledButtonContainer>
  );
};
