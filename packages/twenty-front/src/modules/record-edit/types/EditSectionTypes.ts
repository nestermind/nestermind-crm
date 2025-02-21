import { IconComponent } from 'twenty-ui';

export type SectionFieldType = 'input' | 'multiLine' | 'field' | 'custom';

export type FieldDefinition = {
  name: string;
  type: SectionFieldType;
  hideLabel?: boolean;
  fieldWidth?: number;
  // Conditionally render the field based on the value of another field
  conditionFields?: string[];
  conditionValues?: string[];
};

export type FieldGroup = {
  fields: FieldDefinition[];
  isHorizontal?: boolean;
};

export type EditSectionContentWidth =
  | number
  | 'full'
  | 'half'
  | 'third'
  | 'quarter'
  | 'twoThirds';

export type SectionContent = {
  title: string;
  groups: FieldGroup[];
  width?: EditSectionContentWidth;
};

export type Section = {
  id: string;
  title: string;
  content: SectionContent[];
  Icon?: IconComponent;
};
