import { Router } from 'express';

import { GoldPriceController, CacheController } from '../app/controllers';



export class Route {
    constructor() {

    }

    getRouter(): Router {
        const router = Router();

        router.get('/gold-price/best-investment-moment', GoldPriceController.getBestInvestmentMoment);
        router.delete('/cache/clear-all', CacheController.clearAll);

        return router;
    }
}