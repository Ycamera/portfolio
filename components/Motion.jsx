import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

import { useContext } from "react";
import { TransitionDirection } from "/pages/index";

const Motion = motion(Slot);

export default Motion;

export const MotionY = ({ children, y = 0, appearDelay = 0, disappearDelay = 0 }) => {
	const { direction } = useContext(TransitionDirection);
	const transition = {
		duration: 0.5,
		// ease: [0.78, 0.09, 0.18, 1],
		type: "spring",
		stiffness: 50,
		mass: 0.7,
	};

	return (
		<Motion
			initial={{ opacity: 0, y: direction > 0 ? y : y * -1 }}
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
