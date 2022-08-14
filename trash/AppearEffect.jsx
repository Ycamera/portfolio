import React, { useContext, useState, useEffect } from "react";
import { TransitionDirection } from "../../pages/index";
import { Slot } from "@radix-ui/react-slot";
import { color } from "/styles/fontColor";
import { Flex } from "@chakra-ui/react";
import BottomSmoke from "./BottomSmoke";
import BackgroundCanvasParticle from "../BackgroundCanvasParticle";

const AppearEffect = ({ show, children }) => {
	const { direction } = useContext(TransitionDirection);
	const [clipPath, setClip] = useState({
		top: 0,
		bottom: 100,
	});

	function setClipPath(prop, num) {
		setClip((prev) => {
			return { ...prev, [prop]: num };
		});
	}

	useEffect(() => {
		if (!show) {
			if (direction < 0) {
				setClipPath("top", 100);
			} else {
				setClipPath("bottom", 0);
			}
		}
	}, [show]);

	return (
		<Slot
			bg={color.primary}
			pos="fixed"
			h="100vh"
			w="100vw"
			top="0"
			clipPath={`polygon(0 ${clipPath.top}%, 100% ${clipPath.top}%, 100% ${clipPath.bottom}%, 0% ${clipPath.bottom}%)`}
			transition="clip-path 0.5s cubic-bezier(0.9, 0.32, 0.24, 0.81)"
			zIndex={!show && 10}
		>
			<Flex flexDirection="column" justifyContent={"center"} alignItems="center">
				{children}
				<BottomSmoke />
			</Flex>
		</Slot>
	);
};

export default AppearEffect;
