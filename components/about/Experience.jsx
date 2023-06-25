import React from "react";
import { AlertTitle, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Motion from "../Motion";
import { color, letterSpacing } from "/styles/variable.mjs";
import Layout from "../Layout";
import { TextSM } from "../Texts";
import { lineHeight } from "../../styles/variable.mjs";

const fontSizeForHeadlineLg = { base: "2rem", sm: "2.5rem" };
const fontSizeForHeadlineMd = { base: "1.5rem", sm: "2rem" };

export const WorkExperience = () => {
  return (
    <ExperienceComponent title="職歴" text="WORK EXPERIENCE" style={{ mt: "10rem" }}>
      <VerticalTextComponent text="LANDSCAPING COMPANY">
        <TextContainer
          title="造園土木業"
          subtitle={["2013 - 2014", "2015 - 2017", "2022.10月 〜 現在"]}
          text="現場作業員として日本庭園の管理、植物の植栽・剪定作業に従事。炎天下の業務という過酷な環境下で、精神・肉体的な忍耐力を養う。"
          textAlign="right"
          mt="0"
        />
      </VerticalTextComponent>
      <VerticalTextComponent text="WELFARE SERVICES" flexDirection="row-reverse">
        <TextContainer
          title="障害福祉事業"
          subtitle="2023.6月〜現在"
          text="就労移行支援事業の生活支援員として障がいを抱えた人の支援に従事。また、サーバーの管理、ウェブサイトの構築・更新業務に携わる。"
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

  return (
    <Flex flexDirection={flexDirection} alignItems="center">
      <Flex
        justifyContent="center"
        alignItems="center"
        flex="1"
        pos="relative"
        paddingBlock="8rem"
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
        <Motion initial={{ rotate, y: "400%" }} animate={{ rotate, y: "-400%" }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
          <Text
            fontSize="3rem"
            letterSpacing={letterSpacing.md}
            bg={color.light300}
            whiteSpace="nowrap"
            style={{
              "-webkit-background-clip": " text",
              "-webkit-text-fill-color": "transparent",
              "background-clip": "text",
              textFillColor: "transparent",
            }}
          >
            {text}
          </Text>
        </Motion>
      </Flex>
      {children}
    </Flex>
  );
};

export const EducationalBackground = ({ chidlren }) => {
  return (
    <ExperienceComponent title="学歴" text="EDUCATIONAL BACKGROUND">
      <TextContainer
        subHeadLine="UNIVERSITY"
        title="名城大学外国語学部 国際英語学科 卒業"
        subtitle={["2018 - 2022", "GPA:3.3 取得", "TOEIC;930点 取得"]}
        text="造園業を3年間勤めた後、新しいことを学びたい気持ちが大きくなり、22歳のときに独学で大学へ進学する。2年次に半年間のアメリカ留学を経験し、3年次以降は「他者の動機付け理論（モチベーション管理）」についての勉強に注力。"
        textAlign="right"
        w="lg"
      />
      <TextContainer
        subHeadLine="STUDY ABROAD"
        title="留学：ワーナーパシフィック大学"
        subtitle="2019.9月 - 2020.2月"
        text="アメリカ西海岸にあるオレゴン州、ポートランドへ半年間留学。現地の語学学校へ通い他国の留学生と交流、英語力を高める。現地では、環境保護団体3社にて2ヶ月間のインターンシップを経験し、うち1社ではHTML、CSS、JavaScriptを用いたウェブサイトのページ追加・更新業務に携わる。"
        w="lg"
      />
    </ExperienceComponent>
  );
};

const ExperienceComponent = ({ title, text, children, style }) => {
  return (
    <>
      <Flex flexDirection="column" {...(style && { ...style })}>
        <Box>
          <Heading as="h2" fontFamily="Klee one" fontWeight="bold" fontSize={fontSizeForHeadlineLg} textAlign="center">
            {title}
          </Heading>
          <TextSM style={{ textAlign: "center" }}>{text}</TextSM>
        </Box>
        {children}
      </Flex>
    </>
  );
};

const TextContainer = ({ subHeadLine = "", title, subtitle, text, textAlign = "left", mt = "8rem", w = "md" }) => {
  textAlign = textAlign === "left" ? textAlign : "right";

  const width = { md: "min(100%,28rem)", lg: "100%" };
  w = width[w];

  return (
    <Box
      mt={mt}
      w={w}
      {...(textAlign === "left" ? { mr: "auto" } : { ml: "auto" })}
      pos="relative"
      _before={
        subHeadLine && {
          content: `'${subHeadLine}'`,
          pos: "absolute",

          top: "-3rem",
          fontSize: "4rem",
          letterSpacing: letterSpacing.lg,
          ...(textAlign === "left" ? { right: 0 } : { left: 0 }),
          bg: `linear-gradient(to ${textAlign === "left" ? "right" : "left"}, transparent -20%, ${color.light300} 100%)`,
          "-webkit-background-clip": " text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          textFillColor: "transparent",
        }
      }
    >
      <Heading as="h3" fontSize={fontSizeForHeadlineMd} fontFamily="Klee one" fontWeight="regular" textAlign={textAlign}>
        {title}
      </Heading>
      <TextSM style={{ textAlign: textAlign }}>
        {typeof subtitle === "object"
          ? subtitle.map((sub, idx) => {
              return (
                <>
                  {sub}
                  {idx < subtitle.length - 1 && <br />}
                </>
              );
            })
          : subtitle}
      </TextSM>
      <Text
        fontFamily="Klee one"
        fontSize="1rem"
        w="min(100%,28rem)"
        mt="2rem"
        {...(textAlign === "left" ? { mr: "auto" } : { ml: "auto" })}
        letterSpacing={letterSpacing.sm}
        lineHeight={lineHeight.md}
        color={color.light400}
      >
        {text}
      </Text>
    </Box>
  );
};
