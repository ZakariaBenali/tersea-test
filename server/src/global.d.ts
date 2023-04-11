declare namespace NodeJS {
	interface ProcessEnv {
		readonly PORT: number;
		readonly DB_CONNECTION: 'mysql' | 'postgres';
		readonly DB_HOST: string;
		readonly DB_PORT: number;
		readonly DB_USERNAME: string;
		readonly DB_PASSWORD: string;
		readonly DB_DATABASE: string;
		readonly BCRYPT_ROUNDS: number;
		readonly JWT_SECRET: string;
		readonly NODE_ENV: 'development' | 'production';
		readonly INVITATION_LINK: string;
	}
}
