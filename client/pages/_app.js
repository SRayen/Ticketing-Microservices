//This file will wrap the running file
//This file is Wrapper around the component that we're trying to show on the screen.

import "bootstrap/dist/css/bootstrap.css";

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
  }
