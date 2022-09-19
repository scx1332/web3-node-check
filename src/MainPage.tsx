import './MainPage.css';
import configData from "./config.json";
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';
import CheckNode from "./CheckNode";



function MainPage() {
	return (
		<div className="App">
			<div className="top-header">
				<div className="top-header-title">
					Main page
				</div>
			</div>

			<div className="main-content">
				Test
				<CheckNode />

			</div>

			<div>
				Config data:
				{JSON.stringify(configData, null, 2)}
			</div>
		</div>
	);
}

export default MainPage;
