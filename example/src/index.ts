import xwitch from 'xwitch';

const n = 42;

const s = xwitch(n)
  .case(0, () => 'zero')
  .case(1, () => 'one')
  .case(2, () => '42')
  .case(42, () => 'Answer to the Ultimate Question of Life, the Universe, and Everything')
  .default(() => 'nothing');

console.log('Answer is:' + (s.toString()));
