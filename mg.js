const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://localhost:27017/latest_db';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function watchChanges() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Select your database and collection
    const databaseName = 'latest_db';
    const collectionName = 'student';
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Create a Change Stream
    const changeStream = collection.watch();

    // Listen for changes
    changeStream.on('change', (change) => {
      console.log('Change detected:', change);

      // Handle the change event as needed
      if (change.operationType === 'insert') {
        console.log('Document inserted:', change.fullDocument);
      } else if (change.operationType === 'update') {
        console.log('Document updated:', change.fullDocument);
      } else if (change.operationType === 'delete') {
        console.log('Document deleted:', change.documentKey);
      }
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Close the MongoDB connection when done
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// // Run the function to watch changes
// watchChanges();
