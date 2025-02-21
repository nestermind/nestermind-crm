import { contextStoreCurrentViewIdComponentState } from '@/context-store/states/contextStoreCurrentViewIdComponentState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { isPropertyOrPublication } from '@/object-metadata/utils/isPropertyOrPublication';
import { AppPath } from '@/types/AppPath';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { getAppPath } from '~/utils/navigation/getAppPath';

export const useHandleIndexIdentifierClick = ({
  objectMetadataItem,
  recordIndexId,
}: {
  recordIndexId: string;
  objectMetadataItem: ObjectMetadataItem;
}) => {
  const currentViewId = useRecoilComponentValueV2(
    contextStoreCurrentViewIdComponentState,
    recordIndexId,
  );

  const indexIdentifierUrl = (recordId: string) => {
    if (isPropertyOrPublication(objectMetadataItem.nameSingular)) {
      return getAppPath(
        objectMetadataItem.nameSingular === CoreObjectNameSingular.Property
          ? AppPath.RecordShowPropertyPage
          : AppPath.RecordShowPublicationPage,
        {
          objectRecordId: recordId,
        },
        {
          viewId: currentViewId,
        },
      );
    }
    return getAppPath(
      AppPath.RecordShowPage,
      {
        objectNameSingular: objectMetadataItem.nameSingular,
        objectRecordId: recordId,
      },
      {
        viewId: currentViewId,
      },
    );
  };

  return { indexIdentifierUrl };
};
