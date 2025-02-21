import { SectionContent } from '@/record-edit/types/EditSectionTypes';

export const DOCUMENTS_SECTION_CONTENT: SectionContent[] = [
  {
    title: 'Media',
    width: 'twoThirds',
    groups: [
      {
        fields: [{ name: 'pictures', type: 'field' }],
      },
      {
        fields: [{ name: 'movies', type: 'field' }],
      },
    ],
  },
  {
    title: 'External Links',
    width: 'third',
    groups: [
      {
        fields: [{ name: 'links', type: 'field' }],
      },
      {
        fields: [{ name: 'virtualTour', type: 'field' }],
      },
    ],
  },
];
