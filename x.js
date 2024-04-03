const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

// Replica set name
const replicaSetName = 'rs1';

// MongoDB connection URI with replica set and multiple hosts
const uri = `ac-9fi2a6w-shard-00-00.szd5hcv.mongodb.net:27017,ac-9fi2a6w-shard-00-01.szd5hcv.mongodb.net:27017,ac-9fi2a6w-shard-00-02.szd5hcv.mongodb.net:27017/?replicaSet=${replicaSetName}`;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mongodb920@gmail.com', // Your Gmail email address
    pass: 'udmb fubo hspq lmyj' // Your Gmail password or app-specific password
  }
});

// Email recipient address
const recipientEmail = 'dhananjay.maurya@factspan.com,mongodb920@gmail.com';

// Options for the change stream
const changeStreamOptions = {
  fullDocument: 'updateLookup' // Get the full document for update operations
};

// Function to connect to MongoDB and set up change stream
async function connectAndWatch() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Select the database and collection
    const database = client.db('my_db');
    const collection = database.collection('movie');

    // Set up change stream
    const changeStream = collection.watch([], changeStreamOptions);

    // Listen for change events
    changeStream.on('change', (change) => {
      console.log('Change detected:');
      console.log(change);

      // Send email notification
      sendEmailNotification(change);
    });

    console.log('Watching for changes in db_movie.movies...');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to send email notification
function sendEmailNotification(change) {
  const mailOptions = {
    from: 'mdemo764@gmail.com', // Sender address (must be the same as auth user)
    to: recipientEmail, // Recipient address
    subject: 'MongoDB Change Notification',
    text: `Change detected in MongoDB collection:\n${JSON.stringify(change)}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Call the function to connect and watch for changes
connectAndWatch();
