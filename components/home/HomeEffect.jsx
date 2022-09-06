import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Circle, ColorModeScript } from "@chakra-ui/react";
import Motion from "/components/Motion";
import { setTextEffect } from "/lib/textEffect";
import { color } from "/styles/fontColor";

const Particle = () => {
	const numberOfParticle = 6;
	let particles = new Array(numberOfParticle).fill().map((_, i) => i);

	return (
		<Motion animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
			<Box pos="absolute" w="10%" h="10%">
				{particles.map((particle) => {
					return (
						<Circle
							pos="absolute"
							inset="0"
							margin="auto"
							size="10%"
							bg={color.darklight}
							transform={`rotate(${(particle * 360) / numberOfParticle}deg) translateY(8rem)`}
						/>
					);
				})}
			</Box>
		</Motion>
	);
};

const HomeEffect = ({ firstRendering, setFirstRendering, index, loaded }) => {
	const [text, setText] = useState("");
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTextEffect("LOADING...", setText);
		if (firstRendering === 0 && index === 0) {
			setShow(true);
			setFirstRendering(1);
		}
	}, []);

	return (
		show && (
			<Box pos="fixed" w="100vw" h="100vh" zIndex="100" top="0" pointerEvents="none">
				{/* <Bg /> */}
				<Motion
					initial={{ clipPath: "polygon(0 0, 100% 0 ,100% 100% ,0 100%)" }}
					animate={{
						clipPath: loaded
							? "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)"
							: "polygon(0 0, 100% 0 ,100% 100% ,0 100%)",
					}}
					transition={{ duration: 1, delay: 1, ease: [0.7, 0.32, 0.21, 0.91] }}
				>
					<Flex
						pos="absolute"
						w="100vw"
						h="100vh"
						zIndex="100"
						bg="#000"
						pointerEvents="none"
						justifyContent={"center"}
						alignItems="center"
					>
						{/* <Particle /> */}

						<Box pos="relative" overflow={"hidden"} px="1rem" py="0.5rem">
							<Text as="span" fontSize="1.2rem">
								{text}
							</Text>
							<Motion
								initial={{ x: "-100%" }}
								animate={{ x: "100%" }}
								transition={{ duration: 0.8, delay: 1 }}
							>
								<Box
									pos="absolute"
									w="100%"
									h="0.06rem"
									bgGradient={`linear(to-r, transparent , ${color.light}, transparent )`}
									bottom="0"
									left="0"
								/>
							</Motion>
						</Box>
					</Flex>
				</Motion>
				{/* <Line x="-100%" />
			<Line x="100%" left={false} /> */}
			</Box>
		)
	);
};

export default HomeEffect;
