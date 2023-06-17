import React, { useState, useContext, useEffect } from "react";
import Top from "/components/home/Top";
import About from "/components/home/About";
import Skill from "/components/home/Skill";
// import Contact from "/components/home/Contact";
import BackgroundCanvasParticle from "../components/BackgroundCanvasParticle";
import HomeEffect from "/components/home/HomeEffect";
import TransitionEffect from "../components/TransitionEffect";

import Motion from "/components/Motion";
import { Box, Flex } from "@chakra-ui/react";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence } from "framer-motion";
import { color } from "/styles/fontColor";
import BottomSmoke from "../components/home/BottomSmoke";

import { RootFontSizeContext } from "./_app";

export const TransitionDirection = React.createContext();

const SideNav = ({ elements, index }) => {
  return (
    <Flex pos="absolute" right="0" top="50%" transform="translateY(-50%)" pointerEvents="none" flexDirection="column" alignItems="end">
      {elements.map((element, i) => {
        const style = { w: "2rem" };

        return <Box key={element + i} bg={color.darklight} w="1.5rem" h="0.06rem" my="0.3rem" {...(i === index && style)} transition="0.3s" />;
      })}
    </Flex>
  );
};

export default function Home(props) {
  // const elements = [<Top />, <About />, <Skill />, <Contact />];
  const elements = [<Top />, <About />, <Skill />];

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

      <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
        <Box onWheel={scroll} w="100vw" h="100vh" pos="fixed" top="0" onTouchStart={() => props.setTouchDevice(true)}>
          <BackgroundCanvasParticle />

          <Motion
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            // exit={{ x: "-50%", opacity: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 40, mass: 0.5, delay: 0.2 }}
          >
            <Box>
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

          <BottomSmoke />
          {/* <ScrollComponentForTouchDevice setIndex={setIndex} index={props.index} indexLength={elements.length} /> */}
          <ScrollComponentForTouchDeviceBySlide />
          <SideNav elements={elements} index={props.index} />
        </Box>
      </Motion>
    </TransitionDirection.Provider>
  );
}

const ScrollComponentForTouchDeviceBySlide = () => {
  const rootFontSize = useContext(RootFontSizeContext);

  return (
    <Flex
      w="2rem"
      h="6rem"
      pos={"absolute"}
      bottom="20%"
      right="3rem"
      boxShadow={`0 0 1rem ${color.light}`}
      borderRadius="5rem"
      alignItems="center"
      justifyContent={"center"}
    >
      <Motion
        style={{
          width: "5rem",
          height: "5rem",
          borderRadius: 100,
          cursor: "grab",
        }}
        drag="y"
        dragDirectionLock
        dragConstraints={{ top: rootFontSize * -2, bottom: rootFontSize * 2 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
        dragElastic={0}
        dragSnapToOrigin={true}
        whileTap={{ cursor: "grabbing" }}
        onDragEnd={() => {}}
      >
        <Flex justifyContent="center" alignItems="center">
          <Box borderRadius="50%" w="1.5rem" h="1.5rem" bg={color.light}></Box>
        </Flex>
      </Motion>
    </Flex>
  );
};

const ScrollComponentForTouchDevice = (props) => {
  return (
    <Motion>
      <Flex pos="absolute" bottom="14%" right="1rem" columnGap={"1rem"}>
        <ScrollComponentForTouchDeviceOfCircle {...props} direction="up" />
        <ScrollComponentForTouchDeviceOfCircle {...props} direction="down" />
      </Flex>
    </Motion>
  );
};
const ScrollComponentForTouchDeviceOfCircle = ({ direction, setIndex, index, indexLength }) => {
  const isUp = direction === "up";
  const arrowIsShow = isUp ? !(index === 0) : !(index === indexLength - 1);

  const arrowIsShowAnimate = {
    opacity: 1,
    y: 0,
  };
  const arrowIsHideAnimate = {
    opacity: 0,
    y: isUp ? "1rem" : "-1rem",
  };
  return (
    <Motion initial={{ opacity: 0 }} animate={arrowIsShow ? { ...arrowIsShowAnimate } : { ...arrowIsHideAnimate }} end={{ opacity: 0 }}>
      <Flex
        alignItems="center"
        justifyContent="center"
        color={color.light}
        w="4rem"
        h="4rem"
        borderRadius="50%"
        onClick={() => setIndex(isUp ? -1 : 1)}
        style={{ writingMode: "vertical-rl" }}
      >
        {isUp ? "UP" : "DOWN"}

        {/* <Box
          bg={color.light}
          // color={color.light}
          h="70%"
          w="10%"
          clipPath={"polygon(100% 0, 100% 35%, 100% 100%, 50% 100%, 50% 40%, 0 40%);"}
          transform={`rotate(${isUp ? "0deg" : "180deg"})`}
        ></Box> */}
      </Flex>
    </Motion>
  );
};
