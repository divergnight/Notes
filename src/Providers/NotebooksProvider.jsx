import { v4 as uuid } from 'uuid';
export class NotebooksProvider {
	notebooks;
	key;

	constructor() {
		this.key = `notebooks`;
		this.notebooks = this.get();
	}

	save() {
		localStorage.setItem(this.key, JSON.stringify(this.notebooks));
	}

	load() {
		let datas = localStorage.getItem(this.key);
		this.notebooks = datas ? JSON.parse(datas) : [];
	}

	get() {
		this.load();
		return this.notebooks;
	}

	add(notebook) {
		const id = uuid();
		notebook.id = id;
		notebook.created = Date.now();
		notebook.favorite = false;
		if (!this.notebooks.some(category => category.name === 'any')) this.notebooks.push({ id: '0', name: 'any', notebooks: [notebook] });
		else
			this.notebooks = this.notebooks.map(category => {
				if (category.name === 'any') category.notebooks.push(notebook);
				return category;
			});
		this.save();
	}

	edit(id, notebook) {
		this.load();
		this.notebooks = this.notebooks.map(a => {
			return a.id === id ? notebook : a;
		});
		this.save();
	}

	del(id) {
		this.notebooks = this.notebooks.map(category => {
			category.notebooks.map((a, idx) => {
				if (a.id === id) category.notebooks.splice(idx, 1);
			});
			return category;
		});

		if (this.notebooks.length > 0) {
			this.save();
		} else {
			this.clear();
		}
	}

	clear() {
		localStorage.removeItem(this.key);
	}
}
