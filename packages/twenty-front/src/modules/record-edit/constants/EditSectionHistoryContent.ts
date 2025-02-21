import { SectionContent } from '@/record-edit/types/EditSectionTypes';

export const HISTORY_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Creation Information',
    groups: [
      {
        isHorizontal: true,
        fields: [
          { name: 'createdBy', type: 'field' },
          { name: 'creationDate', type: 'field' },
        ],
      },
    ],
  },
  {
    title: 'Last Update',
    groups: [
      {
        isHorizontal: true,
        fields: [{ name: 'lastUpdate', type: 'field' }],
      },
    ],
  },
  {
    title: 'Reference Information',
    groups: [
      {
        isHorizontal: true,
        fields: [{ name: 'refProperty', type: 'input', fieldWidth: 160 }],
      },
    ],
  },
  {
    title: 'Status',
    groups: [
      {
        isHorizontal: true,
        fields: [{ name: 'deletedAt', type: 'field' }],
      },
    ],
  },
];
