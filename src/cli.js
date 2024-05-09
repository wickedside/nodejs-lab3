import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const handleInput = (input, output, task) => {
  // TODO: Реализовать логику обработки входных данных
};

const { input, output, task } = args;

if (!task) {
  console.error('Необходимо указать задачу (-t или --task)');
  process.exit(1);
}

handleInput(input, output, task)
  .then(() => console.log('Операция успешно завершена'))
  .catch(err => {
    console.error('Ошибка:', err);
    process.exit(1);
  });
