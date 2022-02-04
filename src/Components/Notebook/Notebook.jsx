import { useEffect, useState } from 'react';
import { Card, Fade } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { DateConverter } from '../../Providers/DateConverter';
import { FavoritesProvider } from '../../Providers/FavoritesProvider';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';
import IconDelete from '../Icons/IconDelete';
import IconFavorite from '../Icons/IconFavorite';
import IconUnfavorite from '../Icons/IconUnfavorite';
import './Notebook.css';

export default function Notebook(props) {
	const [open, setOpen] = useState(false);
	let notebook = props.notebook;
	const setNotebooks = props.setNotebooks;
	const display = props.display;

	const navigate = useNavigate();

	const dateConverter = new DateConverter(notebook.created);
	const currentProvider = new CurrentProvider();
	const favoritesProvider = new FavoritesProvider();
	const notebooksProvider = new NotebooksProvider();

	function updateFavorite(e) {
		e.stopPropagation();
		if (favoritesProvider.get(notebook, notebook.id).length >= 5 && !notebook.favorite) return;
		notebook.favorite = !notebook.favorite;
		notebooksProvider.edit(notebook.id, notebook);
		setNotebooks(o => [...o]);
		notebook.favorite ? favoritesProvider.add(notebook, notebook.id) : favoritesProvider.del(notebook.id);
	}

	function del(e) {
		e.stopPropagation();
		setOpen(false);
		setTimeout(() => {
			favoritesProvider.del(notebook.id);
			notebooksProvider.del(notebook.id);
			let tmp = notebooksProvider.get();
			setNotebooks(tmp);
		}, 200);
	}

	function openNotebook() {
		currentProvider.set('notebook', notebook.id);
		navigate('/notebook');
	}

	useEffect(() => {
		setTimeout(() => {
			setOpen(true);
		}, 200);
	}, []);

	return (
		<Fade in={open}>
			<Card className={display.mode ? 'Notebook-card-grid' : 'Notebook-card-list'} onClick={openNotebook}>
				<Card.Body>
					<span className="Notebook-favorite" onClick={e => updateFavorite(e)}>
						{notebook.favorite ? <IconFavorite /> : <IconUnfavorite />}
					</span>
					<span className="Notebook-delete" onClick={e => del(e)}>
						<IconDelete />
					</span>
					<Card.Title className="Notebook-title">{notebook.title}</Card.Title>
					<Card.Text
						className="Notebook-date text-muted"
						onClick={e => {
							e.stopPropagation();
						}}
					>
						{dateConverter.get()}
					</Card.Text>
				</Card.Body>
			</Card>
		</Fade>
	);
}
