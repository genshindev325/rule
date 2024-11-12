export const formatDateTime = (dt: string) => {
  const curDateTime = new Date(dt);

  // Get the components of the date in UTC
  const y = curDateTime.getUTCFullYear();
  const m = (curDateTime.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const d = curDateTime.getUTCDate().toString().padStart(2, '0');
  const hh = curDateTime.getUTCHours().toString().padStart(2, '0');
  const mm = curDateTime.getUTCMinutes().toString().padStart(2, '0');

  // Return the formatted string
  return `${y}年 ${m}月 ${d}日 ${hh}:${mm}`;
};
