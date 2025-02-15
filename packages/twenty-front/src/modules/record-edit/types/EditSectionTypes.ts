import { IconComponent } from 'twenty-ui';

export type SectionFieldType = 'input' | 'multiLine' | 'field';

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

export type SectionContent = {
  title: string;
  groups: FieldGroup[];
};

export type Section = {
  id: string;
  title: string;
  content: SectionContent[];
  Icon?: IconComponent;
};
