import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';

export const isNonCreatable = (objectNameSingular: string) => {
  return objectNameSingular === CoreObjectNameSingular.Publication;
};
