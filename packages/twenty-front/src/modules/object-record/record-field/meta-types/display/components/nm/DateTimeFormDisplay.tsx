import { useDateTimeFieldDisplay } from '@/object-record/record-field/meta-types/hooks/useDateTimeFieldDisplay';
import { useRecordEdit } from '@/record-edit/contexts/RecordEditContext';
import { DateTimeDisplay } from '@/ui/field/display/components/DateTimeDisplay';

export const DateTimeFormDisplay = () => {
  const { fieldValue, fieldDefinition } = useDateTimeFieldDisplay();

  const { getUpdatedFields } = useRecordEdit();

  const displayAsRelativeDate =
    fieldDefinition.metadata?.settings?.displayAsRelativeDate;

  return (
    <DateTimeDisplay
      value={
        getUpdatedFields()[fieldDefinition.metadata.fieldName]?.toString() ??
        fieldValue
      }
      displayAsRelativeDate={displayAsRelativeDate}
    />
  );
};
