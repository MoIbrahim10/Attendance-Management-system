
export async function fetchData(endPoint) {
  const response = await fetch(`http://localhost:3000/${endPoint}`);
  const data = await response.json();
  return data;
}
