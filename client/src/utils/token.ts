const TOKEN_KEY = 'auth_token';
export const getToken = () => {
	const token = localStorage.getItem(TOKEN_KEY);
	return token;
};

export const setToken = (token: string) => {
	if (!token) {
		return;
	}
	localStorage.setItem(TOKEN_KEY, token);
};

export const destroyToken = () => {
	localStorage.removeItem(TOKEN_KEY);
};
