import React, { useRef, useState, useEffect } from "react";
import TransitionEffect from "../components/TransitionEffect";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import SiteCards from "../components/skill/SiteCards";
import { letterSpacing } from "../styles/variable.mjs";
import MousePointer from "../components/MousePointer";
import HeadLineAppear from "../components/HeadLineAppear";

const ease = [0.65, 0.28, 0.27, 1.03];

const Skill = () => {
  const headlineRef = useRef(null);
  const [headline, setHeadline] = useState("30rem");
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const rect = headlineRef.current.getBoundingClientRect();

    const innerHeight = window.innerHeight;
    const elHeight = rect.height;
    const centerLine = innerHeight / 2 - elHeight / 2;

    setHeadline(centerLine + "px");

    const timer = setTimeout(() => {
      setHeadline("10rem");
      setOverflow(true);
    }, 1800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <TransitionEffect />
      <Box pos="relative" top="0" left="0" zIndex="15" w="100%" h="100vh" overflow={overflow ? "auto" : "hidden"}>
        <Layout>
          <Container>
            <Flex justifyContent="center" mt={headline} ref={headlineRef} transition="margin-top 1.6s" transitionTimingFunction={ease}>
              <HeadLineAppear text="SKILL" />
            </Flex>
            <SiteCards setOverflow={setOverflow} />
          </Container>
        </Layout>
      </Box>
    </>
  );
};

export default Skill;
