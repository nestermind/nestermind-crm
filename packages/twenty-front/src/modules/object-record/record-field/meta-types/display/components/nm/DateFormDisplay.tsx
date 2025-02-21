import { useDateFieldDisplay } from '@/object-record/record-field/meta-types/hooks/useDateFieldDisplay';
import { useRecordEdit } from '@/record-edit/contexts/RecordEditContext';
import { DateDisplay } from '@/ui/field/display/components/DateDisplay';

export const DateFormDisplay = () => {
  const { fieldValue, fieldDefinition } = useDateFieldDisplay();
  const { getUpdatedFields } = useRecordEdit();

  const displayAsRelativeDate =
    fieldDefinition.metadata?.settings?.displayAsRelativeDate;

  return (
    <DateDisplay
      value={
        getUpdatedFields()[fieldDefinition.metadata.fieldName]?.toString() ??
        fieldValue
      }
      displayAsRelativeDate={displayAsRelativeDate}
    />
  );
};
