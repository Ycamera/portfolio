import "../styles/globals.css";
import BackgroundCanvas from "/components/BackgroundCanvas";
import Nav from "/components/Nav";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [index, setIndex] = useState(0);
	const [firstRendering, setFirstRendering] = useState(0);

	return (
		<ChakraProvider>
			<BackgroundCanvas>
				<Nav setIndex={setIndex} />
				<AnimatePresence exitBeforeEnter>
					<Component
						{...pageProps}
						key={router.asPath}
						index={index}
						setIndex={setIndex}
						firstRendering={firstRendering}
						setFirstRendering={setFirstRendering}
					/>
				</AnimatePresence>
			</BackgroundCanvas>
		</ChakraProvider>
	);
}

export default MyApp;
