function getDateArray(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Set to the last Sunday (including today if today is Sunday)
  const sundayBeforeToday = new Date(today);
  sundayBeforeToday.setDate(today.getDate() - dayOfWeek);

  // Calculate the first Sunday in the array
  const firstSunday = new Date(sundayBeforeToday);
  if (dayOfWeek !== 0) {
    firstSunday.setDate(sundayBeforeToday.getDate() - 7);
  }

  const dateArray: Date[] = [];

  // Populate the array with 35 dates starting from the calculated Sunday
  for (let i = 0; i < 35; i++) {
    const date = new Date(firstSunday);
    date.setDate(firstSunday.getDate() + i);
    dateArray.push(date);
  }

  return dateArray;
}

function getWeeklyDateArrays(dateArray: Date[]): Date[][] {
  const weeklyArrays: Date[][] = [];
  for (let i = 0; i < dateArray.length; i += 7) {
    weeklyArrays.push(dateArray.slice(i, i + 7));
  }
  return weeklyArrays;
}

function getMonthDateArray(year: number, month: number): Date[][] {
  const weeksArray: Date[][] = [];

  // Get the first and last days of the month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Adjust the start date to the previous Sunday if necessary
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  // Adjust the end date to the next Saturday if necessary
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  // Generate the array of dates
  let currentWeek: Date[] = [];
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    currentWeek.push(new Date(date));
    if (currentWeek.length === 7) {
      weeksArray.push(currentWeek);
      currentWeek = [];
    }
  }

  // In case the last week is not complete, add it to the weeksArray
  if (currentWeek.length > 0) {
    weeksArray.push(currentWeek);
  }

  return weeksArray;
}

function getMonthName(month: number): string {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return monthNames[month];
}

export { getDateArray, getWeeklyDateArrays, getMonthDateArray, getMonthName };
