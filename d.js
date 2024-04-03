const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/latest_db';

// async function run() {
//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log('Connected to MongoDB');

//     // Specify the database and collection
//     const database = client.db('latest_db');
//     const collection = database.collection('student');

//     // Create a change stream on the collection
//     const changeStream = collection.watch();

//     // Listen for changes
//     changeStream.on('change', (change) => {
//       console.log('Change detected:', change);
//     });

//     // Keep the process running to listen for changes
//     await new Promise((resolve) => {
//       // You can add any additional logic here if needed
//       process.on('SIGINT', () => {
//         console.log('Closing MongoDB connection');
//         client.close().finally(() => resolve());
//       });
//     });

//   } finally {
//     // Close the client in case of any issues
//     await client.close();
//     console.log('MongoDB connection closed');
//   }
// }

// // Run the change stream example
// run().catch(console.error);
