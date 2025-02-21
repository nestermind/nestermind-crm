import { useAttachments } from '@/activities/files/hooks/useAttachments';
import { useUploadAttachmentFile } from '@/activities/files/hooks/useUploadAttachmentFile';
import { ActivityTargetableObject } from '@/activities/types/ActivityTargetableEntity';
import { useTheme } from '@emotion/react';
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import styled from '@emotion/styled';
import {
  IconPhoto,
  IconUpload,
  LARGE_DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from 'twenty-ui';

type ShowPageImageBannerProps = {
  targetableObject: ActivityTargetableObject;
};

const SECONDARY_IMAGES_WIDTH_PERCENT = 40;
const IMAGE_HEIGHT_LARGE_DESKTOP = 400;
const IMAGE_HEIGHT = 230;
const IMAGE_HEIGHT_MOBILE = 190;

const StyledFirstImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const StyledPhotoIconContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background.secondary};
`;

const StyledSecondImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const StyledInnerFirstImageContainer = styled.div<{ isSingleImage?: boolean }>`
  display: flex;
  height: 100%;
  width: ${({ isSingleImage }) =>
    isSingleImage ? '100%' : `${100 - SECONDARY_IMAGES_WIDTH_PERCENT}%`};

  @media only screen and (max-width: ${MOBILE_VIEWPORT}px) {
    width: 100%;
  }
`;

const StyledInnerSecondaryImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${SECONDARY_IMAGES_WIDTH_PERCENT}%;

  @media only screen and (max-width: ${MOBILE_VIEWPORT}px) {
    display: none;
  }
`;

const StyledSecondImageContainer = styled.div<{ isFullHeight?: boolean }>`
  height: ${({ isFullHeight }) => (isFullHeight ? '100%' : '50%')};
  width: 100%;
`;

const StyledImageContainer = styled.div`
  display: flex;
  height: ${IMAGE_HEIGHT}px;
  width: 100%;

  @media only screen and (max-width: ${MOBILE_VIEWPORT}px) {
    height: ${IMAGE_HEIGHT_MOBILE}px;
  }
  @media only screen and (min-width: ${LARGE_DESKTOP_VIEWPORT}px) {
    height: ${IMAGE_HEIGHT_LARGE_DESKTOP}px;
  }
`;

const StyledDropZoneContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
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

export const ShowPageImageBanner = ({
  targetableObject,
}: ShowPageImageBannerProps) => {
  const theme = useTheme();
  const { uploadAttachmentFile } = useUploadAttachmentFile();
  const { attachments = [] } = useAttachments(targetableObject);
  const [isUploading, setIsUploading] = useState(false);

  const images = useMemo(
    () => attachments.filter((attachment) => attachment.type === 'Image'),
    [attachments],
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      try {
        await Promise.all(
          acceptedFiles.map((file) =>
            uploadAttachmentFile(file, targetableObject),
          ),
        );
      } catch (error) {
        console.error('Error uploading images:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadAttachmentFile, targetableObject],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    multiple: true,
  });

  return (
    <div style={{ position: 'relative' }}>
      <StyledImageContainer
        onClick={getRootProps().onClick}
        onKeyDown={getRootProps().onKeyDown}
        onFocus={getRootProps().onFocus}
        onBlur={getRootProps().onBlur}
        onDragEnter={getRootProps().onDragEnter}
        onDragOver={getRootProps().onDragOver}
        onDragLeave={getRootProps().onDragLeave}
        onDrop={getRootProps().onDrop}
        role="presentation"
        style={{ cursor: 'pointer' }}
      >
        <input
          type="file"
          onChange={getInputProps().onChange}
          onFocus={getInputProps().onFocus}
          onBlur={getInputProps().onBlur}
          accept={getInputProps().accept}
          multiple={getInputProps().multiple}
          style={{ display: 'none' }}
        />
        {images[0] ? (
          <StyledInnerFirstImageContainer isSingleImage={images.length === 1}>
            <StyledFirstImage src={images[0].fullPath} alt="Property" />
          </StyledInnerFirstImageContainer>
        ) : (
          <StyledPhotoIconContainer>
            {isDragActive || isUploading ? (
              <StyledDropZoneContent>
                <IconUpload size={40} color={theme.color.gray50} />
                <StyledUploadTitle>
                  {isUploading ? 'Uploading...' : 'Drop images here'}
                </StyledUploadTitle>
                <StyledUploadSubTitle>
                  {isUploading
                    ? 'Please wait while we process your images'
                    : 'PNG, JPG, GIF up to 10MB'}
                </StyledUploadSubTitle>
              </StyledDropZoneContent>
            ) : (
              <StyledDropZoneContent>
                <IconPhoto size={40} color={theme.color.gray50} />
                <StyledUploadTitle>Add images</StyledUploadTitle>
                <StyledUploadSubTitle>
                  Drop images here or click to browse
                </StyledUploadSubTitle>
              </StyledDropZoneContent>
            )}
          </StyledPhotoIconContainer>
        )}
        {images.length > 1 && (
          <StyledInnerSecondaryImageContainer>
            {images[1] && (
              <StyledSecondImageContainer isFullHeight={images.length === 2}>
                <StyledSecondImage src={images[1].fullPath} alt="Property" />
              </StyledSecondImageContainer>
            )}
            {images[2] && (
              <StyledSecondImageContainer>
                <StyledSecondImage src={images[2].fullPath} alt="Property" />
              </StyledSecondImageContainer>
            )}
          </StyledInnerSecondaryImageContainer>
        )}
      </StyledImageContainer>
    </div>
  );
};
