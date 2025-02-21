import styled from '@emotion/styled';
import { IconPhoto } from 'twenty-ui';

const StyledDropZone = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.tertiary};
  border: 2px dashed ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  justify-content: center;
  min-height: 200px;
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  max-width: 600px;
  cursor: pointer;
`;

const StyledDropZoneContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  justify-content: center;
  pointer-events: none;
`;

const StyledUploadTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StyledUploadSubTitle = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.md};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(12)};
`;

const StyledPlatformSelectionTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledPlatformSelectionSubtitle = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.md};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  text-align: center;
`;

type UploadAssetsProps = {
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
};

export const UploadAssets = ({
  getRootProps,
  getInputProps,
  isDragActive,
}: UploadAssetsProps) => {
  return (
    <StyledContainer>
      <StyledPlatformSelectionTitle>
        Upload your images
      </StyledPlatformSelectionTitle>
      <StyledPlatformSelectionSubtitle>
        Start by uploading the property images you want to use in your post
      </StyledPlatformSelectionSubtitle>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <StyledDropZone {...getRootProps()}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        <StyledDropZoneContent>
          <IconPhoto size={32} />
          <StyledUploadTitle>
            {isDragActive ? 'Drop images here' : 'Upload images'}
          </StyledUploadTitle>
          <StyledUploadSubTitle>
            {isDragActive
              ? 'Drop your images to start'
              : 'Drag and drop your images here, or click to browse'}
          </StyledUploadSubTitle>
        </StyledDropZoneContent>
      </StyledDropZone>
    </StyledContainer>
  );
};
