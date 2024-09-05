let languages: string[] = ["TypeScript", "JavaScript", "HTML", "CSS"];

languages[1] = "Java";

console.log(languages);

languages.push("Java2");

let removed: string | undefined = languages.pop();
console.log("Removed 1: " + removed);

languages.unshift("Go");

let removed2: string | undefined = languages.shift();
console.log("Removed 2: " + removed2);

let removed3 = languages.splice(1, 1);
console.log("Removed 3: " + removed3);
console.log(languages);

languages.splice(1, 0, "Python");
console.log(languages);

for (let i = 0; i < languages.length; i++) {
  const language: string = languages[i];
  console.log(language);
}

let callback = function (language: string, i: number) {
  console.log("#" + i + " - " + language);
};

languages.forEach(callback);
