import "../styles/globals.css";
import BackgroundCanvas from "/components/BackgroundCanvas";
import Nav from "/components/Nav";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { getRootFontSize } from "../js/getRootFontSize";

export const RootFontSizeContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [firstRendering, setFirstRendering] = useState(0);
  const [touchDevice, setTouchDevice] = useState(false);
  const [rootFontSize, setRootFontSize] = useState(14);

  //ルートフォントサイズを取得
  useEffect(() => {
    getAndSetRootFontSize();
    function getAndSetRootFontSize() {
      setRootFontSize(getRootFontSize());
    }

    addEventListener("resize", getAndSetRootFontSize);
    return () => {
      removeEventListener("resize", getAndSetRootFontSize);
    };
  }, []);

  useEffect(() => {
    const htmlEl = document.querySelector("html");

    if (router.asPath === "/") {
      htmlEl.style.overflow = "hidden";
      htmlEl.style.position = "fixed";
    }

    return () => {
      htmlEl.style.overflow = "auto";
      htmlEl.style.position = "relative";
    };
  }, [router.asPath]);

  return (
    <ChakraProvider>
      <RootFontSizeContext.Provider value={rootFontSize}>
        <BackgroundCanvas>
          <Nav setIndex={setIndex} />
          <AnimatePresence exitBeforeEnter>
            <Component
              {...pageProps}
              key={router.asPath}
              index={index}
              setIndex={setIndex}
              firstRendering={firstRendering}
              setFirstRendering={setFirstRendering}
              touchDevice={touchDevice}
              setTouchDevice={setTouchDevice}
            />
          </AnimatePresence>
        </BackgroundCanvas>
      </RootFontSizeContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
