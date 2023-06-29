import React from "react";
import { keyframes, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Motion from "../Motion";
import { color, letterSpacing } from "/styles/variable.mjs";
import Layout from "../Layout";
import { TextSM } from "../Texts";
import { lineHeight } from "../../styles/variable.mjs";
import ScrollAnimateElement from "../animation/ScrollAnimateElement";

const fontSizeForHeadlineLg = { base: "2rem", sm: "2.5rem" };
const fontSizeForHeadlineMd = { base: "1.35rem", sm: "2rem" };
const fontSizeForSubHeadLine = { base: "1rem", sm: "4rem" };
const fontSizeForSubHeadLineVertical = { base: "1rem", sm: "3rem" };

export const WorkExperience = () => {
  return (
    <ExperienceComponent title="職歴" text="WORK EXPERIENCE" style={{ mt: 0 }}>
      <VerticalTextComponent text="LANDSCAPING COMPANY">
        <TextContainer
          title="造園土木業"
          subtitle={["2013 - 2014", "2015 - 2017", "2022.10月 ~ 現在"]}
          text="現場作業員として日本庭園の管理、植物の植栽・剪定作業に従事。炎天下の業務という過酷な環境下で、精神・肉体的な忍耐力を養う。"
          textAlign="right"
          mt="0"
        />
      </VerticalTextComponent>
      <VerticalTextComponent text="WELFARE SERVICES" flexDirection="row-reverse" style={{ mt: "10rem" }}>
        <TextContainer
          title="障害福祉サービス"
          subtitle="2023.6月 ~ 現在"
          text="就労移行支援事業の生活支援員として障がいを抱えた人の支援に従事。福祉サービス提供時間外では、サーバーの管理、ウェブサイトの構築・更新業務に携わる。"
          mt="0"
        />
      </VerticalTextComponent>
    </ExperienceComponent>
  );
};

const VerticalStyle = {
  zIndex: "100",
  content: "''",
  pos: "absolute",
  w: "100%",
  h: "40%",
  left: 0,
};
const VerticalTextComponent = ({ children, text, flexDirection = "row" }) => {
  flexDirection = flexDirection === "row" ? flexDirection : "row-reverse";

  const repeat = 3;
  let repeatedText = "";
  for (let i = 0; i < repeat; i++) {
    repeatedText += text + " ";
  }
  text = repeatedText;

  const rotate = `${flexDirection === "row" ? "-90" : "90"}deg`;

  const textAnimate = keyframes`
  0%{
    opacity:0;
    transform:translateY(400%) rotate(${rotate});
  }
  10%,90%{
    opacity:1;
  }
  
  100%{
    opacity:0;
    transform:translateY(-400%) rotate(${rotate});
  }
    `;

  return (
    <Flex flexDirection={{ base: "column", sm: flexDirection }} alignItems="center">
      <ScrollAnimateElement
        customVariants={{
          offScreen: { clipPath: "polygon(0 0, 100% 0, 0 0, 100% 0)" },
          onScreen: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" },
          transition: { delay: 0, duration: 0.5 },
        }}
      >
        <Flex
          transition="1s cubic-bezier(.65,.28,.27,1.03)"
          justifyContent="center"
          alignItems="center"
          flex="1"
          pos="relative"
          paddingBlock={{ base: "4rem", sm: "8rem" }}
          marginBlock="3rem"
          overflow="hidden"
          _before={{
            ...VerticalStyle,
            bg: `linear-gradient(to top, transparent 0%, ${color.primary} 100%)`,
            top: 0,
          }}
          _after={{
            ...VerticalStyle,
            bg: `linear-gradient(to bottom, transparent 0%, ${color.primary} 100%)`,
            bottom: 0,
          }}
        >
          <Text
            fontSize={fontSizeForSubHeadLineVertical}
            letterSpacing={letterSpacing.md}
            bg={color.light300}
            whiteSpace="nowrap"
            style={{
              WebkitBackgroundClip: " text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
            animation={`${textAnimate} linear infinite 15s ${flexDirection === "row" ? "0s" : "-7.5s"}`}
          >
            {text}
          </Text>
        </Flex>
      </ScrollAnimateElement>
      {children}
    </Flex>
  );
};

export const EducationalBackground = () => {
  return (
    <ExperienceComponent title="学歴" text="EDUCATIONAL BACKGROUND">
      <VerticalTextComponent text="UNIVERSITY" flexDirection="row" style={{ mt: "10rem" }}>
        <TextContainer
          title="名城大学外国語学部 国際英語学科 卒業"
          subtitle={["2018 - 2022", "GPA:3.3 取得", "TOEIC;930点 取得"]}
          text="造園業を3年間勤めた後、新しいことを学びたい気持ちが大きくなり、22歳のときに独学で大学へ進学する。2年次に半年間のアメリカ留学を経験し、3年次以降は「他者の動機付け理論（モチベーション管理）」についての勉強に注力。"
          textAlign="right"
          mt="0"
        />
      </VerticalTextComponent>
      <VerticalTextComponent text="STUDY ABROAD" flexDirection="row-reverse" style={{ mt: "10rem" }}>
        <TextContainer
          title="留学：ワーナーパシフィック大学"
          subtitle="2019.9月 - 2020.2月"
          text="アメリカ西海岸にあるオレゴン州、ポートランドへ半年間留学。現地の語学学校へ通い他国の留学生と交流、英語力を高める。現地では、環境保護団体3社にて2ヶ月間のインターンシップを経験し、うち1社ではHTML、CSS、JavaScriptを用いたウェブサイトのページ追加・更新業務に携わる。"
          mt="0"
        />
      </VerticalTextComponent>
    </ExperienceComponent>
  );
};

const ExperienceComponent = ({ title, text, children, style }) => {
  const customVariants = {
    offScreen: { scale: 1.5, y: "5rem" },
    onScreen: { scale: 1, y: "0rem" },
    transition: { delay: 0, duration: 1, ease: [0.65, 0.28, 0.27, 1.03] },
  };
  return (
    <>
      <Flex flexDirection="column" {...(style && { ...style })}>
        <ScrollAnimateElement customVariants={customVariants}>
          <Box>
            <Heading as="h2" fontFamily="Klee one" fontWeight="bold" fontSize={fontSizeForHeadlineLg} textAlign="center">
              {title}
            </Heading>
            <TextSM style={{ textAlign: "center" }}>{text}</TextSM>
          </Box>
        </ScrollAnimateElement>
        {children}
      </Flex>
    </>
  );
};

const TextContainer = ({ subHeadLine = "", title, subtitle, text, textAlign = "left", mt = "10rem", w = "lg" }) => {
  textAlign = textAlign === "left" ? textAlign : "right";

  const width = { md: "min(100%,28rem)", lg: "min(100%,36rem)" };
  w = width[w];

  const customVariantsTitle = {
    offScreen: { x: `${textAlign === "left" ? "-" : ""}5rem` },
    onScreen: { x: "0rem" },
    transition: { delay: 0.5, duration: 1 },
  };
  const customVariantsSubtitle = {
    offScreen: { x: `${textAlign === "left" ? "-" : ""}5rem` },
    onScreen: { x: "0rem" },
    transition: { delay: 0.5, duration: 1 },
  };
  const customVariantsText = {
    offScreen: {},
    onScreen: {},
    transition: { delay: 0.5, duration: 1 },
  };

  return (
    <Box
      mt={mt}
      w={w}
      {...(textAlign === "left" ? { mr: "auto" } : { ml: "auto" })}
      pos="relative"
      zIndex="5"
      _before={
        subHeadLine && {
          zIndex: "-1",
          content: `'${subHeadLine}'`,
          pos: "absolute",
          whiteSpace: "nowrap",
          top: { base: "-2rem", sm: "-3rem" },
          fontSize: fontSizeForSubHeadLine,
          letterSpacing: letterSpacing.lg,
          backgroundImage: {
            base: `linear-gradient(to left, transparent -20%, ${color.light300} 150%)`,
            sm: `linear-gradient(to ${textAlign === "left" ? "right" : "left"}, transparent -20%, ${color.light300} 150%)`,
          },

          backgroundClip: "text",
          textFillColor: "transparent",
          ...(textAlign === "left"
            ? { right: { base: "unset", sm: 0 }, left: { base: 0, sm: "unset" } }
            : { left: { base: "unset", sm: 0 }, right: { base: 0, sm: "unset" } }),
        }
      }
    >
      <ScrollAnimateElement customVariants={customVariantsTitle}>
        <Heading as="h3" fontSize={fontSizeForHeadlineMd} fontFamily="Klee one" fontWeight="regular" textAlign={textAlign}>
          {title}
        </Heading>
      </ScrollAnimateElement>
      <ScrollAnimateElement customVariants={customVariantsSubtitle}>
        <Box>
          <TextSM style={{ textAlign: textAlign }}>
            {typeof subtitle === "object"
              ? subtitle.map((sub, idx) => {
                  return (
                    <Box as="span" key={sub + idx} fontFamily="Klee One" color={color.light}>
                      {sub}
                      {idx < subtitle.length - 1 && <br />}
                    </Box>
                  );
                })
              : subtitle}
          </TextSM>
        </Box>
      </ScrollAnimateElement>
      <ScrollAnimateElement customVariants={customVariantsText}>
        <Text
          fontFamily="Klee one"
          fontSize="1rem"
          w={w}
          mt="2rem"
          {...(textAlign === "left" ? { mr: "auto" } : { ml: "auto" })}
          letterSpacing={letterSpacing.sm}
          lineHeight={lineHeight.md}
          color={color.light400}
        >
          {text}
        </Text>
      </ScrollAnimateElement>
    </Box>
  );
};
