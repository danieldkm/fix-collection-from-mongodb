const {connection} = require('./connection');
class UpdateStudents {
  async execute (students) {
    const client = await connection();
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection("students");
      
      for await (const student of students) {
        for (const exam of student.exams) {
          exam.feedback = student.feedback;
        }
        delete student.feedback;
        try {
          await collection.updateOne(
            { username: student.username },
            { $set: student }
          );
          console.log('atualizado')
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

module.exports = UpdateStudents;