const user = { name: 'John' };
user.name = 'Marcus';

console.log(user.name);

const something = user;
something.name = 'Mary';

console.log(user.name);