const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function handle(res) {
  if (!res.ok) {
    let message = "Request failed";
    try {
      const body = await res.json();
      message = body.error || message;
    } catch (e) { /* ignore */ }
    throw new Error(message);
  }
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  return handle(res);
}

export async function getProduct(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  return handle(res);
}

export async function createProduct(product, adminKey) {
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
    body: JSON.stringify(product),
  });
  return handle(res);
}

export async function deleteProduct(id, adminKey) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey },
  });
  return handle(res);
}

export async function updateStock(id, stock, adminKey) {
  const res = await fetch(`${API_URL}/api/products/${id}/stock`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    },
    body: JSON.stringify({ stock }),
  });
  return handle(res);
}
