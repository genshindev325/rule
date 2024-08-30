export const formatDateTime = ( dt: string ) => {
    const curDateTime = new Date(dt);
    const y = curDateTime.getFullYear();
    const m = curDateTime.getMonth() + 1;
    const d = curDateTime.getDate();
    const mm = curDateTime.getMinutes();
    const hh = curDateTime.getHours();
    return `${y}年 ${m}月 ${d}日 ${hh}:${mm}`;
}