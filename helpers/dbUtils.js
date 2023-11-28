const { readFromFile, writeToFile } = require("./fsUtils");
const fs = require("fs");

// const updateIDs = function () {
//   console.log("update ID started");
//   let arr = []
//     readFromFile('./db/db.json').then((data) =>  {arr = data})
//   console.log("array: ", arr);
//   if (arr) {
//     for (let i = 0; i < arr.length; i++) {
//       arr[i].id = i;
//     }
//   }

//   localStorage.setItem("savedNotes", JSON.parse(arr));
//   return;
// };


//function used to delete a specific ID. 
const deleteID = function (id) {

  let index = Number(id) - 1;

  let arr = [];
  
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;

    arr = JSON.parse(data);

    if (index < arr.length) {
      //we use a splice to remove the object at the index
      arr.splice(index, 1);
      console.log("array after splice: ", arr);

      //this loop updates the objects in the array so their ID corresponds to their position within the array. 
      for (let i = 0; i < arr.length; i++) {
        arr[i].id = i + 1;
      }

      fs.writeFile("./db/db.json", JSON.stringify(arr), (err) => {
        if (err) {
          console.log(err);
        }
      });
      //return true if we were able to remove an element from the array. 
      return true;
    } else {
      //return false if the index is out of bounds. This will give an "ID not found" error.
      return false;
    }
  });
};

module.exports = { deleteID };
