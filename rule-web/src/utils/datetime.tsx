export const formatDateTime = (dt: string) => {
  const curDateTime = new Date(dt);

  // Get the components of the date
  const y = curDateTime.getFullYear();
  const m = (curDateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const d = curDateTime.getDate().toString().padStart(2, '0');
  const hh = curDateTime.getHours().toString().padStart(2, '0');
  const mm = curDateTime.getMinutes().toString().padStart(2, '0');

  // Return the formatted string
  return `${y}年 ${m}月 ${d}日 ${hh}:${mm}`;
};