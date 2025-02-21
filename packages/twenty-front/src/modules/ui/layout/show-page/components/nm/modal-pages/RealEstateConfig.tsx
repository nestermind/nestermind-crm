import { TextAreaFormInput } from '@/ui/field/input/components/TextAreaFormInput';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Button, IconSparkles, Toggle } from 'twenty-ui';
import { Platform } from '../types/Platform';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const StyledSection = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledSectionTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StyledToggleRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StyledToggleLabel = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const StyledToggleDescription = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-left: ${({ theme }) => theme.spacing(6)};
  margin-top: ${({ theme }) => theme.spacing(-2)};
`;

const StyledAIButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

type RealEstateConfigProps = {
  platform: Platform;
  onPublish: () => void;
};

export const RealEstateConfig = ({
  platform,
  onPublish,
}: RealEstateConfigProps) => {
  const [listingSettings, setListingSettings] = useState({
    featured: false,
    urgentSale: false,
    exclusiveListing: false,
    openHouse: false,
    virtualTour: false,
  });

  const [marketingSettings, setMarketingSettings] = useState({
    automaticReposting: false,
    priceDropAlerts: false,
    similarListingsAlert: false,
  });

  const [additionalDescription, setAdditionalDescription] = useState('');

  return (
    <StyledContainer>
      <StyledTitle>Configure Listing Details</StyledTitle>

      <StyledSection>
        <StyledSectionTitle>Listing Visibility</StyledSectionTitle>
        <StyledToggleRow>
          <Toggle
            value={listingSettings.featured}
            onChange={() =>
              setListingSettings((prev) => ({
                ...prev,
                featured: !prev.featured,
              }))
            }
          />
          <StyledToggleLabel>Featured Listing</StyledToggleLabel>
        </StyledToggleRow>
        <StyledToggleDescription>
          Your property will appear at the top of search results and featured
          sections
        </StyledToggleDescription>

        <StyledToggleRow>
          <Toggle
            value={listingSettings.urgentSale}
            onChange={() =>
              setListingSettings((prev) => ({
                ...prev,
                urgentSale: !prev.urgentSale,
              }))
            }
          />
          <StyledToggleLabel>Urgent Sale</StyledToggleLabel>
        </StyledToggleRow>
        <StyledToggleDescription>
          Mark this property as an urgent sale to attract immediate attention
        </StyledToggleDescription>

        <StyledToggleRow>
          <Toggle
            value={listingSettings.exclusiveListing}
            onChange={() =>
              setListingSettings((prev) => ({
                ...prev,
                exclusiveListing: !prev.exclusiveListing,
              }))
            }
          />
          <StyledToggleLabel>Exclusive Listing</StyledToggleLabel>
        </StyledToggleRow>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Viewing Options</StyledSectionTitle>
        <StyledToggleRow>
          <Toggle
            value={listingSettings.openHouse}
            onChange={() =>
              setListingSettings((prev) => ({
                ...prev,
                openHouse: !prev.openHouse,
              }))
            }
          />
          <StyledToggleLabel>Enable Open House</StyledToggleLabel>
        </StyledToggleRow>

        <StyledToggleRow>
          <Toggle
            value={listingSettings.virtualTour}
            onChange={() =>
              setListingSettings((prev) => ({
                ...prev,
                virtualTour: !prev.virtualTour,
              }))
            }
          />
          <StyledToggleLabel>Include Virtual Tour</StyledToggleLabel>
        </StyledToggleRow>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Platform-Specific Description</StyledSectionTitle>
        <TextAreaFormInput
          value={additionalDescription}
          onChange={(newText) => setAdditionalDescription(newText)}
          placeholder="Add any additional information specific to this platform..."
          onEnter={() => {
            // AI description generation logic would go here
          }}
          onEscape={() => {
            // AI description generation logic would go here
          }}
          onClickOutside={() => {
            // AI description generation logic would go here
          }}
          hotkeyScope="real-estate-config"
        />
        <StyledAIButton
          title="Generate Optimized Description"
          Icon={IconSparkles}
          accent="purple"
          onClick={() => {
            // AI description generation logic would go here
          }}
        />
      </StyledSection>
    </StyledContainer>
  );
};
