import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import NoteActionForm from '../../Components/NoteActionForm/NoteActionForm';
import './AddNotePage.css';

export default function AddNotePage() {
	return (
		<div>
			<AppNavbar />
			<main>
				<Container fluid>
					<Row>
						<NoteActionForm action={'add'} />
					</Row>
				</Container>
			</main>
		</div>
	);
}
