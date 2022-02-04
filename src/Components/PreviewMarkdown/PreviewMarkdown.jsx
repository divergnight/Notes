import { Converter } from 'showdown';

export default function PreviewMarkdown(props) {
	const value = props.value;

	const converter = new Converter();
	const DOMPurify = require('dompurify')(window);

	function clean() {
		return DOMPurify.sanitize(converter.makeHtml(value));
	}
	return <div dangerouslySetInnerHTML={{ __html: clean() }}></div>;
}
