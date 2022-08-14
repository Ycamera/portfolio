import React, { useState, useContext } from "react";
import Top from "/components/home/Top";
import About from "/components/home/About";
import Skill from "/components/home/Skill";
import Contact from "/components/home/Contact";
import BackgroundCanvasParticle from "../components/BackgroundCanvasParticle";

import Motion from "/components/Motion";
import { Box, Flex } from "@chakra-ui/react";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence } from "framer-motion";
import { color } from "/styles/fontColor";

import { PathIndexContext } from "/pages/_app";

export const TransitionDirection = React.createContext();

export default function Home() {
	const elements = [<Top />, <About />, <Skill />, <Contact />];

	const [pathIndex, setPathIndex] = useState(0);
	const [direction, setDirection] = useState(-1);

	const [whileTransition, setWhileTransition] = useState();

	function setIndex(num) {
		const index = pathIndex + num;
		if (0 <= index && index < elements.length) {
			if (whileTransition) return;
			setWhileTransition(true);
			setPathIndex(index);
			setTimeout(() => {
				setWhileTransition(false);
			}, 1500);

			setDirection(num);
		}
	}

	function scroll(e) {
		const y = e.deltaY;
		const direc = y > 0 ? 1 : -1;
		setIndex(direc);
	}

	return (
		<TransitionDirection.Provider value={{ direction }}>
			<Box onWheel={scroll} w="100vw" h="100vh" pos="fixed" top="0">
				<BackgroundCanvasParticle />
				<AnimatePresence exitBeforeEnter>
					{elements.map((element, index) => {
						return (
							pathIndex === index && (
								<Slot show={pathIndex === index} key={index}>
									{element}
								</Slot>
							)
						);
					})}
				</AnimatePresence>

				<Box
					bg="rgba(255,255,255,0.8)"
					pos="absolute"
					h="5%"
					w="100%"
					filter="blur(30px)"
					bottom="0"
					zIndex={-1}
				/>
				<Flex
					pos="absolute"
					right="0"
					top="50%"
					transform="translateY(-50%)"
					pointerEvents="none"
					flexDirection="column"
					alignItems="end"
				>
					{elements.map((element, i) => {
						const style = { w: "2rem" };

						return (
							<Box
								key={element + i}
								bg={color.darklight}
								w="1.5rem"
								h="0.06rem"
								my="0.3rem"
								{...(i === pathIndex && style)}
								transition="0.5s"
							/>
						);
					})}
				</Flex>
			</Box>
		</TransitionDirection.Provider>
	);
}
