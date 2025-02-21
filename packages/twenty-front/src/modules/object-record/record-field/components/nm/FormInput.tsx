import { useContext } from 'react';

import { BooleanFieldInput } from '@/object-record/record-field/meta-types/input/components/BooleanFieldInput';
import { EmailsFieldInput } from '@/object-record/record-field/meta-types/input/components/EmailsFieldInput';
import { FullNameFieldInput } from '@/object-record/record-field/meta-types/input/components/FullNameFieldInput';
import { LinksFieldInput } from '@/object-record/record-field/meta-types/input/components/LinksFieldInput';
import { PhonesFieldInput } from '@/object-record/record-field/meta-types/input/components/PhonesFieldInput';
import { RatingFieldInput } from '@/object-record/record-field/meta-types/input/components/RatingFieldInput';
import { RawJsonFieldInput } from '@/object-record/record-field/meta-types/input/components/RawJsonFieldInput';
import { RelationFromManyFieldInput } from '@/object-record/record-field/meta-types/input/components/RelationFromManyFieldInput';
import { RelationToOneFieldInput } from '@/object-record/record-field/meta-types/input/components/RelationToOneFieldInput';
import { TextFormInput } from '@/object-record/record-field/meta-types/input/components/nm/TextFormInput';

import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { AddressFormInput } from '@/object-record/record-field/meta-types/input/components/nm/AddressFormInput';
import { CurrencyFormInput } from '@/object-record/record-field/meta-types/input/components/nm/CurrencyFormInput';
import { DateFormInput } from '@/object-record/record-field/meta-types/input/components/nm/DateFormInput';
import { DateTimeFormInput } from '@/object-record/record-field/meta-types/input/components/nm/DateTimeFormInput';
import { MultiSelectFormInput } from '@/object-record/record-field/meta-types/input/components/nm/MultiSelectFormInput';
import { NumberFormInput } from '@/object-record/record-field/meta-types/input/components/nm/NumberFormInput';
import { SelectFormInput } from '@/object-record/record-field/meta-types/input/components/nm/SelectFormInput';
import { RecordFieldInputScope } from '@/object-record/record-field/scopes/RecordFieldInputScope';
import { FieldInputEvent } from '@/object-record/record-field/types/FieldInputEvent';
import { isFieldAddress } from '@/object-record/record-field/types/guards/isFieldAddress';
import { isFieldBoolean } from '@/object-record/record-field/types/guards/isFieldBoolean';
import { isFieldCurrency } from '@/object-record/record-field/types/guards/isFieldCurrency';
import { isFieldDate } from '@/object-record/record-field/types/guards/isFieldDate';
import { isFieldDateTime } from '@/object-record/record-field/types/guards/isFieldDateTime';
import { isFieldEmails } from '@/object-record/record-field/types/guards/isFieldEmails';
import { isFieldFullName } from '@/object-record/record-field/types/guards/isFieldFullName';
import { isFieldLinks } from '@/object-record/record-field/types/guards/isFieldLinks';
import { isFieldMultiSelect } from '@/object-record/record-field/types/guards/isFieldMultiSelect';
import { isFieldNumber } from '@/object-record/record-field/types/guards/isFieldNumber';
import { isFieldPhones } from '@/object-record/record-field/types/guards/isFieldPhones';
import { isFieldRating } from '@/object-record/record-field/types/guards/isFieldRating';
import { isFieldRawJson } from '@/object-record/record-field/types/guards/isFieldRawJson';
import { isFieldRelationFromManyObjects } from '@/object-record/record-field/types/guards/isFieldRelationFromManyObjects';
import { isFieldRelationToOneObject } from '@/object-record/record-field/types/guards/isFieldRelationToOneObject';
import { isFieldSelect } from '@/object-record/record-field/types/guards/isFieldSelect';
import { isFieldText } from '@/object-record/record-field/types/guards/isFieldText';
import { getScopeIdFromComponentId } from '@/ui/utilities/recoil-scope/utils/getScopeIdFromComponentId';
import { useIcons } from 'twenty-ui';

type FormInputProps = {
  recordFieldInputdId: string;
  onSubmit?: FieldInputEvent;
  onCancel?: () => void;
  onClickOutside?: (
    persist: () => void,
    event: MouseEvent | TouchEvent,
  ) => void;
  onEnter?: FieldInputEvent;
  onEscape?: FieldInputEvent;
  onTab?: FieldInputEvent;
  onShiftTab?: FieldInputEvent;
  isReadOnly?: boolean;
};

