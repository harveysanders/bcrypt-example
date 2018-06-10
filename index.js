const bcrypt = require('bcrypt');
const moment = require('moment');
const timer = require('simple-timer')

const rounds = 13;
const password = 'ungu3$$@b73'
timer.start('salt')

const msToSec = (ms) => ms / 1000;

bcrypt.genSalt(rounds)
.then(salt => {
    timer.stop('salt');
    timer.start('hash');
    console.log(`Took ${msToSec(timer.get('salt').delta)} seconds to generate salt in ${rounds} rounds:\n${salt}\n`);
    return Promise.all([ bcrypt.hash(password, salt), moment() ]);
  })
  .then(([ hash, hashStart ]) => {
    timer.stop('hash');
    console.log(`Took ${msToSec(timer.get('hash').delta)} seconds to generate hash in ${rounds} rounds:\n${hash}\n`);
    return hash;
  })
  .then((hash) => {
    timer.start('compare');
    return bcrypt.compare(password, hash);
  })
  .then((isAuthenticated) => {
    timer.stop('compare');
    console.log(`Took ${msToSec(timer.get('compare').delta)} seconds to compare ${isAuthenticated ? 'correct' : 'incorrect'} password to hash in ${rounds} rounds.`);
  })
  .catch(e => console.error(e));