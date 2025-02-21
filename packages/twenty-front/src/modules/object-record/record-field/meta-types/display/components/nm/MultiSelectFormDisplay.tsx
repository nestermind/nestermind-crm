import { Tag } from 'twenty-ui';

import { useFieldFocus } from '@/object-record/record-field/hooks/useFieldFocus';
import { useMultiSelectFieldDisplay } from '@/object-record/record-field/meta-types/hooks/useMultiSelectFieldDisplay';
import { useRecordEdit } from '@/record-edit/contexts/RecordEditContext';
import { MultiSelectDisplay } from '@/ui/field/display/components/MultiSelectDisplay';
import { ExpandableList } from '@/ui/layout/expandable-list/components/ExpandableList';

export const MultiSelectFormDisplay = () => {
  const { fieldValue, fieldDefinition } = useMultiSelectFieldDisplay();

  const { isFocused } = useFieldFocus();

  const { getUpdatedFields } = useRecordEdit();

  const selectedOptions = getUpdatedFields()[fieldDefinition.metadata.fieldName]
    ? fieldDefinition.metadata.options?.filter((option) =>
        (
          getUpdatedFields()[
            fieldDefinition.metadata.fieldName
          ] as Array<string>
        ).includes(option.value),
      )
    : undefined;

  const selectedFieldValues = fieldValue
    ? fieldDefinition.metadata.options?.filter((option) =>
        fieldValue.includes(option.value),
      )
    : [];

  const selectedOptionsToShow = selectedOptions ?? selectedFieldValues;

  const valuesToShow =
    getUpdatedFields()[fieldDefinition.metadata.fieldName] ?? fieldValue;

  if (!selectedOptionsToShow || !valuesToShow) return null;

  return isFocused ? (
    <ExpandableList isChipCountDisplayed={isFocused} wrap={true}>
      {selectedOptionsToShow.map((selectedOption, index) => (
        <Tag
          key={index}
          color={selectedOption.color}
          text={selectedOption.label}
        />
      ))}
    </ExpandableList>
  ) : (
    <MultiSelectDisplay
      values={valuesToShow as Array<string>}
      options={fieldDefinition.metadata.options}
      wrap={true}
    />
  );
};
