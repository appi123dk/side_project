// 1. stringify
let json = JSON.stringify(true);

const rabbit = {
  name: 'torri',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${rabbit.name} jump!!`);
  },
}

json = JSON.stringify(rabbit);
json = JSON.stringify(rabbit, ['name', 'size']);
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`${key}: ${value}`);
  return value;
});
console.log(json);

// 2. parse

obj = JSON.parse(json, (key, value) => {
  return key === 'birthDate' ? new Date(value) : value;
});

console.log(obj);