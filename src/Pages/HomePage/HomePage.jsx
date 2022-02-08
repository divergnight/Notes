import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Notebooks from '../../Components/Notebooks/Notebooks';
import StatisticsNotebooksPanel from '../../Components/StatisticsNotebooksPanel/StatisticsNotebooksPanel';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import './HomePage.css';

export default function HomePage() {
	const [search, setSearch] = useState('');
	const [notebooks, setNotebooks] = useState([]);

	const currentProvider = new CurrentProvider();

	useEffect(() => {
		currentProvider.del('note');
		currentProvider.del('notebook');
	}, []);

	return (
		<>
			<AppNavbar notebooks={notebooks} search={search} setSearch={setSearch} />
			<main>
				<Container fluid>
					<Row>
						<Col>
							<Notebooks notebooks={notebooks} setNotebooks={setNotebooks} search={search} />
						</Col>
						<Col md={4} lg={3} xl={3} xxl={2} className="order-first order-md-last">
							<StatisticsNotebooksPanel notebooks={notebooks} />
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
