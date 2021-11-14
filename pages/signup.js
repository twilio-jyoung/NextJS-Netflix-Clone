import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
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
import { analytics } from "firebase";
import { phone } from "phone";

function SignupPage() {
	const history = useRouter();
	const firebase = useContext(FirebaseContext);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNum, setPhoneNum] = useState("");
	const [error, setError] = useState("");

	const IsInvalid = password === "" || emailAddress === "" || firstName === "";

	function handleSubmit(event) {
		event.preventDefault();

		let numberValidation = phone(phoneNum);
		let formattedPhoneNumber = null;

		if (numberValidation.isValid)
			formattedPhoneNumber = numberValidation.phoneNumber;

		var planLevels = ["Basic", "Standard", "Premium"];
		var randomPlanLevel =
			planLevels[Math.floor(Math.random() * planLevels.length)];

		firebase
			.auth()
			.createUserWithEmailAndPassword(emailAddress, password)
			.then((result) => {
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, "0");
				var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
				var yyyy = today.getFullYear();

				today = `${yyyy}/${mm}/${dd}`;

				global.analytics.identify(result.user.uid, {
					firstName: firstName,
					lastName: lastName,
					email: emailAddress,
					phone: formattedPhoneNumber,
					id: result.user.uid,
					createdAt: today,
					memberSince: yyyy,
					planLevel: randomPlanLevel,
				});
				global.analytics.track("Sign Up");

				result.user
					.updateProfile({
						displayName: firstName,
					})
					.then((result) => {
						console.log(result);
						setFirstName("");
						setEmailAddress("");
						setPassword("");
						setPhoneNum("");
						history.push("/browse");
					});
			})
			.catch((error) => {
				global.analytics.track("Error - Sign Up", { error: error.message });
				setError(error.message);
			});
	}

	return (
		<>
			<Head>
				<title>Netflix - Sign Up</title>
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
						<SignFormTitle>Sign Up</SignFormTitle>
						{error ? <SignFormError>{error}</SignFormError> : null}
						<SignFormInput
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={({ target }) => setFirstName(target.value)}
						/>
						<SignFormInput
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={({ target }) => setLastName(target.value)}
						/>
						<SignFormInput
							type="tel"
							placeholder="Phone Number"
							autoComplete="off"
							value={phoneNum}
							onChange={({ target }) => setPhoneNum(target.value)}
						/>
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
						<SignFormButton disabled={IsInvalid}>Sign Up</SignFormButton>
						<SignFormText>
							Already a user?
							<SignFormLink href="/signin">Sign in now.</SignFormLink>
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

export default SignupPage;
