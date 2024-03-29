import React, { useState, useEffect, memo } from "react";

import { Flex, Box, Text } from "@chakra-ui/react";
import Motion from "./Motion";
import { AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { color } from "/styles/variable";
import { useRouter } from "next/router";
import { textEffect } from "/lib/textEffect";

const Square = ({ delay }) => {
  const transition = { transition: { duration: 0.6, delay: 1.2, times: [0, 0, 0.5, 1] } };
  return (
    <Motion initial={{ opacity: 0, x: "-1rem" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: delay + 1 }}>
      <Box pos="relative" ml="1rem" h="1rem" w="1rem">
        <Motion animate={{ left: ["25%", "25%", "0%"], top: ["25%", "0%", "0%"] }} {...transition}>
          <Box pos="relative" h="75%" w="75%" bg={color.darklight} />
        </Motion>
        <Motion animate={{ left: ["0%", "0%", "25%"], top: ["0%", "25%", "25%"] }} {...transition}>
          <Box pos="absolute" h="75%" w="75%" bg={color.darklight} right="0" bottom="0" />
        </Motion>
      </Box>
    </Motion>
  );
};

const NavLink = memo(({ text, link, i, links, closeMenu, setIndex }) => {
  const linkPath = link !== "/" ? "/" + link : link;
  const current = useRouter()?.asPath === linkPath;

  const delay = i * 0.1;

  const [word, setWord] = useState("");
  function setText(_, key) {
    setWord(key);
  }
  useEffect(() => {
    setTimeout(() => {
      textEffect(text, setText);
    }, 500 + i * 100);
  }, []);

  return (
    <Flex as="li" justifyContent={"center"} {...(i === 0 && { mt: "10rem" })}>
      <NextLink href={link}>
        <a
          style={{ width: "100%" }}
          onClick={() => {
            setIndex(i);
          }}
        >
          <Flex
            justifyContent="start"
            alignItems={"center"}
            padding="1rem 0"
            w="100%"
            onClick={closeMenu}
            onMouseEnter={() => !current && textEffect(text, setText)}
          >
            <Motion
              initial={{ transform: "translateX(-100%)" }}
              animate={{ transform: "translateX(0%)", transition: { duration: 1, delay: delay + 0.2 } }}
              exit={{
                transform: "translateX(-100%)",
                transition: { duration: 1, delay: links.length / 10 - delay },
              }}
            >
              <Box w={current ? "35%" : "40%"} height="0.06rem" bg={color.darklight} mr="1rem" transition="width 0.3s" />
            </Motion>
            <Motion
              initial={{ transform: "translateX(-5rem)" }}
              animate={{ transform: "translateX(0rem)", transition: { duration: 1, delay: delay + 0.2 } }}
              exit={{
                transform: "translateX(-5rem)",
                transition: { duration: 1, delay: links.length / 10 - delay },
              }}
            >
              <Text color={current ? color.darklight : color.secondary} transition="color 0.3s">
                {word}
              </Text>
            </Motion>
            {current && <Square delay={delay} />}
          </Flex>
        </a>
      </NextLink>
    </Flex>
  );
});

const Nav = (props) => {
  const [menuShow, setMenuShow] = useState(false);
  function toggleMenu() {
    setMenuShow((prev) => !prev);
  }
  function closeMenu() {
    setMenuShow(false);
  }
  const [text, setText] = useState({
    MENU: "MENU",
    CLOSE: "CLOSE",
  });

  function setTextWord(key, word) {
    setText((prev) => {
      return { ...prev, [key]: word };
    });
  }

  useEffect(() => {
    const key = !menuShow ? "MENU" : "CLOSE";
    textEffect(key, setTextWord);
  }, [menuShow]);

  const links = [
    { text: "HOME", link: "/", index: 0 },
    { text: "ABOUT", link: "about", index: 1 },
    { text: "SKILL", link: "skill", index: 2 },
    // { text: "CONTACT", link: "contact", index: 3 },
  ];

  return (
    <Box pos="fixed" w="100%" h="100%" zIndex={50} className="nav" pointerEvents={"none"} top="0" left="0">
      <Flex justifyContent={"center"} w="100%" zIndex="5">
        <Flex flexDirection="column" alignItems="center" justifyContent={"center"} pointerEvents={"auto"}>
          <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Flex
              pos="relative"
              mt="3.125rem"
              width="3.5rem"
              height="1rem"
              alignItems={"center"}
              justifyContent="center"
              cursor="pointer"
              className={`menu ${menuShow && "open"}`}
              onClick={toggleMenu}
              _before={{
                w: "100%",
                h: "125%",
                pos: "absolute",
                content: "''",
                bg: color.primary,
              }}
            >
              <Text as="span" color={color.light} fontSize="0.8rem" transition="0.5s" zIndex={"1"} lineHeight="0.8rem">
                {!menuShow ? text.MENU : text.CLOSE}
              </Text>

              <Box
                pos="absolute"
                transform="translateY(-2rem)"
                inset="0"
                margin="auto"
                bg={color.light}
                w="0.06rem"
                height="1.875rem"
                className="menu-line"
              />
            </Flex>
          </Motion>
        </Flex>
      </Flex>
      <AnimatePresence>
        {menuShow && (
          <>
            <Motion
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%", transition: { duration: 1, delay: 0.5 } }}
              transition={{ duration: 1, ease: [0.43, 0.09, 0.18, 1] }}
            >
              <Flex
                as="ul"
                w="100%"
                maxW={{ base: "20rem", sm: "25rem" }}
                h="100%"
                bg="rgba(0,0,0,0.9)"
                pos="absolute"
                top={0}
                flexDirection="column"
                pointerEvents={"auto"}
                zIndex="-1"
              >
                {links.map(({ text, link, index }) => {
                  return <NavLink text={text} link={link} i={index} links={links} closeMenu={closeMenu} key={text} setIndex={props.setIndex} />;
                })}

                <Motion
                  initial={{ y: "-100%" }}
                  animate={{ y: 0, transition: { duration: 0.7, delay: 0.7 } }}
                  exit={{ y: "-100%", transition: { duration: 0.7, delay: 0 } }}
                >
                  <Box pos="absolute" bg={color.darklight} right="0" top="0" w="0.06rem" h="100%" />
                </Motion>
              </Flex>
            </Motion>
            <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Box bg="rgba(0,0,0,0.5)" pos="absolute" top="0" w="100%" h="100%" onClick={closeMenu} pointerEvents="auto" zIndex="-5" />
            </Motion>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Nav;
