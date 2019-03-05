import React from "react";
import { Link } from "react-router-dom";
import {tokenDel} from '../../store.js';
import {connect} from 'react-redux';
import './index.css';

let mapDispatchToProps = {tokenDel}

let Btn = p =>{
	return (
		<li className="li" onClick = {p.tokenDel}>
			<Link className="link" to="/">
				Log out
			</Link>
		</li>
	)
}

Btn = connect(state=>({}), mapDispatchToProps)(Btn)

const Header = () => (
	<header className="header">
		<nav className="nav">
			<ul className="list">
				<li className="li">
					<Link className="link" to="/">
						SignIn
					</Link>
				</li>
				<li className="li">
					<Link className="link" to="/to-do">
						To-Do
					</Link>
				</li>
				<Btn />
			</ul>
		</nav>
	</header>
);

export default Header;
