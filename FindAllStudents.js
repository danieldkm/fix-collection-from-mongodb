const {connection} = require('./connection');
class FindAllStudents {
  async execute () {
    const client = await connection();
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection("students");
      const result = await collection
        .find({ feedback:{ $exists: true} })
        .toArray();
      await client.close();
      return result;
      
    } catch (error) {
      await client.close();
      console.error(error);
      return [];
    }
  }
}

module.exports = FindAllStudents;