export const FormInput = ({
  recordFieldInputdId,
  onCancel,
  onSubmit,
  onEnter,
  onEscape,
  onShiftTab,
  onTab,
  onClickOutside,
  isReadOnly,
}: FormInputProps) => {
  const { fieldDefinition, maxWidth } = useContext(FieldContext);
  const { getIcon } = useIcons();
  const Icon = fieldDefinition.iconName
    ? getIcon(fieldDefinition.iconName)
    : undefined;

  return (
    <RecordFieldInputScope
      recordFieldInputScopeId={getScopeIdFromComponentId(recordFieldInputdId)}
    >
      {isFieldRelationToOneObject(fieldDefinition) ? (
        <RelationToOneFieldInput onSubmit={onSubmit} onCancel={onCancel} />
      ) : isFieldRelationFromManyObjects(fieldDefinition) ? (
        <RelationFromManyFieldInput onSubmit={onSubmit} />
      ) : isFieldPhones(fieldDefinition) ? (
        <PhonesFieldInput
          onCancel={onCancel}
          onClickOutside={(event) => onClickOutside?.(() => {}, event)}
        />
      ) : isFieldText(fieldDefinition) ? (
        <TextFormInput
          Icon={Icon}
          onEnter={onEnter}
          onEscape={onEscape}
          onClickOutside={onClickOutside}
          onTab={onTab}
          onShiftTab={onShiftTab}
        />
      ) : isFieldEmails(fieldDefinition) ? (
        <EmailsFieldInput
          onCancel={onCancel}
          onClickOutside={(event) => onClickOutside?.(() => {}, event)}
        />
      ) : isFieldFullName(fieldDefinition) ? (
        <FullNameFieldInput
          onEnter={onEnter}
          onEscape={onEscape}
          onClickOutside={onClickOutside}
          onTab={onTab}
          onShiftTab={onShiftTab}
        />
      ) : isFieldDateTime(fieldDefinition) ? (
        <DateTimeFormInput
          onEnter={onEnter}
          onEscape={onEscape}
          onClickOutside={onClickOutside}
          onClear={onSubmit}
          onSubmit={onSubmit}
        />
      ) : isFieldDate(fieldDefinition) ? (
        <DateFormInput
          onEnter={onEnter}
          onEscape={onEscape}
          onClickOutside={onClickOutside}
          onClear={onSubmit}
          onSubmit={onSubmit}
        />
      ) : isFieldNumber(fieldDefinition) ? (
        <NumberFormInput icon={Icon} />
      ) : isFieldLinks(fieldDefinition) ? (
        <LinksFieldInput
          onCancel={onCancel}
          onClickOutside={(event) => onClickOutside?.(() => {}, event)}
        />
      ) : isFieldCurrency(fieldDefinition) ? (
        <CurrencyFormInput
          maxWidth={maxWidth}
          onEnter={onEnter}
          onEscape={onEscape}
          onClickOutside={onClickOutside}
          onTab={onTab}
          onShiftTab={onShiftTab}
        />
      ) : isFieldBoolean(fieldDefinition) ? (
        <BooleanFieldInput onSubmit={onSubmit} readonly={isReadOnly} />
      ) : isFieldRating(fieldDefinition) ? (
        <RatingFieldInput onSubmit={onSubmit} />
      ) : isFieldSelect(fieldDefinition) ? (
        <SelectFormInput onSubmit={onSubmit} onCancel={onCancel} />
      ) : isFieldMultiSelect(fieldDefinition) ? (
        <MultiSelectFormInput onCancel={onCancel} />
      ) : isFieldAddress(fieldDefinition) ? (
        <AddressFormInput
          onEnter={onEnter}
          onEscape={onEscape}
          onClickOutside={onClickOutside}
          onTab={onTab}
          onShiftTab={onShiftTab}
        />
      ) : isFieldRawJson(fieldDefinition) ? (
        <RawJsonFieldInput
          onEnter={onEnter}
          onEscape={onEscape}
          onClickOutside={onClickOutside}
          onTab={onTab}
          onShiftTab={onShiftTab}
        />
      ) : null}
    </RecordFieldInputScope>
  );
};
