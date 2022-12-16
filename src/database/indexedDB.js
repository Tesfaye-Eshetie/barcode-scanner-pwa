import { openDB } from "idb";

export const database = openDB("BarcodeDB", 1, {
  upgrade(db) {
    db.createObjectStore("barcode");
  },
});

export const addBarcode = async (key, data) =>
  (await database).put("barcode", data, key);
