const busket = new WeakMap();
const map = new Map();
const set = new Set();
const collectionSet = [];

const target = {
    name: "maggie",
    age: "30"
};
function getName() {
    return target.name;
}
function getAge() {
    return target.age;
}

busket.set(target, map);
map.set("name", set);
set.add(getName);
set.add(getAge);
collectionSet.push(set);

for (let index = 0; index < collectionSet.length; index++) {
    const element = collectionSet[index];
    // element.delete(getName);
}

console.log(set);








