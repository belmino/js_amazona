import { apiUrl } from "./config"

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/api/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response2 = await response.json();
    if (response.statusText !== 'OK') {
      throw new Error(response2.message)
    }
    console.log(response2)
    return response2;
  } catch (err) {
    console.log(err);
    return { error: err.message}
  }
}
