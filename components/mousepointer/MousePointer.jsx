import React, { useEffect, useState, useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Motion from "../Motion";
import { PointerContext } from "../../pages/_app";
import { color } from "../../styles/variable.mjs";
import { useRouter } from "next/router";

const MousePointer = () => {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const { pointer, setPointer } = useContext(PointerContext);

  const router = useRouter();

  function getMousePos(e) {
    setMouse({ x: e.x, y: e.y });
  }
  useEffect(() => {
    document.addEventListener("pointermove", getMousePos);

    return () => {
      document.removeEventListener("pointermove", getMousePos);
    };
  }, []);

  const followCursor = { y: mouse.y, x: mouse.x };
  const variants = {
    default: { size: "0rem", bg: color.light300, style: { filter: "blur(0.1rem)" } },
    lg: { size: "10rem", bg: color.secondary, style: { filter: "blur(0.5rem)" } },
    view: { size: "6rem", fontSize: "1rem", bg: color.secondary, text: "VIEW", mixBlendMode: "normal", style: { color: color.primary } },
  };

  const transition = {
    stiffness: 300,
    mass: 1,
    damping: 50,
    bounce: 0,
    duration: 0,
    type: "spring",
  };

  useEffect(() => {
    setPointer("default");
  }, [router.asPath]);

  return (
    mouse && (
      <Motion initial={{ opacity: 1 }} animate={{ ...followCursor, opaity: 1 }} transition={transition}>
        <Box
          pos="fixed"
          top="0"
          left="0"
          zIndex="11000"
          pointerEvents={"none"}
          transition="mix-blend-mode 0.3s"
          mixBlendMode={variants[pointer]?.mixBlendMode ? variants[pointer]?.mixBlendMode : "difference"}
          _before={{
            content: '""',
            borderRadius: "50%",
            w: "100%",
            h: "100%",
            pos: "absolute",
            inset: "0",
            margin: "auto",
            bg: variants[pointer]?.bg,

            pointerEvents: "none",
            // filter: "blur(0.5rem)",
            transform: "translate(-50%,-50%)",
            transition: "0.3s",
            ...(variants[pointer]?.style && { ...variants[pointer]?.style }),
          }}
        >
          <Flex
            // borderRadius="50%"
            // bg={variants[pointer].bg}
            h={variants[pointer]?.size}
            w={variants[pointer]?.size}
            transform="translate(-50%,-50%)"
            transition="0.3s"
            {...(variants[pointer]?.style && { ...variants[pointer]?.style })}
            justifyContent="center"
            alignItems="center"
            fontSize={variants[pointer]?.fontSize}
          >
            {variants[pointer]?.text}
          </Flex>
        </Box>
      </Motion>
    )
  );
};

export default MousePointer;
