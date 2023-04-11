class HttpException extends Error {
	public status: number;
	public message: string;
	public data?: any;
	constructor(status?: number | null, message?: string | null, data?: any) {
		super(message);
		this.status = status || 500;
		this.message = message || 'Erreur de serveur interne';
		this.data = data;
	}
}

export default HttpException;
