import { MovieDailyStat } from "./MovieDailyStat";

export class MovieDailyAudience implements MovieDailyStat {
    constructor(public date: Date, public audience: number) {}
};