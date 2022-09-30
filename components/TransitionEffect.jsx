import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Motion from "./Motion";

const Mirror = ({ w, i, reverseDelay, delay, reverse, duration, firstRendering }) => {
	return (
		<Box w={`${w}%`} h="100vh" pos="relative">
			<Motion
				initial={{ width: !firstRendering ? "0" : "100%" }}
				animate={{ width: "0" }}
				transition={{ duration, delay: reverse ? reverseDelay : delay }}
				exit={{ width: "100%" }}
				style={{ transformOrigin: reverse ? "right" : "left" }}
			>
				<Box as="span" bg="#000" w="100%" h="100%" pos="absolute" />
			</Motion>
		</Box>
	);
};

const TransitionEffect = ({ reverseEffect = false, firstRendering = true }) => {
	const numberOfLine = 30;
	const delayFrequency = 0.035;
	const duration = 0.6;

	const arr = new Array(numberOfLine).fill().map((_, i) => i);
	const width = 100 / numberOfLine;

	const [reverse, setReverse] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setReverse(true);
		}, (numberOfLine * delayFrequency + duration) * 1000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<Flex pos={"fixed"} w="100vw" h="100vh" zIndex={1000} pointerEvents="none">
			{arr.map((i) => {
				return (
					<Mirror
						key={i}
						w={width}
						i={i}
						reverse={reverseEffect ? reverse : !reverse}
						reverseDelay={20 * delayFrequency - delayFrequency * i}
						delay={delayFrequency * i}
						duration={duration}
						firstRendering={firstRendering}
					/>
				);
			})}
		</Flex>
	);
};

export default TransitionEffect;
