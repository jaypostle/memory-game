export const isObjectInArray = ({
  array,
  id,
}: {
  array: any[];
  id: string;
}) => {
  try {
    if (!array) return false;
    return array.some((item) => item.id === id);
  } catch (err) {
    console.log(err);
    return false;
  }
};
