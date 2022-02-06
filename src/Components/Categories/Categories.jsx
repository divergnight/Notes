import { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import './Categories.css';
import { CategoriesProvider } from '../../Providers/CategoriesProvider';
import Category from '../Category/Category';

export default function Categories(props) {
	const categories = props.categories;
	const setCategories = props.setCategories;
	const search = props.search;

	const [filterCategories, setFilterCategories] = useState([]);

	const categoriesProvider = new CategoriesProvider();

	function load() {
		let datas = categoriesProvider.get();
		setCategories(datas);
	}

	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
		setFilterCategories(categories.filter(a => a.name.trim().toLowerCase().indexOf(search.trim().toLowerCase()) != -1 && a.id != 0));
	}, [categories, search]);

	function add(e) {
		e.preventDefault();
		let input = document.getElementById('Categories-Add-Input');
		if (input.value.trim().length === 0) return;
		categoriesProvider.add({ name: input.value.trim() });
		input.value = '';
		input.focus();
		load();
	}

	return (
		<Container fluid id="Categories" className="app-container rounded-3">
			<Row>
				<div>
					<Form onSubmit={e => add(e)} id="Categories-Add">
						<InputGroup>
							<FormControl id="Categories-Add-Input" placeholder="Add a category" maxLength="30" required />
							<Button type="submit">+</Button>
						</InputGroup>
					</Form>
				</div>
			</Row>
			<Row>
				<h1>Categories</h1>
				<hr />
				<div id="Categories-result">
					{filterCategories
						.sort((a, b) => a.name.localeCompare(b.name))
						.map(category => (
							<Col key={category.id} xs={12}>
								<Category setCategories={setCategories} category={category}></Category>
							</Col>
						))}
				</div>
			</Row>
		</Container>
	);
}
