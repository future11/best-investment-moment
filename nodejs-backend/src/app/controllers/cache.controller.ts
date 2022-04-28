import { Request, Response } from 'express';

import { CacheService } from '../services';



export class CacheController {
    static clearAll = async (
        req: Request,
        res: Response
    ) => {
        const cacheService = new CacheService();
        cacheService.clear();
        
        res.status(200).json({ success: true});
    };
}