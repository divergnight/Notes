import { useEffect, useState } from 'react';
import { Card, Fade } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { DateConverter } from '../../Providers/DateConverter';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import IconDelete from '../Icons/IconDelete';
import './Note.css';

export default function Notebook(props) {
	const [open, setOpen] = useState(false);
	let note = props.note;
	const setNotes = props.setNotes;
	const display = props.display;

	const navigate = useNavigate();

	const dateConverter = new DateConverter(note.created);
	const currentProvider = new CurrentProvider();
	const notebookProvider = new NotebookProvider(currentProvider.get().notebook);

	function del(e) {
		e.stopPropagation();
		setOpen(false);
		setTimeout(() => {
			notebookProvider.del(note.id);
			let tmp = notebookProvider.get();
			setNotes(tmp);
		}, 200);
	}

	function openNote() {
		currentProvider.set('note', note.id);
		navigate('/note');
	}

	useEffect(() => {
		setTimeout(() => {
			setOpen(true);
		}, 200);
	}, []);

	return (
		<Fade in={open}>
			<Card className={display.mode ? 'Note-card-grid' : 'Note-card-list'} onClick={openNote}>
				<Card.Body>
					<span className="Note-delete" onClick={e => del(e)}>
						<IconDelete />
					</span>
					<Card.Title className="Note-title">{note.title}</Card.Title>
					<Card.Text
						className="Note-date text-muted"
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
