import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TEXT_INPUT_STYLE } from 'twenty-ui';

import { LightCopyIconButton } from '@/object-record/record-field/components/LightCopyIconButton';
import { useRegisterInputEvents } from '@/object-record/record-field/meta-types/input/hooks/useRegisterInputEvents';
import { isDefined } from 'twenty-shared';
import { turnIntoEmptyStringIfWhitespacesOnly } from '~/utils/string/turnIntoEmptyStringIfWhitespacesOnly';

export type TextAreaFormInputProps = {
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  value: string;
  onEnter: (newText: string) => void;
  onEscape: (newText: string) => void;
  onTab?: (newText: string) => void;
  onShiftTab?: (newText: string) => void;
  onClickOutside: (event: MouseEvent | TouchEvent, inputValue: string) => void;
  hotkeyScope: string;
  onChange?: (newText: string) => void;
  maxRows?: number;
  copyButton?: boolean;
  maxWidth?: number;
  fullWidth?: boolean;
};

const StyledTextArea = styled(TextareaAutosize)<{
  maxWidth?: number;
  fullWidth?: boolean;
}>`
  ${TEXT_INPUT_STYLE}
  align-items: center;
  display: flex;
  justify-content: center;
  resize: none;
  max-height: 400px;
  width: ${(p) =>
    p.fullWidth
      ? '100%'
      : p.maxWidth
        ? `${p.maxWidth}px`
        : `calc(100% - ${p.theme.spacing(7)})`};
  line-height: 18px;
  padding: ${({ theme }) => theme.spacing(2)};

  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.sm};

  &:focus {
    ${({ theme }) => {
      return `
      border-color: ${theme.border.color.strong};
    `;
    }};
  }
`;

const StyledLightIconButtonContainer = styled.div`
  background: transparent;
  position: absolute;
  top: 16px;
  transform: translateY(-50%);
  right: 0;
`;

export const TextAreaFormInput = ({
  disabled,
  className,
  placeholder,
  autoFocus,
  value,
  hotkeyScope,
  onEnter,
  onEscape,
  onTab,
  onShiftTab,
  onClickOutside,
  onChange,
  maxRows,
  maxWidth,
  fullWidth,
  copyButton = true,
}: TextAreaFormInputProps) => {
  const [internalText, setInternalText] = useState(value);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const targetValue = turnIntoEmptyStringIfWhitespacesOnly(
      event.target.value,
    );
    setInternalText(targetValue);
    onChange?.(targetValue);
  };

  const wrapperRef = useRef<HTMLTextAreaElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDefined(wrapperRef.current)) {
      wrapperRef.current.setSelectionRange(
        wrapperRef.current.value.length,
        wrapperRef.current.value.length,
      );
    }
  }, []);

  useRegisterInputEvents({
    inputRef: wrapperRef,
    copyRef: copyRef,
    inputValue: internalText,
    onEnter,
    onEscape,
    onClickOutside,
    onTab,
    onShiftTab,
    hotkeyScope,
  });

  return (
    <>
      <StyledTextArea
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        ref={wrapperRef}
        onChange={handleChange}
        autoFocus={autoFocus}
        value={internalText}
        maxRows={maxRows}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      />
      {copyButton && (
        <StyledLightIconButtonContainer ref={copyRef}>
          <LightCopyIconButton copyText={internalText} />
        </StyledLightIconButtonContainer>
      )}
    </>
  );
};
