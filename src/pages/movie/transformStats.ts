import { DataPoint } from "../../components/chart/DataPoint";
import { MovieDailyStatsMap } from "../../interfaces/MovieDailyStatsMap";
import { StatType } from "../../type/StatType";

const transformStats = <T extends StatType>(
    stats: MovieDailyStatsMap[T],
    type: T
): DataPoint[] => {
    const fieldMap: { [key in StatType]: keyof MovieDailyStatsMap[key][number] } = {
        RANKING: 'ranking',
        AUDIENCE: 'audience',
        REVENUE: 'revenue'
    };

    const field = fieldMap[type];

    return stats.map(stat => {
        const date: Date = stat.date; // 날짜가 없을 경우 빈 문자열 처리
        const value: number = stat[field] ?? 0; // 동적으로 필드 값 접근

        return { x: date, y: value }; // 원하는 형식으로 반환
    });
}

export default transformStats;
export {};
