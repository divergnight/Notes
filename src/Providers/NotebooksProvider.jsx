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
		notebook.favorite = false;
		notebook.created = Date.now();
		this.notebooks.push(notebook);
		this.save();
	}

	edit(id, notebook) {
		this.load();
		this.notebooks = this.notebooks.map(a => (a.id === id ? notebook : a));
		this.save();
	}

	del(id) {
		this.notebooks.map((a, idx) => {
			if (a.id === id) this.notebooks.splice(idx, 1);
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
