import React from "react";
import styled from "styled-components";

/*---> Component <---*/
function SignoutButton({ children, ...restProps }) {
	return (
		<div>
			<Link href="/" {...restProps}>
				{children}
			</Link>
		</div>
	);
}

/*---> Styles <---*/
export const Link = styled.a`
	display: block;
	background-color: #e50914;
	width: 94px;
	height: fit-content;
	color: #fff;
	border: 0;
	font-size: 15px;
	border-radius: 3px;
	padding: 8px 17px;
	cursor: pointer;
	align: right;
`;

export default SignoutButton;
