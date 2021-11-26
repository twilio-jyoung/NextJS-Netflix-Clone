import "../styles/globals.css";
import Script from "next/script";
import * as snippet from "@segment/snippet";
// import { useEffect } from "react";
import { FirebaseContext } from "../context/FirbaseContext";
// import { useRouter } from "next/router";
// import Script from "next/script";
import firebase from "../lib/firebase.prod";

function renderSnippet() {
	const opts = {
		apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
		// note: the page option only covers SSR tracking.
		// Page.js is used to track other events using `window.analytics.page()`
		page: true,
	};

	if (process.env.NODE_ENV === "development") {
		return snippet.max(opts);
	}

	return snippet.min(opts);
}

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Script dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
			<FirebaseContext.Provider value={firebase}>
				<Component {...pageProps} />
			</FirebaseContext.Provider>
		</>
	);
}

export default MyApp;
