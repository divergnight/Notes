import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import Categories from '../../Components/Categories/Categories';
import IconBack from '../../Components/Icons/IconBack';
import IconGridMode from '../../Components/Icons/IconGridMode';
import IconListMode from '../../Components/Icons/IconListMode';
import { CurrentProvider } from '../../Providers/CurrentProvider';
import { DisplayProvider } from '../../Providers/DisplayProvider';
import './SettingsPage.css';

export default function SettingsPage() {
	const [search, setSearch] = useState('');
	const [categories, setCategories] = useState([]);
	const [display, setDisplay] = useState(false);

	const navigate = useNavigate();

	const currentProvider = new CurrentProvider();
	const origin = currentProvider.get().lastpath;
	const displayProvider = new DisplayProvider();

	useEffect(() => {
		let display = displayProvider.get();
		setDisplay(display);
	}, []);

	function changeDisplay(arg, value) {
		let tmp = displayProvider.get();
		tmp[arg] = value;
		displayProvider.edit(arg, tmp[arg]);
		setDisplay(tmp);
	}

	return (
		<>
			<AppNavbar search={search} setSearch={setSearch} />
			<main>
				<Container fluid>
					<Row>
						<Col md={4} lg={3} xl={3} xxl={2} id="Settings-Settings">
							<div id="Settings-Back" onClick={() => navigate(origin)}>
								<IconBack />
							</div>
							<p>Mode d'affichage :</p>
							<div id="Settings-DisplayMode" onClick={() => changeDisplay('mode', !display.mode)}>
								{display.mode ? (
									<>
										<IconGridMode />
										<p>Grid</p>
									</>
								) : (
									<>
										<IconListMode />
										<p>List</p>
									</>
								)}
							</div>
							<p>Theme :</p>

							<Form>
								<Form.Select value={display.theme} onChange={e => changeDisplay('theme', e.target.value)} id="Settings-DisplayTheme">
									<option value={'dark'}>Dark</option>
									<option value={'light'}>Light</option>
								</Form.Select>
							</Form>
						</Col>
						<Col>
							<Categories categories={categories} setCategories={setCategories} search={search} />
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}
