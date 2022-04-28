export interface BestInvestmentMomentReqModel {
    range: number,
    amount: number
}

export interface BestInvestmentMomentResModel {
    buyDate: Date,
    buyPrice: number,
    sellDate: Date,
    sellPrice: number,
    revenue: number,
    profit: number
}

export interface GoldPriceResModel {
    data: string,
    cena: number
}