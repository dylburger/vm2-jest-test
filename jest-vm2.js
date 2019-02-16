const {NodeVM} = require('vm2');

const vm = new NodeVM({
  console: 'inherit',
  require: {
    external: true,
    root: './',
  },
});

vm.run(
  `
  const expect = require('expect');

  const envRegex = new RegExp('prod|stage|dev');

  const expectedShape = {
    body: {
      env: expect.stringMatching(envRegex),
    },
  };

  const $event = {
    body: {
      env: 'prod',
    },
  };

  expect($event).toMatchObject(expectedShape);
`,
  'index.js',
);
