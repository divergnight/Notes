import { useEffect, useState } from 'react';
import { Card, Fade } from 'react-bootstrap';
import { DateConverter } from '../../Providers/DateConverter';
import { FavoritesProvider } from '../../Providers/FavoritesProvider';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';
import IconFavorite from '../Icons/IconFavorite';
import IconUnfavorite from '../Icons/IconUnfavorite';
import './Notebook.css';

export default function Notebook(props) {
	const [open, setOpen] = useState(false);
	let notebook = props.notebook;
	const setNotebooks = props.setNotebooks;

	const dateConverter = new DateConverter(notebook.created);
	const favoritesProvider = new FavoritesProvider();
	const notebooksProvider = new NotebooksProvider();

	function updateFavorite() {
		notebook.favorite = !notebook.favorite;
		notebooksProvider.edit(notebook.id, notebook);
		setNotebooks(o => [...o]);
		notebook.favorite ? favoritesProvider.add(notebook, notebook.id) : favoritesProvider.del(notebook.id);
	}

	useEffect(() => {
		setTimeout(() => {
			setOpen(true);
		}, 200);
	}, []);

	return (
		<Fade in={open}>
			<Card className="Notebook-card">
				<Card.Body>
					<span onClick={updateFavorite}>{notebook.favorite ? <IconFavorite /> : <IconUnfavorite />}</span>
					<Card.Title className="Notebook-title">{notebook.title}</Card.Title>
					<Card.Text className="Notebook-date text-muted">{dateConverter.get()}</Card.Text>
				</Card.Body>
			</Card>
		</Fade>
	);
}
