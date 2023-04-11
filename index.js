const api = require("./api");
var colors = require('colors/safe');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    let absoPath = path;
    if(!api.validPath(path)) {
        reject(new Error(colors.red("The path is invalid")));
    }
    if(!api.absolutePath(path)) {
        absoPath = api.turnAbsolute(path)
        if(api.isFile(absoPath)) {
            if(!api.mdFile(absoPath)) {
                reject(new Error(colors.red("It is not a file md")))
            }    }
    }
    let filesArray = []
    filesArray.push(absoPath)
    if(api.directory (absoPath)) {
      api.readDirectory(absoPath, filesArray);
      filesArray = filesArray.filter(filePath => api.mdFile(filePath))
     } 
    if(options.validate) {
    let arrayPromises = []
    filesArray.forEach((file) => {
    const validArray = api.validateLinks(api.getLinks(file))
    arrayPromises.push(validArray)
    })
    Promise.allSettled(arrayPromises)
    .then((promises) => {
      let promiseArray = []
      promises.forEach((promise) => {
      promiseArray = promiseArray.concat(promise.value)
      })
      resolve(promiseArray)
    })
    }  else if(!options.validate) {
          let links = []
          filesArray.forEach((file) => {
          links = api.getLinks(file)
          })
        resolve(links)
    }  else {
      reject(new Error(colors.red("There are no files md"))); 
    }  
  }).catch((err) => {
    (err)
  })  
  }


// mdLinks('prueba', { validate: true })
// .then((resolve) => {
//     console.log(resolve);
  
//   }).catch((err) => {
//         (err)
//     });



module.exports = {
mdLinks
};
