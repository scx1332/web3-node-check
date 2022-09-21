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
				<div>
					<CheckNode address="http://51.178.88.224:11333"/>
				</div>
				<div>
					<CheckNode address="http://51.178.88.224/polygon"/>
				</div>
				<div>
					<CheckNode address="https://bor.golem.network"/>
				</div>
			</div>

			<div>
				Config data:
				{JSON.stringify(configData, null, 2)}
			</div>
		</div>
	);
}

export default MainPage;
