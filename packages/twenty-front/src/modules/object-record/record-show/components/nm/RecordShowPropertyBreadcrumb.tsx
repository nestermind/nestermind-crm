import { FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { getLinkToShowPage } from '@/object-metadata/utils/getLinkToShowPage';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { NavigationDrawerCollapseButton } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerCollapseButton';
import { isNavigationDrawerExpandedState } from '@/ui/navigation/states/isNavigationDrawerExpanded';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { capitalize } from 'twenty-shared';
import {
  IconChevronLeft,
  IconX,
  LightIconButton,
  useIsMobile,
} from 'twenty-ui';

const StyledBreadcrumbContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  flex: 1;
`;

const StyledBreadcrumbItem = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(0.75)};
`;

const StyledTopBarButtonContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledBreadcrumbText = styled.div<{ isLast?: boolean }>`
  color: ${({ theme, isLast }) =>
    isLast ? theme.font.color.primary : theme.font.color.tertiary};
  font-weight: ${({ isLast, theme }) =>
    isLast ? theme.font.weight.medium : theme.font.weight.regular};
`;

const StyledPropertyTitleBase = styled.div`
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledPropertyTitleLink = styled(
  StyledPropertyTitleBase.withComponent(Link),
)`
  color: ${({ theme }) => theme.font.color.tertiary};
  text-decoration: none;
  transition: color 150ms ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.font.color.secondary};
  }
`;

const StyledPropertyTitleText = styled(StyledPropertyTitleBase)`
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StyledSeparator = styled.span`
  color: ${({ theme }) => theme.font.color.tertiary};
`;

type RecordShowPropertyBreadcrumbProps = {
  objectNameSingular: string;
  objectRecordId: string;
  objectLabelPlural: string;
  labelIdentifierFieldMetadataItem?: FieldMetadataItem;
  showBackButton?: boolean;
  suffix?: string;
  handleCloseClick?: () => void;
};

export const RecordShowPropertyBreadcrumb = ({
  objectNameSingular,
  objectRecordId,
  objectLabelPlural,
  labelIdentifierFieldMetadataItem,
  showBackButton = true,
  handleCloseClick,
  suffix,
}: RecordShowPropertyBreadcrumbProps) => {
  const { record, loading } = useFindOneRecord({
    objectNameSingular,
    objectRecordId,
    recordGqlFields: {
      [labelIdentifierFieldMetadataItem?.name ?? 'name']: true,
    },
  });
  const isMobile = useIsMobile();

  const isNavigationDrawerExpanded = useRecoilValue(
    isNavigationDrawerExpandedState,
  );

  if (loading) {
    return null;
  }

  return (
    <StyledBreadcrumbContainer>
      {!isMobile && !isNavigationDrawerExpanded && (
        <StyledTopBarButtonContainer>
          <NavigationDrawerCollapseButton direction="right" />
        </StyledTopBarButtonContainer>
      )}
      {showBackButton &&
        (suffix ? (
          <Link
            to={
              record
                ? getLinkToShowPage(objectNameSingular, { id: objectRecordId })
                : `/object/${objectNameSingular}/${objectRecordId}`
            }
          >
            <LightIconButton
              Icon={IconChevronLeft}
              size="small"
              accent="tertiary"
            />
          </Link>
        ) : (
          <LightIconButton
            Icon={IconX}
            size="small"
            accent="tertiary"
            onClick={handleCloseClick}
          />
        ))}
      <StyledBreadcrumbItem>
        <StyledBreadcrumbText>
          {capitalize(objectLabelPlural)}
        </StyledBreadcrumbText>
        <StyledSeparator>/</StyledSeparator>
        {suffix ? (
          <StyledPropertyTitleLink
            to={
              record
                ? getLinkToShowPage(objectNameSingular, { id: objectRecordId })
                : `/object/${objectNameSingular}/${objectRecordId}`
            }
          >
            {typeof record?.name === 'string'
              ? record?.name
              : record?.name
                ? Object.values(record.name)[0]?.toString()
                : ''}
          </StyledPropertyTitleLink>
        ) : (
          <StyledPropertyTitleText>
            {typeof record?.name === 'string'
              ? record?.name
              : record?.name && record?.name.__typename === 'FullName'
                ? `${record.name.firstName} ${record.name.lastName}`
                : ''}
          </StyledPropertyTitleText>
        )}
        {suffix && (
          <>
            <StyledSeparator>/</StyledSeparator>
            <StyledBreadcrumbText isLast>{suffix}</StyledBreadcrumbText>
          </>
        )}
      </StyledBreadcrumbItem>
    </StyledBreadcrumbContainer>
  );
};
