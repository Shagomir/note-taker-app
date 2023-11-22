const { readFromFile, writeToFile } = require("./fsUtils");
 ;

const updateIDs = function (path) {
  let arr;
  console.log("update ID started");
  readFromFile(path).then((data) => {
    console.log(data)
    arr = JSON.parse(data);
  });
  console.log("array: ", arr);
  for (let i = 0; i < arr.length; i++) {
    arr[i].id = i;
  }
  writeToFile(path, arr);
  return;
};

const deleteID = function (path, id) {
  let array;
  readFromFile(path).then((data) => {
    array = JSON.parse(data);
  });
  if (id < array.length) {
    console.log(array);
    array.splice(id, 1);
    writeToFile(path, array);
    updateIDs(path);
    return true;
  } else {
    return false;
  }
};

module.exports = { updateIDs, deleteID };
