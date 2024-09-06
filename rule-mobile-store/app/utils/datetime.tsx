export const formatDateTime = ( dt: string ) => {
    const curDateTime = new Date(dt);

    // Adjust to the local time zone if necessary, you can also adjust to any specific time zone as required.
    const localDateTime = new Date(curDateTime.getTime() - curDateTime.getTimezoneOffset() * 60000);

    const y = localDateTime.getFullYear();
    const m = (localDateTime.getMonth() + 1).toString().padStart(2, '0');
    const d = localDateTime.getDate().toString().padStart(2, '0');
    const mm = localDateTime.getMinutes().toString().padStart(2, '0');
    const hh = localDateTime.getHours().toString().padStart(2, '0');
    return `${y}年 ${m}月 ${d}日 ${hh}:${mm}`;
}