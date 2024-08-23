export const formatDateTime = ( dt: string ) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const curDateTime = new Date(dt);
    const y = curDateTime.getFullYear();
    const m = months[curDateTime.getMonth()];
    const d = curDateTime.getDate();
    const mm = curDateTime.getMinutes();
    const hh = curDateTime.getHours();
    return `${m} ${d}, ${y} ${hh}:${mm}`;
}