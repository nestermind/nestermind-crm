import { useContext } from 'react';

import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { FieldFocusContextProvider } from '@/object-record/record-field/contexts/FieldFocusContextProvider';
import { FieldInputEvent } from '@/object-record/record-field/types/FieldInputEvent';

import { useIsFieldValueReadOnly } from '@/object-record/record-field/hooks/useIsFieldValueReadOnly';
import { FieldInputClickOutsideEvent } from '@/object-record/record-field/meta-types/input/components/DateTimeFieldInput';

import { useInlineCell } from '@/object-record/record-inline-cell/hooks/useInlineCell';
import { getDropdownFocusIdForRecordField } from '@/object-record/utils/getDropdownFocusIdForRecordField';
import { getRecordFieldInputId } from '@/object-record/utils/getRecordFieldInputId';
import { activeDropdownFocusIdState } from '@/ui/layout/dropdown/states/activeDropdownFocusIdState';
import { useRecoilCallback } from 'recoil';

import { FormInput } from '@/object-record/record-field/components/nm/FormInput';
import { RecordInlineCellSkeletonLoader } from '@/object-record/record-inline-cell/components/RecordInlineCellSkeletonLoader';
type RecordFormEntryProps = {
  readonly?: boolean;
  loading?: boolean;
};

export const RecordFormEntry = ({ loading }: RecordFormEntryProps) => {
  const { fieldDefinition, recordId } = useContext(FieldContext);

  const isFieldReadOnly = useIsFieldValueReadOnly();

  const { closeInlineCell } = useInlineCell();

  const handleEnter: FieldInputEvent = (persistField) => {
    persistField();
    closeInlineCell();
  };

  const handleSubmit: FieldInputEvent = (persistField) => {
    persistField();
    closeInlineCell();
  };

  const handleCancel = () => {
    closeInlineCell();
  };

  const handleEscape = () => {
    closeInlineCell();
  };

  const handleTab: FieldInputEvent = (persistField) => {
    persistField();
    closeInlineCell();
  };

  const handleShiftTab: FieldInputEvent = (persistField) => {
    persistField();
    closeInlineCell();
  };

  const handleClickOutside: FieldInputClickOutsideEvent = useRecoilCallback(
    ({ snapshot }) =>
      (persistField, event) => {
        const recordFieldDropdownId = getDropdownFocusIdForRecordField(
          recordId,
          fieldDefinition.fieldMetadataId,
          'inline-cell',
        );

        const activeDropdownFocusId = snapshot
          .getLoadable(activeDropdownFocusIdState)
          .getValue();

        if (recordFieldDropdownId !== activeDropdownFocusId) {
          return;
        }

        event.stopImmediatePropagation();

        persistField();
        closeInlineCell();
      },
    [closeInlineCell, fieldDefinition.fieldMetadataId, recordId],
  );

  if (loading === true) {
    <RecordInlineCellSkeletonLoader />;
  }

  return (
    <FieldFocusContextProvider>
      <FormInput
        recordFieldInputdId={getRecordFieldInputId(
          recordId,
          fieldDefinition?.metadata?.fieldName,
        )}
        onEnter={handleEnter}
        onCancel={handleCancel}
        onEscape={handleEscape}
        onSubmit={handleSubmit}
        onTab={handleTab}
        onShiftTab={handleShiftTab}
        onClickOutside={handleClickOutside}
        isReadOnly={isFieldReadOnly}
      />
    </FieldFocusContextProvider>
  );
};
