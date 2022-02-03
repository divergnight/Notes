import { useState } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notebooks from '../../Components/Notebooks/Notebooks';
import './HomePage.css';

export default function HomePage() {
	const [search, setSearch] = useState('');
	const [notebooks, setNotebooks] = useState([]);

	return (
		<div>
			<AppNavbar search={search} setSearch={setSearch} />
			<main>
				<Container fluid>
					<Row>
						<Col>
							<Notebooks notebooks={notebooks} setNotebooks={setNotebooks} search={search} />
						</Col>
						<Col md={4} lg={3} xl={3} xxl={2} className="order-first order-md-last">
							<Container fluid id="HomePage-Stats" className="app-container rounded-3">
								<h2>Stats</h2>
								<hr />
								<p>Number of notebooks : {notebooks.length}</p>
							</Container>
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
