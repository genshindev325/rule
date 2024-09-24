export const getPaymentDate = (dt: string) => {
  const curDateTime = new Date(dt);

  // Adjust to the local time zone if necessary, you can also adjust to any specific time zone as required.
  const localDateTime = new Date(curDateTime.getTime() - curDateTime.getTimezoneOffset() * 60000);

  let day = '09';
  const y = localDateTime.getFullYear();
  const m = (localDateTime.getMonth() + 1);
  let year = y;
  let month = m;

  // const day = localDateTime.getDate().toString().padStart(2, '0');
  const d = localDateTime.getDate();
  if (d < 5) {
    day = '05';
  } else if (d > 4 && d < 15) {
    day = '15';
  } else if (d > 14 && d < 25) {
    day = '25';
  } else if (d > 24) {
    day = '05';
    month += 1;
    if (month === 13) {
      month = 1;
      year += 1;
    }
  }
  return `${year}年 ${month.toString().padStart(2, '0')}月 ${day}日`;
}