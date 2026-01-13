export type CartItem = { id: string; qty: number };

const KEY = "buraqgo_cart_v1";

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
}

export function addToCart(id: string, qty = 1) {
  const items = getCart();
  const found = items.find((x) => x.id === id);
  if (found) found.qty += qty;
  else items.push({ id, qty });
  setCart(items);
}

export function updateQty(id: string, qty: number) {
  const items = getCart()
    .map((x) => (x.id === id ? { ...x, qty } : x))
    .filter((x) => x.qty > 0);
  setCart(items);
}

export function clearCart() {
  localStorage.removeItem(KEY);
}
