import { Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

import { GoldPriceService } from '../services';
import { BestInvestmentMomentReqModel, BestInvestmentMomentResModel } from '../models';



export class GoldPriceController {
    static getBestInvestmentMoment = async (
        req: Request,
        res: Response
    ) => {
        const goldPriceService = new GoldPriceService();

        const range: number = parseInt(req.query.range as string);
        const amount: number = parseFloat(req.query.amount as string);

        if (isNaN(range) || range < 1) {
            return res.status(400).send({
                message: "'Range' is required and must be equal to or greater than 1."
            });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).send({
                message: "'Amount' is required and must be greater than 0."
            });
        }

        goldPriceService.getBestInvestmentMoment(req.dataApiUrl, range, amount)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).send({
                status: 500,
                message: err.message || "Error occurred while performing the operation."
            }));
    };
}