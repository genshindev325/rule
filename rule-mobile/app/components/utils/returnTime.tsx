export const formatReturnTime = ( dt: string ) => {
    const curDateTime = new Date(dt);

    // Adjust to the local time zone if necessary, you can also adjust to any specific time zone as required.
    const localDateTime = new Date(curDateTime.getTime() - curDateTime.getTimezoneOffset() * 60000);

    const mm = localDateTime.getMinutes().toString().padStart(2, '0');
    const hh = localDateTime.getHours().toString().padStart(2, '0');
    return `${hh}:${mm}`;
}