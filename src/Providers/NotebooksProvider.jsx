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
		this.notebooks.push(notebook);
		this.save();
	}

	del(index) {
		this.notebooks.splice(index, 1);

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
