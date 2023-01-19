export async function postToPendingDB(data) {
  try {
    const response = await fetch('http://localhost:3000/pending', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;

  } catch (err) {
    console.log(err);
    return false;
  }
}













