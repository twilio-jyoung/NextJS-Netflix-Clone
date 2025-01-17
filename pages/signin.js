import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../context/FirbaseContext";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import Navbar from "../components/Header/Navbar";
import Logo from "../components/Header/Logo";
import FooterCompound from "../compounds/FooterCompound";
import SignFormWrapper from "../components/SignForm/SignFormWrapper";
import SignFormBase from "../components/SignForm/SignFormBase";
import SignFormTitle from "../components/SignForm/SignFormTitle";
import SignFormInput from "../components/SignForm/SignFormInput";
import SignFormButton from "../components/SignForm/SignFormButton";
import SignFormText from "../components/SignForm/SignFormText";
import SignFormLink from "../components/SignForm/SignFormLink";
import SignFormCaptcha from "../components/SignForm/SignFormCaptcha";
import SignFormError from "../components/SignForm/SignFormError";
import Warning from "../components/Feature/Warning";
import Head from "next/head";

function SigninPage() {
	const history = useRouter();
	const firebase = useContext(FirebaseContext);
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const IsInvalid = password === "" || emailAddress === "";

	const handleSubmit = (event) => {
		event.preventDefault();

		firebase
			.auth()
			.signInWithEmailAndPassword(emailAddress, password)
			.then((result) => {
				global.analytics.identify(result.user.uid, {
					id: result.user.uid,
				});
				global.analytics.track("Sign In");

				setEmailAddress("");
				setPassword("");
				setError("");
				history.push("/browse");
			})
			.catch((error) => {
				global.analytics.track("Error - Sign In", {
					error: error.message,
					email: emailAddress,
				});
				setError(error.message);
			});
	};

	return (
		<>
			<Head>
				<title>Netflix - Sign In</title>
				<meta charSet="utf-8" />
				<meta name="description" content="Netflix Clone Built Using NEXT.JS" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<HeaderWrapper>
				<Navbar>
					<Logo />
				</Navbar>
				<SignFormWrapper>
					<SignFormBase onSubmit={handleSubmit} method="POST">
						<Warning>NOT official Netflix</Warning>
						<SignFormTitle>Sign In</SignFormTitle>
						{error ? <SignFormError>{error}</SignFormError> : null}
						<SignFormInput
							type="text"
							placeholder="Email Address"
							value={emailAddress}
							onChange={({ target }) => setEmailAddress(target.value)}
						/>
						<SignFormInput
							type="password"
							placeholder="Password"
							autoComplete="off"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<SignFormButton disabled={IsInvalid}>Sign In</SignFormButton>
						<SignFormText>
							New to Netflix?
							<SignFormLink href="/signup">Sign up now.</SignFormLink>
						</SignFormText>
						<SignFormCaptcha>
							This page is protected by Google reCAPTCHA to ensure you are not a
							bot.
						</SignFormCaptcha>
					</SignFormBase>
				</SignFormWrapper>
			</HeaderWrapper>
			<FooterCompound />
		</>
	);
}

export default SigninPage;
