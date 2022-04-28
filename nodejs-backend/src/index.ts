import dotenv from 'dotenv';

import { App } from './app';



dotenv.config();

export const app = new App(
    parseInt(process.env.APP_PORT as string),
    process.env.BASE_API_URL as string,
    process.env.DATA_API_URL as string
);
app.start();