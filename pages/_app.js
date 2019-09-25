import React from "react";
import App from "next/app";

import { FirebaseAppProvider, config } from "../firebase";
import { UserProvider } from "../context/userContext";
import "../static/css/style.css";

const firebaseConfig = {
  apiKey: "AIzaSyAqKW7bz7PVbCtwmoMH29nTzmoNuyARSVk",
  authDomain: "deeds-ebe13.firebaseapp.com",
  databaseURL: "https://deeds-ebe13.firebaseio.com",
  projectId: "deeds-ebe13",
  storageBucket: "deeds-ebe13.appspot.com",
  messagingSenderId: "1042431422779",
  appId: "1:1042431422779:web:b9ef62eed06fe27cd5071e"
};

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <FirebaseAppProvider firebaseConfig={config}>
        <Component {...pageProps} />
      </FirebaseAppProvider>
    );
  }
}

export default MyApp;
