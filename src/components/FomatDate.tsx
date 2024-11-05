const formatDate = (date: Date) => {

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);

    return formattedDate.replace(/\. /g, '.') // 점 뒤의 공백 제거
        .replace(/(\d{4}\.\d{1,2}\.\d{1,2})/, '$1 ') // 날짜 뒤에 공백 추가
        .trim(); // 문자열의 앞뒤 공백 제거
};

export default formatDate;