import moment from "moment";

export const getReadibleDate = (date) => {
  moment.locale("es");
  const dateFormatted = moment(date).locale("es").format("LLL");

  return dateFormatted;
};
