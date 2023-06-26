import React from "react";
import TransitionEffect from "../components/TransitionEffect";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Container from "../components/Container";
import SiteCards from "../components/SiteCards";
import { letterSpacing } from "../styles/variable.mjs";
import MousePointer from "../components/MousePointer";

const skill = () => {
  return (
    <>
      <TransitionEffect />
      <Box pos="relative" top="0" left="0" zIndex="15" w="100%" h="100%">
        <MousePointer />
        <Layout>
          <Container>
            <Box mt="30vh">
              <Heading as="h1" textAlign="center" fontSize={{ base: "2.5rem", sm: "4rem" }} color="" letterSpacing={letterSpacing.lg}>
                SKILL
              </Heading>
              <SiteCards />
            </Box>
          </Container>
        </Layout>
      </Box>
    </>
  );
};

export default skill;
