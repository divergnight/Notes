import { useEffect, useState } from 'react';
import { Card, Fade, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { DateConverter } from '../../Providers/DateConverter';
import { FavoritesProvider } from '../../Providers/FavoritesProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';
import IconCheck from '../Icons/IconCheck';
import IconDelete from '../Icons/IconDelete';
import IconEditWrite from '../Icons/IconEditWrite';
import IconFavorite from '../Icons/IconFavorite';
import IconUnfavorite from '../Icons/IconUnfavorite';
import './Notebook.css';

export default function Notebook(props) {
	const [writeable, setWriteable] = useState(false);
	const [notes, setNotes] = useState(0);
	const [open, setOpen] = useState(false);
	let notebook = props.notebook;
	const setNotebooks = props.setNotebooks;
	const display = props.display;

	const navigate = useNavigate();

	const dateConverter = new DateConverter(notebook.created);
	const currentProvider = new CurrentProvider();
	const favoritesProvider = new FavoritesProvider();
	const notebooksProvider = new NotebooksProvider();
	const notebookProvider = new NotebookProvider(notebook.id);

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
		if (notes !== 0) return;
		setOpen(false);
		setTimeout(() => {
			favoritesProvider.del(notebook.id);
			notebooksProvider.del(notebook.id);
			let tmp = notebooksProvider.get();
			setNotebooks(tmp);
		}, 200);
	}

	function rename(e) {
		e.stopPropagation();
		if (notebook.title.trim().length === 0) return;
		setWriteable(!writeable);
		notebooksProvider.edit(notebook.id, notebook);
	}

	function changeValue(e) {
		notebook.title = e.target.value;
		setNotebooks(o => [...o]);
	}

	function openNotebook() {
		currentProvider.set('notebook', notebook.id);
		navigate('/notebook');
	}

	function countNotes() {
		setNotes(notebookProvider.get().length);
	}

	useEffect(() => {
		countNotes();
		setTimeout(() => {
			setOpen(true);
		}, 200);
	}, []);

	return (
		<Fade in={open}>
			<Card
				className={display.mode ? 'Notebook-card-grid' : 'Notebook-card-list'}
				onClick={openNotebook}
				bg={display.theme}
				text={display.theme === 'dark' ? 'light' : 'dark'}
				border={display.theme}
			>
				<Card.Body>
					<span className="Notebook-favorite" onClick={e => updateFavorite(e)}>
						{notebook.favorite ? <IconFavorite /> : <IconUnfavorite />}
					</span>
					<span className="Notebook-rename" onClick={e => rename(e)}>
						{writeable ? <IconCheck /> : <IconEditWrite />}
					</span>
					{notes === 0 && (
						<span className="Notebook-delete" onClick={e => del(e)}>
							<IconDelete />
						</span>
					)}
					<Card.Title className="Notebook-title">
						{writeable ? (
							<input
								value={notebook.title}
								onChange={e => changeValue(e)}
								onClick={e => e.stopPropagation()}
								className="Notebook-title-rename"
								autoFocus
							></input>
						) : (
							notebook.title
						)}
					</Card.Title>
					<Card.Text className="Notebook-count">Notes : {notes}</Card.Text>
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
