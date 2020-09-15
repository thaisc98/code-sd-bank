import moment from "moment";

export const getReadibleDate = (date) => {
  const dateFormatted = JSON.stringify(moment(date).format("LLL"));
  moment.locale("es");

  return dateFormatted.slice(1, dateFormatted.length - 1);
};
