import { apiUrl } from "./config"
import { getUserInfo } from "./localStorage";



export const getProducts = async () => {
  try {
    const rawResponse = await fetch( `${apiUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const content  = await rawResponse.json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message);
    }
    return content;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getProduct = async (id) => {
  try {
    const rawResponse  = await fetch(`${apiUrl}/api/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const content  = await rawResponse.json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message)
    }
    console.log(content)
    return content;
  } catch (err) {
    console.log(err);
    return { error: err.message}
  }
}

export const signin = async ({email, password}) => {
  try {
    const rawResponse  = await fetch(`${apiUrl}/api/users/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    });
    
    const content = await rawResponse .json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message)
    }
    return content;
  } catch (err) {
    console.log(err)
    return {error: err.message}
  }
}

export const register = async ({name, email, password}) => {
  try {
    const rawResponse  = await fetch(`${apiUrl}/api/users/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, email, password
      })
    });
    
    const content = await rawResponse .json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message)
    }
    return content;
  } catch (err) {
    console.log(err)
    return {error: err.message}
  }
}

export const update = async ({name, email, password}) => {
  try {
    const {_id, token} = getUserInfo();
    const rawResponse  = await fetch(`${apiUrl}/api/users/${_id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name, email, password
      })
    });
    
    const content = await rawResponse .json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message)
    }
    return content;
  } catch (err) {
    console.log(err)
    return {error: err.message}
  }
}

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const rawResponse = await fetch(`${apiUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order
      }),
    });
    
    const content = await rawResponse .json();
    if (rawResponse.statusText !== 'Created') {
      throw new Error(content.message);
    }
    return content;
  } catch (err) {
    return { error: err.response ? err.response.message : err.message };
  }
};

export const getOrder = async (id) => {
  try {
    const { token } = getUserInfo();
    const rawResponse = await fetch(`${apiUrl}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const content = await rawResponse .json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message);
    }
    return content;
  } catch (err) {
    return { error: err.message };
  }
};


export const getMyOrders = async () => {
  try {
    const { token } = getUserInfo();
    const rawResponse = await fetch( `${apiUrl}/api/orders/mine`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const content = await rawResponse .json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message);
    }
    return content;
  } catch (err) {
    return { error: err.content ? err.content.message : err.message };
  }
};

export const getPaypalClientId = async () => {
  const rawResponse = await fetch(`${apiUrl}/api/paypal/clientId`,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const content = await rawResponse .json();
  if (rawResponse.statusText !== 'OK') {
    throw new Error(content.message);
  }
  return content.clientId;
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    const { token } = getUserInfo();
    const rawResponse = await fetch(`${apiUrl}/api/orders/${orderId}/pay`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: paymentResult,
    });
    const content = await rawResponse .json();
    if (rawResponse.statusText !== 'OK') {
      throw new Error(content.message);
    }
    return content;
  } catch (err) {
    return { error: err.content ? err.content.message : err.message };
  }
};
