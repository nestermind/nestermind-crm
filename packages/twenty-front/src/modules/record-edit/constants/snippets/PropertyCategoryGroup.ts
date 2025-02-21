import { FieldGroup } from '@/record-edit/types/EditSectionTypes';

export const PropertyCategoryGroup: FieldGroup = {
  isHorizontal: true,
  fields: [
    { name: 'category', type: 'field' },
    {
      name: 'apartmentSubtype',
      type: 'field',
      conditionFields: ['category'],
      conditionValues: ['apartment'],
    },
    {
      name: 'houseSubtype',
      type: 'field',
      conditionFields: ['category'],
      conditionValues: ['house'],
    },
    {
      name: 'plotSubtype',
      type: 'field',
      conditionFields: ['category'],
      conditionValues: ['plot'],
    },
    {
      name: 'propertySubtype',
      type: 'field',
      conditionFields: ['category'],
      conditionValues: ['property'],
    },
    {
      name: 'gastronomySubtype',
      type: 'field',
      conditionFields: ['category'],
      conditionValues: ['gastronomy'],
    },
    {
      name: 'industrialSubtype',
      type: 'field',
      conditionFields: ['category'],
      conditionValues: ['industrial'],
    },
  ],
};
