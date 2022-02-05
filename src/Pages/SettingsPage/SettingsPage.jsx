import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Categories from '../../Components/Categories/Catgories';
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
						<Col>
							<Categories categories={categories} setCategories={setCategories} search={search} />
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
