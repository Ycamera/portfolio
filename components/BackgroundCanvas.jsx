import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

const BackgroundCanvas = ({ children }) => {
	useEffect(() => {
		const canvas = document.getElementById("canvasBg");
		let ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		let imageData = ctx.createImageData(canvas.width, canvas.height);
		let data = imageData.data;

		const rgb = {
			r: 30,
			g: 30,
			b: 30,
		};
		const dotAlpha = 256;

		function init() {
			for (let i = 0; i < data.length; i += 40) {
				data[i] = rgb.r;
				data[i + 1] = rgb.g;
				data[i + 2] = rgb.b;
				data[i + 3] = (Math.random() * dotAlpha) | 0;
				// for (let x = 0; x < canvas.width; x++) {}
			}
			ctx.putImageData(imageData, 0, 0);
		}

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			imageData = ctx.createImageData(canvas.width, canvas.height);
			data = imageData.data;
		}
		window.addEventListener("resize", resize);

		const animate = setInterval(() => {
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				init();
			} else {
			}
		}, 1000 / 30);

		return () => {
			ctx = null;
			clearInterval(animate);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<Box>
			<Box
				as="canvas"
				id="canvasBg"
				zIndex={100}
				top="0"
				left="0"
				pos="fixed"
				w="100%"
				h="100vh"
				pointerEvents={"none"}
			></Box>
			<Box>{children}</Box>
		</Box>
	);
};

export default BackgroundCanvas;
