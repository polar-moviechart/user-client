import { MovieDailyAudience } from "./MovieDailyAudience";
import { MovieDailyRanking } from "./MovieDailyRanking";
import { MovieDailyRevenue } from "./MovieDailyRevenue";

export interface MovieDailyStatsMap {
    RANKING: MovieDailyRanking[];
    AUDIENCE: MovieDailyAudience[];
    REVENUE: MovieDailyRevenue[];
  };
  