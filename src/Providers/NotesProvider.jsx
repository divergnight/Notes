import { v4 as uuid } from 'uuid';
export class MembersProvider {
	notes;
	key;

	constructor(notebook_id) {
		this.key = `notes-${notebook_id}`;
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
		this.notes.push(note);
		this.save();
	}

	edit(index, note) {
		this.load();
		this.notes[index] = note;
		this.save();
	}

	del(index) {
		this.notes.splice(index, 1);

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
