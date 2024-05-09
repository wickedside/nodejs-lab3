import minimist from 'minimist';
import { uncollapse } from './uncollapse.js';
import { matrixAddition } from './matrixAddition.js';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const args = minimist(process.argv.slice(2), {
    alias: {
      t: 'task',
      i: 'input',
      o: 'output'
    }
  });

  const handleInput = (input, output, task) => {
    const inputSrc = input ? createReadStream(input, 'utf8') : process.stdin;
    const outputSrc = output ? createWriteStream(output) : process.stdout;

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            let data;
            if (task === 'uncollapse') {
                data = uncollapse(chunk.toString());
            } else if (task === 'matrixAddition') {
                try {
                    const matrices = JSON.parse(chunk.toString());
                    if (matrices.length !== 2) {
                        throw new Error('Должно быть 2 матрицы');
                    }
                    data = JSON.stringify(matrixAddition(matrices[0], matrices[1]));
                } catch (err) {
                    return callback(err);
                }
            }
            this.push(data);
            callback();
        },
        readableObjectMode: true,
        writableObjectMode: true
    });

    return pipeline(inputSrc, transformStream, outputSrc)
        .catch(err => {
            console.error('Pipeline failed:', err);
        });
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
