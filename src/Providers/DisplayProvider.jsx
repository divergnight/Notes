export class DisplayProvider {
	key;
	display;

	constructor() {
		this.key = `display`;
		this.display = this.get();
	}

	save() {
		localStorage.setItem(this.key, JSON.stringify(this.display));
	}

	load() {
		let datas = localStorage.getItem(this.key);
		this.display = datas ? JSON.parse(datas) : { mode: 'card', theme: 'dark' };
	}

	get() {
		this.load();
		return this.display;
	}

	edit(id, value) {
		this.load();
		this.display[id] = value;
		this.save();
	}

	clear() {
		localStorage.removeItem(this.key);
	}
}
