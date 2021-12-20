function getDomain() {
	const { hostname } = location;
	const hostArr = hostname.split('.');
	if (hostArr.length < 3)
			return hostname;
	const len = hostArr.length;
	return `${hostArr[len - 3]}.${hostArr[len - 2]}.${hostArr[len - 1]}`;
}

export default {
	set(data = {}, exdays = 1) {
			const d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			const expires = d.toGMTString();
			Object.keys(data).forEach((key) => {
					const value = data[key];
					if (key && value) {
							document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
					}
			});
	},
	get(name) {
			const nameEQ = name + '=';
			const ca = document.cookie.split(';');
			for (let i = 0; i < ca.length; i++) {
					let c = ca[i];
					while (c.charAt(0) === ' ')
							c = c.substring(1, c.length);
					if (c && c.indexOf(nameEQ) === 0)
							return decodeURIComponent(c.substring(nameEQ.length, c.length));
			}
			return null;
	},
	erase(name) {
			const d = new Date();
			d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
			const expires = d.toGMTString();
			document.cookie = `${name}=; expires=${expires}; path=/`;
			const domain = getDomain();
			document.cookie = `${name}=; expires=${expires}; path=/; domain=${domain}`;
	},
	eraseAll() {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
					const cookie = cookies[i];
					const eqPos = cookie && cookie.indexOf('=');
					const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					this.erase(name);
			}
	},
};
