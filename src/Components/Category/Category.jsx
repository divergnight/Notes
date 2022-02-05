import { useEffect, useState } from 'react';
import { Card, Fade } from 'react-bootstrap';
import { CategoriesProvider } from '../../Providers/CategoriesProvider';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { FavoritesProvider } from '../../Providers/FavoritesProvider';
import IconCheck from '../Icons/IconCheck';
import IconDelete from '../Icons/IconDelete';
import IconEditWrite from '../Icons/IconEditWrite';
import './Category.css';

export default function Category(props) {
	const [writeable, setWriteable] = useState(false);
	const [open, setOpen] = useState(false);
	let category = props.category;
	const setCategories = props.setCategories;

	const categoriesProvider = new CategoriesProvider();

	function del(e) {
		e.stopPropagation();
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

	useEffect(() => {
		setTimeout(() => {
			setOpen(true);
		}, 200);
	}, []);

	return (
		<Fade in={open}>
			<Card className="Notebook-card-list">
				<Card.Body>
					<span className="Notebook-rename" onClick={e => rename(e)}>
						{writeable ? <IconCheck /> : <IconEditWrite />}
					</span>
					<span className="Notebook-delete" onClick={e => del(e)}>
						<IconDelete />
					</span>
					<Card.Title className="Notebook-title">
						{writeable ? (
							<input
								value={category.name}
								onChange={e => changeValue(e)}
								onClick={e => e.stopPropagation()}
								className="Notebook-title-rename"
								autoFocus
							></input>
						) : (
							category.name
						)}
					</Card.Title>
				</Card.Body>
			</Card>
		</Fade>
	);
}
