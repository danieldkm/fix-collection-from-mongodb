const MongoClient = require("mongodb").MongoClient,
  f = require("util").format,
  fs = require("fs"),
  path = require("path");
// Read the certificate authority
var ca = [fs.readFileSync(path.join(__dirname, "rds-combined-ca-bundle.pem"))];
require("dotenv").config();

// const FindAllStudents = require('./FindAllStudents');
// const findAllStudents = new FindAllStudents();

const url = process.env.DB_CONNECTION;
const dbName = "agendador_alunos";


function connection() {
  return new Promise((resolve, reject) => {
    MongoClient.connect (
      url,
      {
        sslValidate: true,
        checkServerIdentity: false,
        sslCA: ca,
        poolSize: 10, 
        // bufferMaxEntries: 0, 
        // reconnectTries: 5000, 
        // useNewUrlParser: true,
        // useUnifiedTopology: true
        // useUnifiedTopology: true,
      },
      async function (err, client) {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("Connected successfully to server");
        // const db = client.db(dbName);
        resolve(client);
        // const collection = db.collection("students");
        // const updateCollection = db.collection("students");
        // const students = await findAllStudents.execute(db);
        // console.log(students);
        // try {
        // collection
        //   .find({ feedback:{ $exists: true}, username: "266anarangel" })
        //   .toArray(async function (err, docs) {
        //     if (err) {
        //       console.error(err);
        //       client.close();
        //       return;
        //     }
        //     console.log("Found the following records", docs.length);
        //     for await (const student of docs) {
        //       for (const exam of student.exams) {
        //         exam.feedback = student.feedback;
        //       }
        //       console.log(student);
        //       // await collection.updateOne(
        //       //   { username: student.username },
        //       //   { $unset: { "feedback": 1 } },
        //       //   { multi: false }
        //       // );
        //       delete student.feedback;
        //       await updateCollection.updateOne(
        //         { username: student.username },
        //         { $set: student }
        //       );
        //     }
        //   });
          
          
        // } catch (error) {
        //   console.error(error);
        //   client.close();
        // }
      }
    );
  })
}



module.exports = {
  connection
}