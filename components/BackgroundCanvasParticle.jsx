import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { color } from "/styles/fontColor";

const BackgroundCanvasParticle = ({ children }) => {
	useEffect(() => {
		const canvas = document.getElementById("canvasBgParticle");
		let ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles = [];
		let hue = 140;
		const mouse = {
			x: null,
			y: null,
		};
		addEventListener("mousemove", (e) => {
			const dx = mouse.x - e.x;
			const dy = mouse.y - e.y;
			const distance = Math.sqrt(dx ** 2 + dy ** 2);
			if (distance >= 20) {
				mouse.x = e.x;
				mouse.y = e.y;
				for (let i = 0; i < 2; i++) {
					const hueP = i % 2 === 0 ? 50 : 0;
					particles.push(new Particle(mouse.x, mouse.y, hueP));
				}
			}
		});

		class Particle {
			constructor(x, y, hueP) {
				this.x = x;
				this.y = y;
				this.size = 10;
				this.hue = hueP;

				this.speedX = Math.random() * 6 - 3;
				this.speedY = Math.random() * 6 - 3;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;
				this.size -= 0.1;
			}

			draw() {
				ctx.beginPath();
				ctx.fillStyle = "transparent";
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
			}
		}

		function handleParticle() {
			for (let i = 0; i < particles.length; i++) {
				particles[i].update();
				particles[i].draw();

				for (let j = i; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const distance = Math.sqrt(dx ** 2 + dy ** 2);

					if (distance < 100) {
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.lineWidth = 1;
						// ctx.strokeStyle = color.light;
						ctx.strokeStyle = `hsl(${hue + particles[i].hue},100%,40%)`;

						ctx.closePath();
						ctx.stroke();
					}
				}

				if (particles[i].size < 0.1) {
					particles.splice(i, 1);
					i--;
				}
			}
		}

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		window.addEventListener("resize", resize);

		const animate = setInterval(() => {
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				handleParticle();
				hue += 0.5;
			}
		}, 1000 / 60);

		return () => {
			ctx = null;
			clearInterval(animate);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<Box
			as="canvas"
			id="canvasBgParticle"
			zIndex={-10}
			pos="fixed"
			top="0"
			left="0"
			w="100%"
			h="100vh"
			pointerEvents={"none"}
		/>
	);
};

export default BackgroundCanvasParticle;
