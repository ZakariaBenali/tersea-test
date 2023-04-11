export interface ResponseError {
	status: number;
	error: string;
}

export interface SuccessResponse<T> {
	code: number;
	message: string;
	data: T;
}
