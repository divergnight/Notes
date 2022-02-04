import { Container, Nav, Navbar, InputGroup, Button, FormControl } from 'react-bootstrap';
import './AppNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import IconSearch from '../Icons/IconSearch';
import { useEffect, useState } from 'react';
import { FavoritesProvider } from '../../Providers/FavoritesProvider';

export default function AppNavbar(props) {
	const notebooks = props?.notebooks;
	const search = props?.search;
	const setSearch = props?.setSearch;
	const setNotebookID = props?.setNotebookID;
	const [favorites, setFavorites] = useState([]);
	const favoritesProvider = new FavoritesProvider();

	const navigate = useNavigate();

	useEffect(() => {
		let datas = favoritesProvider.get();
		setFavorites(datas);
	}, [notebooks]);

	function setCurrentNotebook(notebook) {
		localStorage.setItem('currentNotebook', notebook.id);
		setNotebookID && setNotebookID(notebook.id);
		navigate('/notebook');
	}

	return (
		<>
			<header>
				<Navbar bg="light" expand="lg">
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
											placeholder="Rechercher"
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
