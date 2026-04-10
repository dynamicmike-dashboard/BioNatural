import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'bionatural-offline-v1';
const STORE_NAME = 'products';

interface BNDatabase extends IDBPDatabase {
  // Define store structure if needed in TS
}

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const cacheProducts = async (products: any[]) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await Promise.all([
    ...products.map((p) => tx.store.put(p)),
    tx.done,
  ]);
};

export const getCachedProducts = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
