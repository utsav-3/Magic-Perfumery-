import { parseCart, type CartLine } from "@/lib/cart";

/**
 * Bag persisted to localStorage, exposed as an external store for
 * useSyncExternalStore: the server renders an empty bag, the client hydrates
 * from storage, and other tabs stay in sync via the `storage` event.
 */
const KEY = "bombay-perfume:bag:v1";
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    lines = parseCart(window.localStorage.getItem(KEY));
  } catch {
    lines = EMPTY;
  }
}

function emit() {
  for (const listener of listeners) listener();
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      loaded = false;
      load();
      emit();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartLine[] {
    load();
    return lines;
  },
  getServerSnapshot(): CartLine[] {
    return EMPTY;
  },
  set(next: CartLine[]) {
    lines = next;
    loaded = true;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // Storage full or blocked (private mode): the bag still works for this visit.
    }
    emit();
  },
};
