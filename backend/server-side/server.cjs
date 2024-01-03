const { MongoClient } = require('mongodb');

const CONNECTION_STRING = "mongodb+srv://admin:01032003@cluster0.2bphf0a.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "E-learning";
const COLLECTION_NAME = "E-learningCollection";

let email = [];

let student_data;

async function fetchData() {
    // Create a new MongoClient
    const client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Select the database and collection
        const database = client.db(DATABASE_NAME);
        const collection = database.collection(COLLECTION_NAME);

        // Find all documents in the collection
        const documents = await collection.find().toArray();

        // Extract email addresses and append to the 'email' array
        documents.forEach(document => {
            if (document.Email) {
                email.push(document.Email);
            }
        });

        student_data = documents;
        // Log the data to the console
        // console.log('Data from MongoDB:');
        // console.log(documents);

        // Log the email addresses
        // console.log('Email addresses:');
        console.log(student_data);

    } finally {
        // Close the client
        await client.close();
    }
}

// Call the fetchData function
fetchData();
