import NextHead from "next/head";
import { string } from "prop-types";

const Head = props => (
  <NextHead>
    <meta charset="UTF-8" />
    <title>{props.title || "Deberes"}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes"></meta>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"></meta>
    <meta
      name="theme-color"
      content="#000000"
      media="(prefers-color-scheme: dark)"
    ></meta>
    <meta
      name="theme-color"
      content="#ffffff"
      media="(prefers-color-scheme: light)"
    ></meta>
    <link rel="manifest" href="/static/manifest.json" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
