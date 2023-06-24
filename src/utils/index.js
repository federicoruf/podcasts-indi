const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export const formatMilliseconds = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString('es-ES');
  return formattedDate;
};

export const hasPassedTimeLimit = (requestTime) => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - requestTime;
  return timeDifference >= TWENTY_FOUR_HOURS;
};
