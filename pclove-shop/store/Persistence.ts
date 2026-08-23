import type { CartState } from "./cartSlice";
import type { WishlistState } from "./wishlistSlice";

const CART_STORAGE_KEY = "pclove-cart";
const WISHLIST_STORAGE_KEY = "pclove-wishlist";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isPositiveInteger(value: unknown): value is number {
    return (
        typeof value === "number" &&
        Number.isInteger(value) &&
        value > 0
    );
}

function isNonNegativeInteger(value: unknown): value is number {
    return (
        typeof value === "number" &&
        Number.isInteger(value) &&
        value >= 0
    );
}

function isValidCartState(value: unknown): value is CartState {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return false;
  }

  return value.items.every((item) => {
    if (!isRecord(item)) {
      return false;
    }

    return (
      isPositiveInteger(item.id) &&
      item.id > 0 &&
      typeof item.title === "string" &&
      item.title.length > 0 &&
      isFiniteNumber(item.price) &&
      item.price >= 0 &&
      typeof item.image === "string" &&
      item.image.length > 0 &&
      isPositiveInteger(item.stock) &&
      isPositiveInteger(item.quantity) &&
      item.quantity <= item.stock
    );
  });
}

function isValidWishlistState(value: unknown): value is WishlistState {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    return false;
  }

  return value.items.every((item) => {
    if (!isRecord(item)) {
      return false;
    }

    return (
      isPositiveInteger(item.id) &&
      item.id > 0 &&
      typeof item.title === "string" &&
      item.title.length > 0 &&
      typeof item.description === "string" &&
      isFiniteNumber(item.price) &&
      item.price >= 0 &&
      typeof item.brand === "string" &&
      item.brand.length > 0 &&
      typeof item.category === "string" &&
      item.category.length > 0 &&
      typeof item.image === "string" &&
      item.image.length > 0 &&
      isNonNegativeInteger(item.stock) &&
      item.stock >= 0 &&
      isFiniteNumber(item.rating) &&
      item.rating >= 0 &&
      item.rating <= 5
    );
  });
}

function loadFromStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
): T | undefined {
  try {
    const serializedValue = localStorage.getItem(key);

    if (!serializedValue) {
      return undefined;
    }

    const parsedValue: unknown = JSON.parse(serializedValue);

    if (!isValid(parsedValue)) {
      console.warn(`Ignoring invalid persisted data for "${key}".`);
      return undefined;
    }

    return parsedValue;
  } catch (error) {
    console.error(`Failed to load persisted data for "${key}":`, error);
    return undefined;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save persisted data for "${key}":`, error);
  }
}

export function loadCart(): CartState | undefined {
  return loadFromStorage(CART_STORAGE_KEY, isValidCartState);
}

export function saveCart(cart: CartState) {
  saveToStorage(CART_STORAGE_KEY, cart);
}

export function loadWishlist(): WishlistState | undefined {
  return loadFromStorage(
    WISHLIST_STORAGE_KEY,
    isValidWishlistState,
  );
}

export function saveWishlist(wishlist: WishlistState) {
  saveToStorage(WISHLIST_STORAGE_KEY, wishlist);
}