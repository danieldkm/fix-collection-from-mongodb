const FindAllStudents = require('./FindAllStudents');
const RemoveFeedbackFromStudets = require('./RemoveFeedbackFromStudets');
const UpdateStudents = require('./UpdateStudents');


const findAllStudents = new FindAllStudents();
const updateStudents = new UpdateStudents();
const removeFeedbackFromStudets = new RemoveFeedbackFromStudets();

async function start() {
  const students = await findAllStudents.execute();
  await removeFeedbackFromStudets.execute(students);
  await updateStudents.execute(students);
}

start();