import React, { ReactNode } from "react";
import { Helmet as HelmetLib } from "react-helmet-async";
// or import Head from next/head for Next.js

const DOMAIN = "test-seo-git-master-suskull.vercel.app";
const MAIN_KEYWORDS = "my website, tech, software, content";

const DEFAULT_IMAGE_CARD =
  "https://images.unsplash.com/photo-1519929125787-88a2485dc4f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
const DEFAULT_TITLE = "This is my website";
const DEFAULT_DESCRIPTION = "This is the description of my website";

const FAVICON_SOURCE = "test-seo-git-master-suskull.vercel.app/favicon.ico";

const POSTFIX_TITLE = " - My website";

type PropTypes = {
  title?: string;
  description?: string;
  link: string;
  keywords?: string;
  imageCard?: string;
  largeTwitterCard?: boolean;
  addPostfixTitle?: boolean;
  noIndex?: boolean;
  children?: ReactNode;
};

function Meta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  link,
  keywords = "",
  imageCard = DEFAULT_IMAGE_CARD,
  largeTwitterCard = false,
  addPostfixTitle = false,
  noIndex = false,
  children = null,
}: PropTypes) {
  let metaTitle: string;

  if (addPostfixTitle) {
    metaTitle = title + POSTFIX_TITLE;
  } else {
    metaTitle = title;
  }

  const metaDesc = description ?? DEFAULT_DESCRIPTION;
  const metaLink = DOMAIN + link;

  const metaKeywords = keywords.length
    ? MAIN_KEYWORDS + ", " + keywords
    : MAIN_KEYWORDS;

  let metaImageCard: string;

  if (imageCard) {
    if (imageCard.startsWith("https")) {
      metaImageCard = imageCard;
    } else {
      metaImageCard = DOMAIN + imageCard;
    }
  } else {
    metaImageCard = DEFAULT_IMAGE_CARD;
  }

  const metaRobots = noIndex ? "noindex, nofollow" : "index, follow";

  const twitterCardType = largeTwitterCard ? "summary_large_image" : "summary";

  return (
    <HelmetLib>
      <html lang="en" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaLink} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={metaRobots} />
      <link rel="icon" href={FAVICON_SOURCE} />

      {/* OG Tags */}
      {/* https://ogp.me/ */}
      <meta property="og:url" title={metaLink} />
      <meta property="og:title" title={metaTitle} />
      <meta property="og:description" title={metaDesc} />
      <meta property="og:type" content="..." />
      <meta property="og:image" content={metaImageCard} />

      {/* Twitter tags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
      <meta property="twitter:site" title="twitter username of website" />
      <meta property="twitter:title" title={metaTitle} />
      <meta property="twitter:description" title={metaDesc} />
      <meta
        property="twitter:creator"
        content="twitter username of webpage content"
      />
      <meta property="twitter:card" content={twitterCardType} />
      <meta property="twitter:image" content={metaImageCard} />

      {/* https://moz.com/blog/meta-referrer-tag */}
      <meta name="referrer" content="origin-when-crossorigin" />

      {children}
    </HelmetLib>
  );
}

export default Meta;
