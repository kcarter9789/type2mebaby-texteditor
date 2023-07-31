import {
  openDB
} from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', {
        keyPath: 'id',
        autoIncrement: true
      });
      console.log('jate database created');
    },
  });

// TODO: Implement the 'putDb' function to add the provided 'content' to the database.
export const putDb = async (content) => {
  console.log('Adding data to the database.');

  // Establish a connection to the database and specify the version to be used.
  const myDatabase = await openDB('jate', 1);

  // Create a new transaction with read-write privileges for the database.
  const transaction = myDatabase.transaction('jate', 'readwrite');

  // Open the desired object store within the transaction.
  const store = transaction.objectStore('jate');

  // Use the .add() method on the store and pass in the 'content'.
  const request = store.put({
    id: 1,
    value: content
  });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database.', result);
};

// TODO: Implement the 'getDb' function to retrieve all content from the database.
export const getDb = async () => {
  console.log('Retrieving data from the database.');


  // Connect to the database and specify the desired version to use.
  const myDatabase = await openDB('jate', 1);

  // Create a new transaction with read-only privileges for the database.
  const transaction = myDatabase.transaction('jate', 'readonly');

  // Open the desired object store within the transaction.
  const store = transaction.objectStore('jate');

  // Use the .getAll() method to retrieve all data from the object store.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();