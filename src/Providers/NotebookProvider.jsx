import { v4 as uuid } from 'uuid';
export class NotebookProvider {
	notes;
	key;

	constructor(notebook_id) {
		this.key = `notebook-${notebook_id}`;
		this.notes = this.get();
	}

	save() {
		localStorage.setItem(this.key, JSON.stringify(this.notes));
	}

	load() {
		let datas = localStorage.getItem(this.key);
		this.notes = datas ? JSON.parse(datas) : [];
	}

	get() {
		this.load();
		return this.notes;
	}

	add(note) {
		const id = uuid();
		note.id = id;
		note.created = Date.now();
		if (!this.notes.some(category => category.name === 'any')) this.notes.push({ id: '0', name: 'any', notes: [note] });
		else
			this.notes = this.notes.map(category => {
				if (category.name === 'any') category.notes.push(note);
				return category;
			});
		this.save();
	}

	edit(id, note) {
		this.load();
		this.notes = this.notes.map(category => {
			category.notes = category.notes.map((a, idx) => {
				if (a.id === id) return note;
				return a;
			});
			return category;
		});
		this.save();
	}

	del(id) {
		this.notes = this.notes.map(category => {
			category.notes.map((a, idx) => {
				if (a.id === id) category.notes.splice(idx, 1);
			});
			return category;
		});

		if (this.notes.length > 0) {
			this.save();
		} else {
			this.clear();
		}
	}

	clear() {
		localStorage.removeItem(this.key);
	}
}
