import { MovieStats } from "../../apis/movie/interfaces/MovieStats";
import { DataPoint } from "../../components/chart/DataPoint";

const transformStats = (stats: MovieStats[]): DataPoint[] => {
    return stats.map(stat => ({
        x: stat.date,
        y: stat.value,
    }));
};

export default transformStats;