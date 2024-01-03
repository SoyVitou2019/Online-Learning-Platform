const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

const CONNECTION_STRING = "mongodb+srv://admin:01032003@cluster0.2bphf0a.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "E-learning";
const COLLECTION_NAME = "E-learningCollection";

app.use(bodyParser.json());
app.use(cors());

let student_data = [];

async function fetchData() {
  const client = new MongoClient(CONNECTION_STRING,  { useNewUrlParser: true });

  try {
    await client.connect();
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(COLLECTION_NAME);

    const documents = await collection.find().toArray();
    student_data = [];
    documents.forEach(document => {
      if (document.Email) {
        student_data.push(document);
      }
    });
  } finally {
    await client.close();
  }
}

app.get('/api', async (req, res) => {
  try {
    await fetchData();
    res.json(student_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api', async (req, res) => {
  let newStudent = req.body;
  if (!newStudent) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const client = new MongoClient(CONNECTION_STRING, { 
    useNewUrlParser: true });

  try {
    await client.connect();
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(COLLECTION_NAME);

    await collection.insertOne(newStudent);
    res.status(201).json({ message: 'Student added successfully' });

    // Refresh the data after adding a new student
    // Reset the data by clearing the array before fetching
    student_data = [];
    await fetchData();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
