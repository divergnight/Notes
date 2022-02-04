export class CurrentProvider {
	key;
	current;

	constructor() {
		this.key = `currentLocation`;
		this.current = this.get();
	}

	save() {
		localStorage.setItem(this.key, JSON.stringify(this.current));
	}

	load() {
		let datas = localStorage.getItem(this.key);
		this.current = datas ? JSON.parse(datas) : {};
	}

	get() {
		this.load();
		return this.current;
	}

	set(key, value) {
		this.load();
		this.current[key] = value;
		this.save();
	}

	clear() {
		localStorage.removeItem(this.key);
	}
}
