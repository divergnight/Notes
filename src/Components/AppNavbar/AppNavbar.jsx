import { Container, Nav, Navbar, InputGroup, Button, FormControl } from 'react-bootstrap';
import './AppNavbar.css';
import { Link } from 'react-router-dom';
import IconSearch from '../Icons/IconSearch';
import { useEffect, useState } from 'react';
import { FavoritesProvider } from '../../Providers/FavoritesProvider';

export default function AppNavbar(props) {
	const notebooks = props.notebooks;
	const search = props.search;
	const setSearch = props.setSearch;
	const [favorites, setFavorites] = useState([]);
	const favoritesProvider = new FavoritesProvider();

	useEffect(() => {
		let datas = favoritesProvider.get();
		setFavorites(datas);
	}, [notebooks]);

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
							<Nav className="me-auto">
								<Nav.Link className="Navbar-nav-link" as={Link} to={'/'}>
									Home
								</Nav.Link>
								{favorites.map((favorite, index) => {
									return (
										<Nav.Link key={index} className="Navbar-nav-link" as={Link} to={'/'}>
											{favorite.title}
										</Nav.Link>
									);
								})}
							</Nav>
							<Nav>
								<InputGroup id="Navbar-nav-search">
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
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
}
