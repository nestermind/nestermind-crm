import { isNonEmptyString } from '@sniptt/guards';

import { CurrencyCode } from '@/object-record/record-field/types/CurrencyCode';
import { FieldCurrencyValue } from '@/object-record/record-field/types/FieldMetadata';
import { CurrencyInput } from '@/ui/field/input/components/CurrencyInput';

import { useCurrencyField } from '../../../hooks/useCurrencyField';

import { isFieldCurrencyValue } from '@/object-record/record-field/types/guards/isFieldCurrencyValue';
import { useRecordEdit } from '@/record-edit/contexts/RecordEditContext';
import { useCallback } from 'react';
import { convertCurrencyAmountToCurrencyMicros } from '~/utils/convertCurrencyToCurrencyMicros';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';
import {
    FieldInputClickOutsideEvent,
    FieldInputEvent,
} from '../DateTimeFieldInput';

type CurrencyFormInputProps = {
  onClickOutside?: FieldInputClickOutsideEvent;
  onEnter?: FieldInputEvent;
  onEscape?: FieldInputEvent;
  onTab?: FieldInputEvent;
  onShiftTab?: FieldInputEvent;
};

export const CurrencyFormInput = ({
  onEnter,
  onEscape,
  onClickOutside,
  onTab,
  onShiftTab,
}: CurrencyFormInputProps) => {
  const {
    hotkeyScope,
    draftValue,
    setDraftValue,
    defaultValue,
    fieldDefinition,
  } = useCurrencyField();

  const { updateField } = useRecordEdit();

  const defaultCurrencyCodeWithoutSQLQuotes = (
    defaultValue as FieldCurrencyValue
  ).currencyCode.replace(/'/g, '') as CurrencyCode;

  const defaultCurrencyCodeIsNotEmpty = isNonEmptyString(
    defaultCurrencyCodeWithoutSQLQuotes,
  );

  const draftCurrencyCode = draftValue?.currencyCode;

  const draftCurrencyCodeIsEmptyIsNotEmpty =
    isNonEmptyString(draftCurrencyCode);

  const currencyCode = draftCurrencyCodeIsEmptyIsNotEmpty
    ? draftCurrencyCode
    : defaultCurrencyCodeIsNotEmpty
      ? defaultCurrencyCodeWithoutSQLQuotes
      : CurrencyCode.USD;

  const fieldName = fieldDefinition?.metadata?.fieldName;

  const handleUpdateField = useCallback(
    (amountText: string) => {
      if (amountText === draftValue?.amount?.toString()) {
        return;
      }
      setDraftValue({
        amount: amountText,
        currencyCode,
      });
      const amount = parseFloat(amountText);

      const newCurrencyValue = {
        amountMicros: isNaN(amount)
          ? null
          : convertCurrencyAmountToCurrencyMicros(amount),
        currencyCode,
      };

      if (!isFieldCurrencyValue(newCurrencyValue)) {
        return;
      }
      updateField({
        fieldDefinition,
        fieldName,
        value: newCurrencyValue,
      });
    },
    [currencyCode, fieldDefinition, fieldName, updateField],
  );

  const handleEnter = (newValue: string) => {
    onEnter?.(() => {
      handleUpdateField(newValue);
    });
  };

  const handleEscape = (newValue: string) => {
    onEscape?.(() => {
      handleUpdateField(newValue);
    });
  };

  const handleClickOutside = (
    event: MouseEvent | TouchEvent,
    newValue: string,
  ) => {
    onClickOutside?.(() => {
      handleUpdateField(newValue);
    }, event);
  };

  const handleTab = (newValue: string) => {
    onTab?.(() => {
      handleUpdateField(newValue);
    });
  };

  const handleShiftTab = (newValue: string) => {
    onShiftTab?.(() => {
      handleUpdateField(newValue);
    });
  };

  const handleChange = (newValue: string) => {
    handleUpdateField(newValue);
  };

  const handleSelect = (newValue: string) => {
    setDraftValue({
      amount: isUndefinedOrNull(draftValue?.amount) ? '' : draftValue?.amount,
      currencyCode: newValue as CurrencyCode,
    });
    handleUpdateField(newValue);
  };

  return (
    <CurrencyInput
      value={draftValue?.amount?.toString() ?? ''}
      currencyCode={currencyCode}
      placeholder="Currency"
      onClickOutside={handleClickOutside}
      onEnter={handleEnter}
      onEscape={handleEscape}
      onShiftTab={handleShiftTab}
      onTab={handleTab}
      onChange={handleChange}
      onSelect={handleSelect}
      hotkeyScope={hotkeyScope}
    />
  );
};
