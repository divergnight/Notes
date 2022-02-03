import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export class DateConverter {
	time;

	constructor(time) {
		this.time = time;
	}

	get() {
		let created = new Date(this.time);
		let date = '';

		let diff = Math.ceil((Date.now() - created.getTime()) / 1000);

		//Today
		if (diff < 86400) {
			date = "aujourd'hui " + format(created, 'HH:mm');
		}

		//Yesterday
		else if (diff < 172800) {
			date = 'hier ' + format(created, 'HH:mm');
		}

		//Last week
		else if (diff < 604800) {
			date = format(created, 'EEEE HH:mm', { locale: fr });
		}
		//Other
		else {
			date = format(created, 'dd MMMM yyyy', { locale: fr }) + ' à ' + format(created, 'HH:mm');
		}

		return date;
	}
}
