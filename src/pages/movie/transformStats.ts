import { MovieDailyAudience, MovieDailyRanking, MovieDailyRevenue, MovieDailyStat } from "../../api/data-contracts"

const transformStats = (stats: MovieDailyStat[], type: 'ranking' | 'audience' | 'revenue'): { date: string[], field: number[] } => {
    const date: string[] = stats.map(stat => stat.date as string || "");
    const field: number[] = stats.map(stat => {
        // 각 타입에 맞게 속성 접근 및 타입 단언
        switch (type) {
            case 'ranking':
                return (stat as MovieDailyRanking).ranking ?? 0; // ranking 속성에 접근
            case 'audience':
                return (stat as MovieDailyAudience).audience ?? 0; // audience 속성에 접근
            case 'revenue':
                return (stat as MovieDailyRevenue).revenue ?? 0; // revenue 속성에 접근
            default:
                return 0;
        } // 기본값
    });
    return { date, field };
}

export default transformStats;
export {};