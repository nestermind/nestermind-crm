import { SectionContent } from '@/record-edit/types/EditSectionTypes';

export const LOCATION_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Address Details',
    groups: [
      {
        fields: [{ name: 'address', type: 'input', fieldWidth: 0 }],
      },
    ],
  },
  {
    title: 'Key Distances',
    groups: [
      // TODO: Add distances
    ],
  },
  {
    title: 'Location Features',
    groups: [
      // TODO: Add features
    ],
  },
];
