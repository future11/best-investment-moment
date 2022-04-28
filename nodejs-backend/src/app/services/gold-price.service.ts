import fetch from 'node-fetch';
import * as _ from 'lodash';
import * as moment from 'moment';

import { BestInvestmentMomentResModel, GoldPriceResModel } from '../models';
import { CacheService } from './cache.service';



export class GoldPriceService {
    private cacheService: CacheService;



    constructor() {
        this.cacheService = new CacheService();
    }

    async getBestInvestmentMoment(dataApiUrl: string, range: number, amount: number) {
        const today = moment.default();
        const dateFormat = "YYYY-MM-DD",
              dateFormatForCache = "YYYYMMDD";

        let goldPrices: GoldPriceResModel[] = [];
        let result = {} as BestInvestmentMomentResModel;

        const startDateForCache = moment.default(today).add(0 - range, "years").add(1, "days").format(dateFormatForCache);
        const endDateForCache = moment.default(today).format(dateFormatForCache);

        // Fetch cached data.
        const cachedDataKey = "gold-price-best-invest-moment-" + startDateForCache + "-" + endDateForCache,
              cachedData = this.cacheService.get(cachedDataKey);

        if (cachedData) {
            // Return cached data.
            const revenue = cachedData.max.cena / cachedData.min.cena * amount;
            result = {
                buyDate: moment.default(cachedData.min.data, dateFormat).toDate(),
                buyPrice: cachedData.min.cena,
                sellDate: moment.default(cachedData.max.data, dateFormat).toDate(),
                sellPrice: cachedData.max.cena,
                revenue: revenue,
                profit: revenue - amount
            };
        } else {
            // Fetch data by one year from NBP because its api can return at most 367 days data.
            for (let i = 0; i < range; i ++) {
                const startDate = moment.default(today).add(i - range, "years").add(1, "days");
                const endDate = moment.default(today).add(i - range + 1, "years");
                const url = dataApiUrl.replace("{startDate}", startDate.format(dateFormat)).replace("{endDate}", endDate.format(dateFormat));
                
                const data = await fetch(url);
                const dataInJson = (await data.json()) as GoldPriceResModel[];

                goldPrices.push(...dataInJson);
            }

            if (goldPrices.length < 2)
                throw new Error("Insufficient data");

            // Calculate max difference between two prices.
            let maxDiff = goldPrices[1].cena - goldPrices[0].cena,
                minPriceData = goldPrices[0],
                maxPriceData = goldPrices[1],
                tempMinPriceData = minPriceData;

            for (let i = 1; i < goldPrices.length; i ++) {
                if (goldPrices[i].cena - tempMinPriceData.cena > maxDiff) {
                    maxDiff = goldPrices[i].cena - tempMinPriceData.cena;
                    maxPriceData = goldPrices[i];
                    minPriceData = tempMinPriceData;
                }

                if (goldPrices[i].cena < tempMinPriceData.cena)
                    tempMinPriceData = goldPrices[i];
            }

            const revenue = maxPriceData.cena / minPriceData.cena * amount;
            result = {
                buyDate: moment.default(minPriceData.data, dateFormat).toDate(),
                buyPrice: minPriceData.cena,
                sellDate: moment.default(maxPriceData.data, dateFormat).toDate(),
                sellPrice: maxPriceData.cena,
                revenue: revenue,
                profit: revenue - amount
            };

            // Save data to the cache.
            this.cacheService.set(cachedDataKey, {min: minPriceData, max: maxPriceData});
        }

        return result;
    }
}