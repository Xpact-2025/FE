export const getTest = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/no-data`);
  const data = await res.json();
  return data;
};
