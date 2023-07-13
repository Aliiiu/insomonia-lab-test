export const decodeEntities = (html: string): string => {
	if (typeof document === 'undefined') {
		return html;
	}
	const txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};
