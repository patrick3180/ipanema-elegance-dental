import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GTMManagerProps {
  gtmId?: string;
}

export const GTMManager: React.FC<GTMManagerProps> = ({ gtmId = "GTM-WZRDNBKQ" }) => {
  console.debug('GTMManager: Initializing with GTM ID:', gtmId);

  const gtmScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;

  const noscriptContent = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

  return (
    <>
      <Helmet>
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </Helmet>
      <noscript dangerouslySetInnerHTML={{ __html: noscriptContent }} />
    </>
  );
};