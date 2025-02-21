import { Tag, THEME_COMMON } from 'twenty-ui';

import { FieldMultiSelectValue } from '@/object-record/record-field/types/FieldMetadata';
import { SelectOption } from '@/spreadsheet-import/types';
import styled from '@emotion/styled';

const spacing1 = THEME_COMMON.spacing(1);

const StyledContainer = styled.div<{ wrap?: boolean }>`
  align-items: center;
  display: flex;
  gap: ${spacing1};
  justify-content: flex-start;

  max-width: 100%;

  overflow: hidden;

  width: 100%;

  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'unset')};
`;

export const MultiSelectDisplay = ({
  values,
  options,
  wrap,
}: {
  values: FieldMultiSelectValue | undefined;
  options: SelectOption[];
  wrap?: boolean;
}) => {
  const selectedOptions = values
    ? options?.filter((option) => values.includes(option.value))
    : [];

  if (!selectedOptions) return null;

  return (
    <StyledContainer wrap={wrap}>
      {selectedOptions.map((selectedOption, index) => (
        <Tag
          preventShrink
          key={index}
          color={selectedOption.color ?? 'transparent'}
          text={selectedOption.label}
          Icon={selectedOption.icon ?? undefined}
        />
      ))}
    </StyledContainer>
  );
};
