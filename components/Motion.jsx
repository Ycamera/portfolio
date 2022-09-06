import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

import { useContext } from "react";
import { TransitionDirection } from "/pages/index";

const Motion = motion(Slot);

export default Motion;

export const MotionY = ({ children, y = 0, appearDelay = 0, disappearDelay = 0, customTransition }) => {
	const { direction } = useContext(TransitionDirection);
	const defaultTransition = {
		duration: 0.5,

		type: "spring",
		stiffness: 50,
		mass: 0.7,
	};

	const transition = { ...defaultTransition, ...customTransition };

	const variants = {
		initial: {
			opacity: 0,
			y: direction > 0 ? y : y * -1,
		},
		none: {},
	};

	return (
		<Motion
			variants={variants}
			initial="initial"
			animate={{ opacity: 1, y: 0 }}
			exit={{
				opacity: 0,
				y: direction > 0 ? y * -1 : y,
				transition: { ...transition, delay: direction > 0 ? appearDelay : disappearDelay },
			}}
			transition={{ ...transition, delay: direction > 0 ? appearDelay : disappearDelay }}
		>
			{children}
		</Motion>
	);
};
