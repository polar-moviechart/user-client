export default interface Review {
    id: number;
    userId: number;
    nickname: string;
    content: string;
    rating: number;
    code: number;
    title: string;
    date: Date;
}