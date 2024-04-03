const { MongoClient } = require('mongodb');

async function run() {
  const uri = 'mongodb://localhost:27017/latest_db';
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('latest_db'); // Replace with your actual database name
    const collection = database.collection('student'); // Replace with your actual collection name

    // Set up a change stream
    const changeStream = collection.watch();

    // Listen to change events
    changeStream.on('change', (change) => {
      console.log('Change detected:', change);
      // You can handle the change event here, e.g., send a notification
    });

    // Keep the process running (you can remove this line if not needed)
    await new Promise(() => { });

  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

run().catch(console.error);
