import minimist from 'minimist';
import { uncollapse } from './uncollapse.js';
import { matrixAddition } from './matrixAddition.js';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const args = minimist(process.argv.slice(2));

const handleInput = (input, output, task) => {
    const inputSrc = input ? createReadStream(input) : process.stdin;
    const outputSrc = output ? createWriteStream(output) : process.stdout;
  
    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        let data;
        if (task === 'uncollapse') {
          data = uncollapse(chunk.toString());
        } else if (task === 'matrixAddition') {
          data = JSON.stringify(matrixAddition(JSON.parse(chunk.toString())));
        }
        this.push(data);
        callback();
      }
    });
  
    return pipeline(inputSrc, transformStream, outputSrc);
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
