const fs = require("fs");

// read grammer from grammer.txt
const fileData = fs.readFileSync("grammer2.txt", "utf8").trim();

// convert fileData grammer to object
const grammerToObject = (data) => {
  let dataobj = {};
  data.split("\n").forEach((elem) => {
    let arr = elem.trim().split("->");
    dataobj[arr[0].trim()] = arr[1]
      .split("|")
      .map((a) => a.trim().match(/[^\s]'*/gi));
  });
  return dataobj;
};

const grammerObj = grammerToObject(fileData);

let X = "X'";

// find common variable
const findVariable = (v, arr) => {
  let indexArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === v) {
      indexArr.push(i);
    }
  }
  return indexArr;
};

// left factoring function
const leftFactoring = (obj) => {
  let updObj = { ...obj };
  for (let key in obj) {
    for (let elem of obj[key]) {
      let arr = findVariable(elem[0], obj[key]);
      if (arr.length > 1) {
        updObj[X] = obj[key]
          .filter((a, i) => arr.indexOf(i) > -1)
          .map((a) => {
            if (a.slice(1).length === 0) {
              return ["@"];
            } else {
              return a.slice(1);
            }
          });
        updObj[key] = obj[key].filter((a, i) => arr.indexOf(i) < 0);
        updObj[key].push([obj[key][arr[0]][0], X]);
        X = X + "'";
        updObj = leftFactoring(updObj);
        break;
      }
    }
  }
  return updObj;
};

console.log(leftFactoring(grammerObj));