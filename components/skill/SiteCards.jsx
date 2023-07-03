import React, { useEffect, useState, useContext, useRef } from "react";
import { Box, Flex, Grid, Image, keyframes } from "@chakra-ui/react";
import Motion from "../Motion";
import { PointerContext, RootFontSizeContext } from "../../pages/_app";
import { color } from "../../styles/variable.mjs";
import MousePointerArea from "../MousePointerArea";
import neocosmoImg from "../../public/images/neocosmo.jpg";
import todoImg from "../../public/images/Todo.jpg";
import mowingImg from "../../public/images/mowing.jpg";
import movightImg from "../../public/images/movight.jpg";
import minesweeperImg from "../../public/images/minesweeper.jpg";
import CardContent from "./CardContent";
import { AnimatePresence } from "framer-motion";
import Parallax from "../Parallax";

const neocosmo = {
  img: neocosmoImg,
  title: "一般社団法人ネオコスモ",
  technology: "HTML SCSS JavaScript PHP CMS:WordPress Animationライブラリ:GSAP",
  text: "知人が立ち上げた障害福祉事業の企業サイトを請負制作しました。 要件定義、デザイン制作、WordPressテーマ制作・実装、サーバー契約、ドメインの取得などウェブ制作に関わる全ての工程を担当しました。 事業のターゲットとなる「障害を抱えている方々」がコンテンツを理解しやすいように、トップページからお問い合わせページまでの導線をシンプルに設計し、情報が伝わりやすいように工夫しました。",
  webLink: "https://neocosmo.jp/",
};
const todo = {
  img: todoImg,
  title: "Todo App",
  technology: "Next.js Chakra-ui TypeScript",
  text: "TypeScriptとChakra-uiの勉強を兼ねて制作したタスク管理アプリです。 直感的に操作が行えるようにUIデザインにこだわりました。 追加したタスクは、ブラウザ上のlocalStorageに保存し管理しています。ブラウザを開いた際に、localStorage内にタスクが存在する場合は、最初に読み込む仕様になっています。  機能 ・タスクの追加、削除、修正、入れ替え ・テーマの切り替え「ダーク・ライトモード」",
  webLink: "https://todo-app-ycamera.vercel.app/",
  githubLink: "https://github.com/Ycamera/Todo",
};
const mowing = {
  img: mowingImg,
  title: "草刈り業務用資料作成アプリ",
  technology: "Next.js Chakra-ui TypeScript",
  text: "アルバイト先の草刈り業務で使用するアプリです。 PC操作が苦手な知人の職人を助けるために制作しました。 業務で提出する資料を簡単なフォーム入力で生成し、エクセルファイルとして出力します。",
  webLink: "https://create-documents-for-mowing.vercel.app/",
  githubLink: "https://github.com/Ycamera/create_documents_for_mowing",
};
const movight = {
  img: movightImg,
  title: "Movight",
  technology: "HTML CSS JavaScript React",
  text: "Reactの勉強を始めて1週間経ったときに制作しました。 上映中の映画から昔の映画作品まで探せるSPAサイトです。 JavaScriptの非同期処理で外部APIから映画情報を取得し表示しています。 APIから日本語で情報が取得できなかった場合は、英語の情報を取得して表示するようにしてます。",
  webLink: "https://ycamera.github.io/Movight/",
  githubLink: "https://github.com/Ycamera/Movight",
};
const minesweeper = {
  img: minesweeperImg,
  title: "マインスイーパー",
  technology: "HTML CSS JavaScript",
  text: "フロンドエンド技術を独学し始めて１ヶ月ほど経った際に制作したものです。 WindowsPCに昔から搭載されていたマインスイーパーを再現しました。 右上のメニューボタンから設置する爆弾の数を変更できます。  機能 ・左Click：マスを開く ・右Click：フラグを立てる ・開いたマスの数字をClick：数字の数だけ周囲のマスにフラグが経っている場合は、周囲のマスを全て開く  思い出の作品として置いておきます。",
  webLink: "https://ycamera.github.io/minesweeper_project/",
  githubLink: "https://github.com/Ycamera/minesweeper_project",
};

