import { DataPoint } from "../../components/chart/DataPoint";
import { MovieDailyStat } from "../../interfaces/MovieDailyStat";

const transformStats = (stats: MovieDailyStat[], type: 'ranking' | 'audience' | 'revenue'): DataPoint[] => {
    const fieldMap: { [key in 'ranking' | 'audience' | 'revenue']: string } = {
        ranking: 'ranking',
        audience: 'audience',
        revenue: 'revenue'
    };

    return stats.map(stat => {
        const date: Date = stat.date; // 날짜가 없을 경우 빈 문자열 처리
        const field = fieldMap[type]; // 현재 타입에 맞는 필드 이름 가져오기
        const value: number = (stat as any)[field] ?? 0; // 동적으로 필드 값 접근

        return { x: date, y: value }; // 원하는 형식으로 반환
    });
}

export default transformStats;
export {};