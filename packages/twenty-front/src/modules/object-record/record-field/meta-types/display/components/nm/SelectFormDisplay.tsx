import { useSelectFieldDisplay } from '@/object-record/record-field/meta-types/hooks/useSelectFieldDisplay';
import { useRecordEdit } from '@/record-edit/contexts/RecordEditContext';
import { SelectDisplay } from '@/ui/field/display/components/SelectDisplay';
import { isDefined } from 'twenty-shared';

export const SelectFormDisplay = () => {
  const { fieldValue, fieldDefinition } = useSelectFieldDisplay();

  const { getUpdatedFields } = useRecordEdit();

  const selectedOption = fieldDefinition.metadata.options?.find(
    (option) =>
      option.value === getUpdatedFields()[fieldDefinition.metadata.fieldName],
  );

  const currentOption = fieldDefinition.metadata.options?.find(
    (option) => option.value === fieldValue,
  );

  const valueToUse = selectedOption ?? currentOption;

  if (!isDefined(valueToUse)) {
    return <></>;
  }

  return <SelectDisplay color={valueToUse.color} label={valueToUse.label} />;
};
