export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

const KEY = "cart";

// 🔥 notify header when cart updates
function notifyCartUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  notifyCartUpdated();
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);

  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });

  setCart(cart);
}

export function removeFromCart(id: string) {
  const updated = getCart().filter((i) => i.id !== id);
  setCart(updated);
}

export function updateQty(id: string, qty: number) {
  const updated = getCart()
    .map((i) => (i.id === id ? { ...i, qty } : i))
    .filter((i) => i.qty > 0);

  setCart(updated);
}

export function clearCart() {
  localStorage.removeItem(KEY);
  notifyCartUpdated();
}
