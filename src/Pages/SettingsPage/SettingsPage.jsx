import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Categories from '../../Components/Categories/Categories';
import './SettingsPage.css';

export default function SettingsPage() {
	const [search, setSearch] = useState('');
	const [categories, setCategories] = useState([]);

	return (
		<div>
			<AppNavbar search={search} setSearch={setSearch} />
			<main>
				<Container fluid>
					<Row>
						<Col md={4} lg={3} xl={3} xxl={2} id="Settings-Settings"></Col>
						<Col>
							<Categories categories={categories} setCategories={setCategories} search={search} />
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
