import "../styles/globals.css";
import BackgroundCanvas from "/components/BackgroundCanvas";
import Nav from "/components/Nav";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<BackgroundCanvas>
				<Nav />
				<Component {...pageProps} />
			</BackgroundCanvas>
		</ChakraProvider>
	);
}

export default MyApp;
