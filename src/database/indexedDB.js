import { openDB } from "idb";

export const database = openDB("BarcodeDB-v2", 1, {
  upgrade(db) {
    db.createObjectStore("taggedList");
  },
});

export const addTaggedList = async (key, data) =>
  (await database).put("taggedList", data, key);

export const deleteTaggedList = async (key) =>
  (await database).delete("taggedList", key);
