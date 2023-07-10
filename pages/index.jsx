import React, { useState, useContext, useEffect } from "react";
import Top from "/components/home/Top";
import About from "/components/home/About";
import Skill from "/components/home/Skill";
// import Contact from "/components/home/Contact";
import BackgroundCanvasParticle from "../components/background/BackgroundCanvasParticle";
import HomeEffect from "/components/home/HomeEffect";
import TransitionEffect from "../components/background/TransitionEffect";

import Motion from "/components/Motion";
import { Box, Flex } from "@chakra-ui/react";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence } from "framer-motion";
import { color } from "/styles/variable";

import ScrollComponentForTouchDeviceBySlide from "../components/scroll/ScrollComponentForTouchDeviceBySlide";

export const TransitionDirection = React.createContext();

const SideNav = ({ elements, index }) => {
  return (
    <Flex
      pos="absolute"
      right="0"
      top="50%"
      transform="translateY(-50%)"
      pointerEvents="none"
      flexDirection="column"
      alignItems="end"
      userSelect="none"
    >
      {elements.map((element, i) => {
        const style = { w: "2rem" };

        return <Box key={element + i} bg={color.darklight} w="1.2rem" h="0.08rem" my="0.3rem" {...(i === index && style)} transition="0.3s" />;
      })}
    </Flex>
  );
};

export default function Home(props) {
  // const elements = [<Top />, <About />, <Skill />, <Contact />];
  const elements = [<Top key="1" />, <About key="2" />, <Skill key="3" />];

  const [show, setShow] = useState(false);
  const [control, setControl] = useState(false);

  const [direction, setDirection] = useState(-1);

  const [whileTransition, setWhileTransition] = useState();

  const [loaded, setLoaded] = useState();

  function setIndex(num) {
    if (!control) return;
    const index = props.index + num;
    if (0 <= index && index < elements.length) {
      if (whileTransition) return;
      setWhileTransition(true);
      props.setIndex(index);

      setTimeout(() => {
        setWhileTransition(false);
      }, 2000);

      setDirection(num);
    }
  }

  function scroll(e) {
    const y = e.deltaY;
    const direc = y > 0 ? 1 : -1;
    setIndex(direc);
  }

  useEffect(() => {
    let showTimer;
    let controlTimer;

    if (props.firstRendering !== 0) {
      setShow(true);

      controlTimer = setTimeout(() => {
        setControl(true);
      }, 500);
      return;
    }

    showTimer = setTimeout(() => {
      setShow(true);
    }, 1500);
    controlTimer = setTimeout(() => {
      setControl(true);
    }, 2000);

    setLoaded(true);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(controlTimer);
    };
  }, []);

  return (
    <TransitionDirection.Provider value={{ direction }}>
      <HomeEffect firstRendering={props.firstRendering} setFirstRendering={props.setFirstRendering} index={props.index} loaded={loaded} />
      <TransitionEffect reverseEffect={true} firstRendering={props.firstRendering} />
      <BackgroundCanvasParticle />
      <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
        <Box onWheel={scroll} w="100%" h="100%" pos="fixed" top="0" onTouchStart={() => props.setTouchDevice(true)} style={{ touchAction: "none" }}>
          <Motion
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 40, mass: 0.5, delay: 0.2 }}
          >
            <Box pointerEvents={"none"}>
              <AnimatePresence exitBeforeEnter>
                {elements.map((element, index) => {
                  return (
                    props.index === index &&
                    show && (
                      <Slot show={props.index === index} key={index} touchDevice={props.touchDevice}>
                        {element}
                      </Slot>
                    )
                  );
                })}
              </AnimatePresence>
            </Box>
          </Motion>

          {props.touchDevice && <ScrollComponentForTouchDeviceBySlide setIndex={setIndex} index={props.index} indexLength={elements.length} />}
          <SideNav elements={elements} index={props.index} />
        </Box>
      </Motion>
    </TransitionDirection.Provider>
  );
}
