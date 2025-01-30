export function generateRandomEmail() {
  const names = [
    "john",
    "jane",
    "bob",
    "alice",
    "peter",
    "mary",
    "james",
    "sarah",
  ];
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "potatostan.gov"];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}${Math.floor(Math.random() * 1000)}@${domain}`;
}

export function generateRandomName() {
  const firstNames = [
    "Ivan",
    "Boris",
    "Natasha",
    "Vladimir",
    "Olga",
    "Dmitri",
    "Anna",
    "Mikhail",
  ];
  const lastNames = [
    "Potatov",
    "Spudnik",
    "Tuberov",
    "Yamnaya",
    "Rootski",
    "Soilovich",
  ];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
}

export function generateUniqueNumbers(count) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * 1000) + 1);
  }
  return Array.from(numbers);
}
