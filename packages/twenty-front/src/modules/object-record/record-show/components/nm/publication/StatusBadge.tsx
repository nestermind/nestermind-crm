import styled from '@emotion/styled';

const StyledBadge = styled.div<{ status: string }>`
  align-items: center;
  background: ${({ theme, status }) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return theme.tag.background.gray;
      case 'published':
        return theme.tag.background.green;
      case 'scheduled':
        return theme.tag.background.blue;
      case 'archived':
        return theme.tag.background.gray;
      case 'rejected':
        return theme.tag.background.red;
      default:
        return theme.tag.background.gray;
    }
  }};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme, status }) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return theme.tag.text.gray;
      case 'published':
        return theme.tag.text.green;
      case 'scheduled':
        return theme.tag.text.blue;
      case 'archived':
        return theme.tag.text.gray;
      case 'rejected':
        return theme.tag.text.red;
      default:
        return theme.tag.text.gray;
    }
  }};
  width: fit-content;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
`;

enum Status {
  Draft = 'Draft',
  Published = 'Published',
  Scheduled = 'Scheduled',
  Archived = 'Archived',
  Rejected = 'Rejected',
}

type StatusBadgeProps = {
  status?: Status | null;
};

export const StatusBadge = ({ status = Status.Draft }: StatusBadgeProps) => {
  if (!status) {
    return null;
  }

  return <StyledBadge status={status}>{status.toUpperCase()}</StyledBadge>;
};
