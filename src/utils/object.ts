export const isObjectInArray = ({
  array,
  key,
  value,
}: {
  array: any[];
  key: string;
  value: string;
}) => {
  try {
    if (!array) return false;
    return array.some((item) => item[key] === value);
  } catch (err) {
    console.log(err);
    return false;
  }
};
