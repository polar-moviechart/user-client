import { MovieDailyStat } from "./MovieDailyStat";

export class MovieDailyRevenue implements MovieDailyStat {
    constructor(public date: Date, public revenue: number) {};
};