const {connection} = require('./connection');
class RemoveFeedbackFromStudets {
  async execute (students) {
    const client = await connection();
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection("students");
      
      for await (const student of students) {
        try {
          await collection.updateOne(
            { username: student.username },
            { $unset: { "feedback": 1 } },
            { multi: false }
          );
          console.log('removido');
        } catch (error) {
          console.error(error.message);
        }
      }
      await client.close();
      return true;
    } catch (error) {
      await client.close();
      console.error(error);
      return false;
    }
  }
}

module.exports = RemoveFeedbackFromStudets;