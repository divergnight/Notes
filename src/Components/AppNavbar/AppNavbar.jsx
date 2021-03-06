import { Container, Nav, Navbar, InputGroup, Button, FormControl } from 'react-bootstrap';
import './AppNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import IconSearch from '../Icons/IconSearch';
import { useEffect, useState } from 'react';
import { FavoritesProvider } from '../../Providers/FavoritesProvider';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';

export default function AppNavbar(props) {
	const notebooks = props?.notebooks;
	const search = props?.search;
	const setSearch = props?.setSearch;
	const setNotebookID = props?.setNotebookID;
	const [favorites, setFavorites] = useState([]);
	const favoritesProvider = new FavoritesProvider();
	const currentProvider = new CurrentProvider();

	const displayProvider = new DisplayProvider();
	const display = displayProvider.get();

	const navigate = useNavigate();

	useEffect(() => {
		let root = document.documentElement;
		switch (display.theme) {
			case 'light':
				root.style.setProperty('--main-color', 'black');
				root.style.setProperty('--bg-color', '#dfdfdf');
				root.style.setProperty('--high-color', '#ff9623');
				break;
			default:
				root.style.setProperty('--main-color', 'whitesmoke');
				root.style.setProperty('--bg-color', '#070707');
				root.style.setProperty('--high-color', '#935615');
		}
	});

	useEffect(() => {
		let datas = favoritesProvider.get();
		setFavorites(datas);
	}, [notebooks]);

	function setCurrentNotebook(notebook) {
		currentProvider.set('notebook', notebook.id);
		if (setNotebookID) setNotebookID(notebook.id);
		navigate('/notebook');
	}

	return (
		<>
			<header id={'Main-theme-' + display.theme}>
				<Navbar bg={display.theme} variant={display.theme} expand="lg">
					<Container id="Navbar-nav-container">
						<Navbar.Brand as={Link} to="/">
							Notes
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav>
								<Nav.Link className="Navbar-nav-link" as={Link} to={'/'}>
									Home
								</Nav.Link>
								{favorites.map((favorite, index) => {
									return (
										<Nav.Link key={index} className="Navbar-nav-link Navbar-nav-favorite" onClick={() => setCurrentNotebook(favorite)}>
											{favorite.title}
										</Nav.Link>
									);
								})}
							</Nav>
							{search !== undefined && (
								<span className="Navbar-nav-search">
									<InputGroup>
										<FormControl
											placeholder="Search"
											value={search}
											onChange={e => {
												setSearch(e.target.value);
											}}
										/>
										<Button variant="primary">
											<IconSearch />
										</Button>
									</InputGroup>
								</span>
							)}
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
}
