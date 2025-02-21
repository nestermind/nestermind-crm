import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';

export const isPropertyOrPublication = (objectNameSingular: string) => {
  return (
    objectNameSingular === CoreObjectNameSingular.Property ||
    objectNameSingular === CoreObjectNameSingular.Publication
  );
};
