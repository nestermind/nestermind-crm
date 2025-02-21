import styled from '@emotion/styled';

import { useRecordInlineCellContext } from '@/object-record/record-inline-cell/components/RecordInlineCellContext';
import { RecordInlineCellDisplayMode } from '@/object-record/record-inline-cell/components/RecordInlineCellDisplayMode';
import { RecordInlineCellEditMode } from '@/object-record/record-inline-cell/components/RecordInlineCellEditMode';
import { RecordInlineCellSkeletonLoader } from '@/object-record/record-inline-cell/components/RecordInlineCellSkeletonLoader';
import { useInlineCell } from '@/object-record/record-inline-cell/hooks/useInlineCell';

const StyledClickableContainer = styled.div<{
  isCentered?: boolean;
}>`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;

  ${({ isCentered }) =>
    isCentered === true &&
    `
      justify-content: center;
    `};
`;

export const RecordFormEntryValue = () => {
  const {
    displayModeContent,
    customEditHotkeyScope,
    editModeContent,
    editModeContentOnly,
    readonly,
    loading,
    isCentered,
  } = useRecordInlineCellContext();

  const { isInlineCellInEditMode, openInlineCell } = useInlineCell();

  const handleDisplayModeClick = () => {
    if (!readonly && !editModeContentOnly) {
      openInlineCell(customEditHotkeyScope);
    }
  };

  if (loading === true) {
    return <RecordInlineCellSkeletonLoader />;
  }

  return (
    <>
      {!readonly && isInlineCellInEditMode && (
        <RecordInlineCellEditMode>{editModeContent}</RecordInlineCellEditMode>
      )}
      <StyledClickableContainer isCentered={isCentered}>
        <RecordInlineCellDisplayMode>
          {editModeContent}
        </RecordInlineCellDisplayMode>
      </StyledClickableContainer>
    </>
  );
};