const SiteCards = ({ setOverflow }) => {
  const [cardIndex, setCardIndex] = useState(-1);

  const cardInfo = [neocosmo, todo, mowing, movight, minesweeper];

  function setCardIndexByNum(num) {
    setCardIndex(num);
  }

  function moveToOtherPage(num) {
    const nextPageIdx = cardIndex + num;
    if (!(nextPageIdx >= cardInfo.length || nextPageIdx < 0)) setCardIndex(nextPageIdx);
  }
  const hidePageNav = cardIndex === 0 ? "left" : cardIndex >= cardInfo.length - 1 ? "right" : "none";

  return (
    <Grid
      justifyContent="center"
      templateColumns={"repeat(auto-fit,min(16rem,100%))"}
      marginInline="auto"
      mt={{ base: "3rem", sm: "5rem" }}
      marginBottom="5rem"
      gap={{ base: "3rem", sm: "5rem" }}
      h="auto"
    >
      {cardInfo.map(({ img }, idx) => {
        return (
          <SiteCard
            img={img}
            delay={idx * 0.1 + 1.5}
            key={img.src}
            setCardIndex={() => {
              setCardIndexByNum(idx);
              setOverflow(false);
            }}
          />
        );
      })}

      {cardIndex >= 0 && (
        <AnimatePresence>
          <CardContent
            key={cardInfo[cardIndex].img.src}
            info={cardInfo[cardIndex]}
            resetCardIndex={() => {
              setCardIndexByNum(-1);
              setOverflow(true);
            }}
            moveToOtherPage={moveToOtherPage}
            hidePageNav={hidePageNav}
          />
        </AnimatePresence>
      )}
    </Grid>
  );
};

const SiteCard = ({ img, delay = 0, setCardIndex }) => {
  const [bgPos, setBgPos] = useState({ left: 0, top: 0, animation: false });

  const imgRef = useRef(null);

  const rect = imgRef.current?.getBoundingClientRect();
  const rectWidth = rect?.width * 3 + "px";
  const waveAnimation = keyframes`
  0%{
    opacity:0.8;
    width:0;
    height:0;
  }
  50%{
      opacity:0.5;
      width:${rectWidth};
      height:${rectWidth};
  }
  100%{
      opacity:0;
      width:${rectWidth};
      height:${rectWidth};

  }
  `;

  function onImgClick(e) {
    e.preventDefault();
    if (!imgRef.current) return;
    const rect = imgRef.current?.getBoundingClientRect();

    const left = e.clientX - rect?.x;
    const top = e.clientY - rect?.y;

    setBgPos((prev) => {
      return { ...prev, animation: false };
    });
    setTimeout(() => {
      setBgPos({ left: left, top: top, animation: true });
    }, 1);
  }

  return (
    <Motion
      initial={{ clipPath: "circle(0% at 50% 50%)", y: "3rem" }}
      animate={{ clipPath: "circle(100% at 50% 50%)", y: "0rem" }}
      transition={{ delay: 0.5 + delay, duration: 1, ease: [0.65, 0.28, 0.27, 1.03] }}
    >
      <Flex
        onClick={(e) => {
          onImgClick(e), setCardIndex();
        }}
        bg={color.dark}
        borderRadius="0.5rem"
        w="min(100%,16rem)"
        marginInline="auto"
        pos="relative"
        overflow="hidden"
        isolation=" isolate"
        cursor="pointer"
      >
        <Box
          pointerEvents="none"
          zIndex="10"
          pos="absolute"
          w="0"
          h="0"
          {...(bgPos.animation && { animation: `${waveAnimation} 1s none` })}
          bg={color.light}
          left={bgPos.left}
          top={bgPos.top}
          borderRadius="50%"
          transform="translate(-50%,-50%)"
          filter="blur(0.5rem)"
        />
        <Box
          pointerEvents="none"
          zIndex="-1"
          pos="absolute"
          w="0"
          h="0"
          {...(bgPos.animation && { animation: `${waveAnimation} 1s` })}
          bg={color.light}
          left={bgPos.left}
          top={bgPos.top}
          borderRadius="50%"
          transform="translate(-50%,-50%)"
          filter="blur(0.5rem)"
        />

        <Parallax>
          <Box ref={imgRef} _hover={{ transform: "scale(1.1)" }} transition="0.5s" transitionTimingFunction="cubic-bezier(0.65, 0.28, 0.27, 1.03)">
            <Image pointerEvents="none" src={img.src} w="min(100%,16rem)" h="min(100%,12rem)" objectFit="contain" objectPosition="center center" />
          </Box>
        </Parallax>
      </Flex>
    </Motion>
  );
};

export default SiteCards;
