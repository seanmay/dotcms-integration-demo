export type DataCacheSchema = {
  name: string;
  version: number;
  stores: DataCacheStoreSchema[];
};
export type DataCacheStoreSchema = {
  name: string;
  primary_key?: IDBObjectStoreParameters;
  indices?: DataIndexSchema[];
};
export type DataIndexSchema = {
  index_name: string;
  field_name: string;
  flags?: IDBIndexParameters;
};

export const DataCache = {
  open: async (schema: DataCacheSchema) => {
    const db = await open_db(schema);
    return {
      add: async (store_name: string, value: any) => {
        const tx = db.transaction(store_name, "readwrite");
        const store = tx.objectStore(store_name);
        const processes = Promise.all([store.add(value)].map(wrap_request));
        tx.commit();
        return processes;
      }
    };
  },
};

const wrap_request = <Result extends any>(request: IDBRequest<Result>) => {
  const handler = Promise.withResolvers<Result>();
  request.onsuccess = () => handler.resolve(request.result);
  request.onerror = handler.reject;
  return handler.promise;
};

const open_db = async (schema: DataCacheSchema) => {
  const db_open_request = indexedDB.open(schema.name, schema.version);
  const connection_handler = new AbortController();
  const connection = Promise.withResolvers();
  db_open_request.addEventListener(
    "upgradeneeded",
    () => update_db(db_open_request.result, schema),
    connection_handler
  );
  db_open_request.addEventListener(
    "success",
    () => connection.resolve(db_open_request.result),
    connection_handler
  );
  db_open_request.addEventListener(
    "error",
    (err) => connection.reject(err),
    connection_handler
  );
  await connection.promise;
  connection_handler.abort();
  return db_open_request.result;
};

const update_db = (db: IDBDatabase, schema: DataCacheSchema) => {
  console.log(`Upgrading to v${db.version}`);
  schema.stores?.forEach((store_data) => {
    const store = db.createObjectStore(
      store_data.name,
      store_data.primary_key
    );

    store_data.indices?.forEach((index_data) => {
      store.createIndex(
        index_data.index_name,
        index_data.field_name,
        index_data.flags
      );
    });
  });
};