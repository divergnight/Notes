import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import './NotePage.css';

export default function NotePage() {
	return (
		<div>
			<AppNavbar />
			<main>
				<Container fluid>
					<Row>
						<Col></Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}
