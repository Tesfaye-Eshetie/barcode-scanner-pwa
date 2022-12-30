import { openDB } from "idb";

export const database = openDB("BarcodeDB-v1", 1, {
  upgrade(db) {
    db.createObjectStore("taggedList");
    db.createObjectStore("barcode");
  },
});

export const addBarcode = async (key, data) =>
  (await database).put("barcode", data, key);

export const addTaggedList = async (key, data) =>
  (await database).put("taggedList", data, key);

export const deleteTaggedList = async (key) =>
  (await database).delete("taggedList", key);
