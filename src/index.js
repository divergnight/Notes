import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import NotebookPage from './Pages/NotebookPage/NotebookPage';
import AddNotePage from './Pages/AddNotePage/AddNotePage';
import EditNotePage from './Pages/EditNotePage/EditNotePage';
import PreviewNotePage from './Pages/PreviewNotePage/PreviewNotePage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/notebook" element={<NotebookPage />} />
				<Route path="/notebook/add" element={<AddNotePage />} />
				<Route path="/notebook/edit" element={<EditNotePage />} />
				<Route path="/notebook/preview" element={<PreviewNotePage />} />
				<Route path="/settings" element={<SettingsPage />} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
