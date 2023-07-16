import React, { memo, useRef } from "react";
import { Box, Flex, Image, Heading, Text, Link } from "@chakra-ui/react";
import { color, letterSpacing, lineHeight } from "../../styles/variable.mjs";
import githubIcon from "../../public/images/github.png";
import weblinkIcon from "../../public/images/weblink.png";
import Motion from "../Motion.jsx";
import { AnimatePresence } from "framer-motion";

const textFormatNormal = {
  letterSpacing: letterSpacing.sm,
  lineHeight: lineHeight.md,
  fontFamily: "Klee One",
};
const CardContent = memo(({ info, resetCardIndex, moveToOtherPage, hidePageNav }) => {
  const { title, technology, img, text, webLink, githubLink } = info;
  const cardScrollPositionRef = useRef(null);

  function insertNewLine(paragraph, listStyle = false) {
    return paragraph.split(" ").map((text, idx) => {
      return (
        <span key={text + idx} style={{ color: color.light500, fontFamily: "Klee One" }}>
          {idx === 0 ? (
            listStyle ? (
              `・${text}`
            ) : (
              text
            )
          ) : (
            <>
              <br />
              {listStyle && "・"}
              {text}
            </>
          )}
        </span>
      );
    });
  }

  function cardScrollToTop() {
    if (!cardScrollPositionRef) return;
    cardScrollPositionRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: "3rem" }} transition={{ duration: 0.3 }}>
      <Box
        pos="fixed"
        top="0"
        left="0"
        w="100%"
        h="100vh"
        bg={"rgba(0,0,0,0.5)"}
        zIndex="100"
        pointerEvents="all"
        style={{ touchAction: "auto" }}
        scrollBehavior="smooth"
      >
        <Box pos="absolute" w="100%" h="100%" top="0" left="0" onClick={resetCardIndex} />
        <Motion
          initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          transition={{ duration: 0.5 }}
        >
          <Box
            p={{ base: "2rem", sm: "5rem" }}
            pb="10rem"
            pos="absolute"
            right="0"
            w="min(100%,75rem)"
            h="calc(100%)"
            bg={"#101010"}
            borderRadius="1rem 0 0 1rem"
            pointerEvents="auto"
            transition="clip-path 0.8s"
            transitionTimingFunction="cubic-bezier(0.65, 0.28, 0.27, 1.03)"
            overflow="auto"
            ref={cardScrollPositionRef}
          >
            <CrossIcon resetCardIndex={resetCardIndex} />
            <AnimatePresence exitBeforeEnter>
              <Box key={info.title}>
                <Motion
                  initial={{ y: "2rem", opacity: 0 }}
                  animate={{ y: "0rem", opacity: 1 }}
                  exit={{ y: "2rem", opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Box>
                    <Headline title={title} pos="top" />
                    <Flex flexDirection={{ base: "column", md: "row" }} mt="2rem">
                      <Link
                        href={webLink}
                        target="_blank"
                        w={{ base: "100%", md: "min(100%,32rem)" }}
                        _hover={{ opacity: 0.9 }}
                        transition="opacity 0.3s"
                      >
                        <Image
                          // pointerEvents="none"
                          alt={info.title}
                          src={img.src}
                          w={{ base: "100%", md: "min(100%,32rem)" }}
                          h="min(100%,24rem)"
                          objectFit="contain"
                          objectPosition="center center"
                          borderRadius="0.5rem"
                        />
                      </Link>
                      <Box ml={{ base: "0", md: "2rem" }}>
                        <Headline title={title} pos="right" />
                        <Text mt="3rem" fontSize="1.5rem" {...textFormatNormal} color={color.secondary}>
                          主要技術
                        </Text>
                        <Text mt="1rem" {...textFormatNormal} color={color.light500} lineHeight={lineHeight.lg}>
                          {insertNewLine(technology, true)}
                        </Text>
                      </Box>
                    </Flex>
                    <Box>
                      <Text mt="3rem" fontSize="1.5rem" {...textFormatNormal} color={color.secondary}>
                        概要
                      </Text>
                      <Text mt="1rem" {...textFormatNormal} lineHeight={lineHeight.lg} color={color.light500}>
                        {insertNewLine(text)}
                      </Text>
                    </Box>
                    <Flex gap="1rem" justifyContent="flex-end" mt="5rem">
                      <LinkIcon src={weblinkIcon.src} link={webLink} />
                      <LinkIcon src={githubIcon.src} link={githubLink} />
                    </Flex>
                    <PageNavigator moveToOtherPage={moveToOtherPage} hidePageNav={hidePageNav} cardScrollToTop={cardScrollToTop} />
                  </Box>
                </Motion>
              </Box>
            </AnimatePresence>
          </Box>
        </Motion>
      </Box>
    </Motion>
  );
});

const Headline = memo(({ title, pos = "top" }) => {
  return (
    <Heading
      mt={{ base: "3rem", md: "0" }}
      mb={{ base: "2rem", md: "0" }}
      display={pos === "top" ? { base: "block", md: "none" } : { base: "none", md: "block" }}
      as="h2"
      letterSpacing={letterSpacing.md}
      fontFamily="Sansation"
      pos="relative"
      pb="0.5rem"
      _before={{
        content: '""',
        pos: "absolute",
        left: 0,
        bottom: 0,
        w: "100%",
        h: "0.1rem",
        bg: color.light,
      }}
    >
      {title}
    </Heading>
  );
});

const LinkIcon = memo(({ src, link }) => {
  const size = "2rem";
  return <>{link && <Link href={link} w={size} h={size} bgImage={`url(${src})`} backgroundSize="contain" target="_blank" />}</>;
});

const CrossIcon = memo(({ resetCardIndex }) => {
  const size = "2.5rem";

  const line = {
    w: "70%",
    h: "0.06rem",
    bg: color.light,
    pos: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  };
  return (
    <Flex justifyContent="flex-end" pos="sticky" top="0" zIndex="10">
      <Box w={size} h={size} cursor="pointer" onClick={resetCardIndex} pos="relative" bg={color.deepdark} borderRadius="0.5rem">
        <Box {...line} transform="translate(-50%,-50%) rotate(45deg)" />
        <Box {...line} transform="translate(-50%,-50%) rotate(-45deg)" />
      </Box>
    </Flex>
  );
});

const PageNavigator = memo(({ moveToOtherPage, hidePageNav, cardScrollToTop }) => {
  const style = {
    w: "3rem",
    h: "3rem",
    bg: color.deepdark,
    cursor: "pointer",
    pos: "relative",
    borderRadius: "0.5rem",
  };

  const innerStyle = {
    w: "30%",
    h: "30%",
    borderRight: "solid 0.06rem",
    borderTop: "solid 0.06rem",
    pos: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    borderColor: color.light,
  };

  return (
    <Flex justifyContent={"center"} gap="3rem" mt="3rem" pb="5rem">
      {hidePageNav !== "left" ? (
        <Box
          {...style}
          onClick={() => {
            moveToOtherPage(-1), cardScrollToTop();
          }}
        >
          <Box {...innerStyle} transform="translate(calc(-50% + 0.3rem),-50%) rotate(-135deg)" />
        </Box>
      ) : (
        <Box {...style} visibility="hidden" />
      )}
      {hidePageNav !== "right" ? (
        <Box
          {...style}
          onClick={() => {
            moveToOtherPage(1), cardScrollToTop();
          }}
        >
          <Box {...innerStyle} transform="translate(calc(-50% + -0.3rem),-50%) rotate(45deg)" />
        </Box>
      ) : (
        <Box {...style} visibility="hidden" />
      )}
    </Flex>
  );
});
export default CardContent;
