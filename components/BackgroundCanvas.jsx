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
			r: 10,
			g: 10,
			b: 10,
		};
		const dotAlpha = 255;

		const numberOfRender = 15;
		let renderImage = [];
		let index = 0;

		function init() {
			renderImage = [];

			for (let j = 0; j < numberOfRender; j++) {
				imageData = ctx.createImageData(canvas.width, canvas.height);
				data = imageData.data;
				for (let i = 0; i < data.length; i += 40) {
					data[i] = rgb.r;
					data[i + 1] = rgb.g;
					data[i + 2] = rgb.b;
					data[i + 3] = (Math.random() * dotAlpha) | 0;
				}
				renderImage.push(imageData);
			}
		}

		function draw() {
			const length = renderImage.length;

			ctx.putImageData(renderImage[index], 0, 0);
			index = (index + 1 + length) % length;
		}

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			init();
		}

		window.addEventListener("resize", resize);
		init();

		const animate = setInterval(() => {
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				draw();
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
			{children}
		</Box>
	);
};

export default BackgroundCanvas;
