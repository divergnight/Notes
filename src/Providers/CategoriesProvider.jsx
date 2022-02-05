import { v4 as uuid } from 'uuid';
export class CategoriesProvider {
	categories;
	key;

	constructor() {
		this.key = `categories`;
		this.categories = this.get();
	}

	save() {
		localStorage.setItem(this.key, JSON.stringify(this.categories));
	}

	load() {
		let datas = localStorage.getItem(this.key);
		this.categories = datas ? JSON.parse(datas) : [];
	}

	get() {
		this.load();
		return this.categories;
	}

	add(category) {
		const id = uuid();
		category.id = id;
		this.categories.push(category);
		this.save();
	}

	edit(id, category) {
		this.load();
		this.categories = this.categories.map(a => (a.id === id ? category : a));
		this.save();
	}

	del(id) {
		this.categories.map((a, idx) => {
			if (a.id === id) this.categories.splice(idx, 1);
		});

		if (this.categories.length > 0) {
			this.save();
		} else {
			this.clear();
		}
	}

	clear() {
		localStorage.removeItem(this.key);
	}
}
