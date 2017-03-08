// built in imports
import 'babel-core/register';
import 'babel-polyfill';

import workerFarm from 'worker-farm';

const workers = workerFarm(require.resolve('./worker'));

let ret = 0;

for (let i = 0; i < 10; i++) {
  workers(`#${i } FOO`, (err, outp) => {
    console.log(outp);
    if (++ret === 10) workerFarm.end(workers);
  });
}
