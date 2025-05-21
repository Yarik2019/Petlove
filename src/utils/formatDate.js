export const formatDate = rawDate => {
  const date = new Date(rawDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatNoticesDate = oldDate => {
  const [year, month, day] = oldDate.split('-');

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};

export const transformDateUs = oldDate => {
  const [day, month, year] = oldDate.split('.');
  return `${year}-${month}-${day}`;
};
