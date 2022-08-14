import React, { useContext, useEffect, useState } from "react";
import Motion from "../Motion";
import { Box, Flex } from "@chakra-ui/react";
import { TransitionDirection } from "../../pages/index.js";

// const Effect = ({ children, y = "100", delay = 0 }) => {
// 	const { direction } = useContext(TransitionDirection);

// 	const up = -y + "%";
// 	const down = y + "%";

// 	return (
// 		<Motion
// 			initial={{ y: 0 }}
// 			animate={{ y: direction < 0 ? down : up }}
// 			exit={{ y: 0 }}
// 			transition={{ duration: "0.8", ease: [0.9, 0.32, 0.24, 0.81], delay: delay }}
// 		>
// 			{children}
// 		</Motion>
// 	);
// };

const PageTransition = ({ direction }) => {
	const [clipPath, setClip] = useState({
		top: direction < 0 ? 0 : 100,
		bottom: direction < 0 ? 0 : 100,
	});

	const bgStyle = {
		pos: "absolute",
		h: "100%",
		w: "100%",
		top: "0",
		clipPath: `polygon(0 ${clipPath.top}%, 100% ${clipPath.top}%, 100% ${clipPath.bottom}%, 0% ${clipPath.bottom}%);`,
		transition: "0.5s cubic-bezier(0.9, 0.32, 0.24, 0.81)",
	};

	function setClipPath(prop, num) {
		setClip((prev) => {
			return { ...prev, [prop]: num };
		});
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			if (direction < 0) {
				setClipPath("bottom", 100);
				setTimeout(() => {
					setClipPath("top", 100);
				}, 1000);
			} else {
				setClipPath("top", 0);
				setTimeout(() => {
					setClipPath("bottom", 0);
				}, 1000);
			}
		}, 100);

		return () => {
			clearTimeout(timer);
		};
	}, [direction]);

	return (
		<Box h="100vh" w="100vw" pos="fixed" zIndex={100} pointerEvents="none">
			{/* <Effect>
				<Box bg="rgba(255,255,255,0.8)" pos="absolute" h="100%" w="100%" filter="blur(30px)" />
			</Effect>

			<Effect delay="0.1">
				<Box bg="rgba(0,0,0,0.8)" pos="absolute" h="100%" w="100%" filter="blur(50px)" />
			</Effect>
			<Effect delay="0.15">
				<Box bg="rgba(0,0,0,1)" pos="absolute" h="100%" w="100%" filter="blur(10px)" />
			</Effect>
			<Effect delay="0.22">
				<Box bg="rgba(0,0,0,1)" pos="absolute" h="100%" w="100%" />
			</Effect> */}
			<Box bg="rgba(255,255,255,0.8)" pos="absolute" h="5%" w="100%" filter="blur(30px)" bottom="0" zIndex={-1} />

			<Box bg="rgba(255,255,255,0.8)" filter="blur(30px)" zIndex={1} {...bgStyle} />
			<Box bg="rgba(0,0,0,0.9)" filter="blur(50px)" zIndex={1} {...bgStyle} transitionDelay="0.1s" />
			<Box bg="rgba(0,0,0,1)" filter="blur(10px)" zIndex={1} {...bgStyle} transitionDelay="0.15s" />

			<Box bg="rgba(0,0,0,1)" zIndex={1} {...bgStyle} transitionDelay="0.22s" />
		</Box>
	);
};

export default PageTransition;
