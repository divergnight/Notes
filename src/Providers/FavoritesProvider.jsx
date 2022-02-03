import { v4 as uuid } from 'uuid';
export class FavoritesProvider {
	favorites;
	key;

	constructor() {
		this.key = `favorites`;
		this.favorites = this.get();
	}

	save() {
		localStorage.setItem(this.key, JSON.stringify(this.favorites));
	}

	load() {
		let datas = localStorage.getItem(this.key);
		this.favorites = datas ? JSON.parse(datas) : [];
	}

	get() {
		this.load();
		return this.favorites;
	}

	add(favorite, id) {
		favorite.id = id;
		this.favorites.push(favorite);
		this.save();
	}

	del(id) {
		this.favorites.map((a, idx) => {
			if (a.id === id) this.favorites.splice(idx, 1);
		});

		if (this.favorites.length > 0) {
			this.save();
		} else {
			this.clear();
		}
	}

	clear() {
		localStorage.removeItem(this.key);
	}
}
