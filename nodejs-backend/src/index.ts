import { get as getConfig } from 'config';

import { App } from './app';



export const app = new App(
    3001, //getConfig("app.port"),
    "/api", //getConfig("app.baseApiUrl"),
    "http://api.nbp.pl/api/cenyzlota/{startDate}/{endDate}" //getConfig("app.dataApiUrl")
);
app.start();