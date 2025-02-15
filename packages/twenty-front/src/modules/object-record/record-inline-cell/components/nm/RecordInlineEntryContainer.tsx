import { useTheme } from '@emotion/react';
import { useContext } from 'react';

import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { getRecordFieldInputId } from '@/object-record/utils/getRecordFieldInputId';

import { assertFieldMetadata } from '@/object-record/record-field/types/guards/assertFieldMetadata';
import { isFieldText } from '@/object-record/record-field/types/guards/isFieldText';
import { RecordInlineCellValue } from '@/object-record/record-inline-cell/components/RecordInlineCellValue';
import styled from '@emotion/styled';
import { MOBILE_VIEWPORT } from 'twenty-ui';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import { useRecordInlineCellContext } from '../RecordInlineCellContext';

const StyledValueContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)};
`;

const StyledGridEntryLabelContainer = styled.div`
  flex-shrink: 0;
  min-width: 200px;
  @media only screen and (max-width: ${MOBILE_VIEWPORT}px) {
    min-width: 100px;
  }
`;

const StyledGridEntryContainer = styled.div`
  display: flex;
`;

export const RecordInlineEntryContainer = () => {
  const {
    readonly,
    IconLabel,
    label,
    labelWidth,
    showLabel,
    isDisplayModeFixHeight,
  } = useRecordInlineCellContext();

  const { recordId, fieldDefinition } = useContext(FieldContext);

  if (isFieldText(fieldDefinition)) {
    assertFieldMetadata(FieldMetadataType.TEXT, isFieldText, fieldDefinition);
  }

  const theme = useTheme();
  const labelId = `label-${getRecordFieldInputId(
    recordId,
    fieldDefinition?.metadata?.fieldName,
  )}`;

  return (
    <StyledValueContainer>
      <StyledGridEntryLabelContainer>{label}</StyledGridEntryLabelContainer>
      <StyledGridEntryContainer>
        <RecordInlineCellValue />
      </StyledGridEntryContainer>
    </StyledValueContainer>
  );
};
