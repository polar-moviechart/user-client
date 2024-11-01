import { MovieDailyStat } from "./MovieDailyStat";

export class MovieDailyRanking implements MovieDailyStat {
    constructor(public date: Date, public ranking: number) {};
};