import { useEffect, useState } from 'react';
import { Card, Fade } from 'react-bootstrap';
import { CategoriesProvider } from '../../Providers/CategoriesProvider';
import { NotebookProvider } from '../../Providers/NotebookProvider';
import { NotebooksProvider } from '../../Providers/NotebooksProvider';
import IconCheck from '../Icons/IconCheck';
import IconDelete from '../Icons/IconDelete';
import IconEditWrite from '../Icons/IconEditWrite';
import './Category.css';

export default function Category(props) {
	const [writeable, setWriteable] = useState(false);
	const [notes, setNotes] = useState(0);
	const [open, setOpen] = useState(false);
	let category = props.category;
	const setCategories = props.setCategories;

	const categoriesProvider = new CategoriesProvider();

	function del(e) {
		e.stopPropagation();
		if (notes !== 0) {
			alert();
			return;
		}
		setOpen(false);
		setTimeout(() => {
			categoriesProvider.del(category.id);
			let tmp = categoriesProvider.get();
			setCategories(tmp);
		}, 200);
	}

	function rename(e) {
		e.stopPropagation();
		if (category.name.trim().length === 0) return;

		setWriteable(!writeable);
		categoriesProvider.edit(category.id, category);
	}

	function changeValue(e) {
		category.name = e.target.value.trim();
		setCategories(o => [...o]);
	}

	function countNotes() {
		let count = 0;
		const notebooksProvider = new NotebooksProvider();
		notebooksProvider.get().map(notebook => {
			const notebookProvider = new NotebookProvider(notebook.id);
			notebookProvider.get().map(note => {
				if (note.category === category.id) count += 1;
			});
		});
		setNotes(count);
	}

	useEffect(() => {
		countNotes();
		setTimeout(() => {
			setOpen(true);
		}, 200);
	}, []);

	return (
		<Fade in={open}>
			<Card className="Category-card">
				<Card.Body>
					<span className="Category-rename" onClick={e => rename(e)}>
						{writeable ? <IconCheck /> : <IconEditWrite />}
					</span>
					{!notes && (
						<span className="Category-delete" onClick={e => del(e)}>
							<IconDelete />
						</span>
					)}
					<Card.Title className="Category-title">
						{writeable ? (
							<input
								value={category.name}
								onChange={e => changeValue(e)}
								onClick={e => e.stopPropagation()}
								className="Category-title-rename"
								autoFocus
							></input>
						) : (
							category.name
						)}
					</Card.Title>
					<Card.Text className="Category-count">Notes : {notes}</Card.Text>
					{notes != 0 && (
						<Card.Text className="Categorie-alert-message text-muted">
							<span>You can only delete empty categories.</span>
						</Card.Text>
					)}
				</Card.Body>
			</Card>
		</Fade>
	);
}
