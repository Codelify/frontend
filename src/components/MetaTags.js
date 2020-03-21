// @flow
import React from "react";
import Helmet from "react-helmet";

type Props = {
  title?: string,
  description?: string,
  canonical?: string,
  keywords?: string,
  propertyOgLocale?: string,
  propertyOgType?: string,
  propertyOgTitle?: string,
  propertyOgDescription?: string,
  propertyOgUrl?: string,
  propertyOgSiteName?: string,
  propertyOgImage?: string,
  propertyOgImageWidth?: string,
  propertyOgImageHeight?: string,
  propertyTwitterCard?: string,
  twitterDescription?: string,
  propertyTwitterTitle?: string,
  propertyTwitterImage?: string,
  websiteVoice?: string,
};

const Metatags = ({
  title = "EMURGO | Building a Global Cardano as the Official Venture Arm",
  description = "",
  canonical = "",
  keywords = "",
  propertyOgLocale = "",
  propertyOgType = "",
  propertyOgTitle = "",
  propertyOgDescription = "",
  propertyOgUrl = "",
  propertyOgSiteName = "",
  propertyOgImage = "",
  propertyOgImageWidth = "",
  propertyOgImageHeight = "",
  propertyTwitterCard = "",
  twitterDescription = "",
  propertyTwitterTitle = "",
  propertyTwitterImage = "",
  websiteVoice = "",
}: Props) => (
  <Helmet>
    {/* Default tags (SEO) */}
    {title && <title>{title}</title>}
    {description && (
      <meta name="description" content={description} data-react-helmet="true" />
    )}
    {canonical && (
      <link rel="canonical" href={canonical} data-react-helmet="true" />
    )}
    {keywords && (
      <meta name="keywords" content={keywords} data-react-helmet="true" />
    )}
    {/* Facebook tags */}
    {propertyOgLocale && (
      <meta
        property="og:locale"
        content={propertyOgLocale}
        data-react-helmet="true"
      />
    )}
    {propertyOgType && (
      <meta
        property="og:type"
        content={propertyOgType}
        data-react-helmet="true"
      />
    )}
    {propertyOgTitle && (
      <meta
        property="og:title"
        content={propertyOgTitle}
        data-react-helmet="true"
      />
    )}
    {propertyOgDescription && (
      <meta
        property="og:description"
        content={propertyOgDescription}
        data-react-helmet="true"
      />
    )}
    {propertyOgUrl && (
      <meta
        property="og:title"
        content={propertyOgUrl}
        data-react-helmet="true"
      />
    )}
    {propertyOgSiteName && (
      <meta
        property="og:site_name"
        content={propertyOgSiteName}
        data-react-helmet="true"
      />
    )}
    {propertyOgImage && (
      <meta
        property="og:image"
        content={propertyOgImage}
        data-react-helmet="true"
      />
    )}
    {propertyOgImageWidth && (
      <meta
        property="og:image:width"
        content={propertyOgImageWidth}
        data-react-helmet="true"
      />
    )}
    {propertyOgImageHeight && (
      <meta
        property="og:image:height"
        content={propertyOgImageHeight}
        data-react-helmet="true"
      />
    )}
    {propertyTwitterCard && (
      <meta
        property="twitter:card"
        content={propertyTwitterCard}
        data-react-helmet="true"
      />
    )}
    {twitterDescription && (
      <meta
        property="twitter:description"
        content={twitterDescription}
        data-react-helmet="true"
      />
    )}
    {/* twitter tags */}
    {propertyTwitterTitle && (
      <meta
        property="twitter:title"
        content={propertyTwitterTitle}
        data-react-helmet="true"
      />
    )}
    {propertyTwitterImage && (
      <meta
        property="twitter:image"
        content={propertyTwitterImage}
        data-react-helmet="true"
      />
    )}
    {websiteVoice && (
      <script
        async
        src="https://widget.websitevoice.com/Nki29ebWnudHDIG908tchw"
      />
    )}
    {websiteVoice && (
      <script>
        {`window.wvData=window.wvData||{};function wvtag(a,b){wvData[a]=b;}
        wvtag('id', 'Nki29ebWnudHDIG908tchw');
        ${websiteVoice}`}
      </script>
    )}
  </Helmet>
);

export default Metatags;
