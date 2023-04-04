const api = require("./api");

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    let absoPath = path;
    if(!api.validPath(path)) {
        reject(new Error("The path is invalid"));
    }
    if(!api.absolutePath(path)) {
        absoPath = api.turnAbsolute(path)
        if(api.isFile(absoPath)) {
            if(!api.mdFile(absoPath)) {
                reject(new Error("It is not a file md"))
            }
     
          }
    }
    let filesArray = []
    filesArray.push(absoPath)
    if(api.directory (absoPath)) {
      api.readDirectory(absoPath, filesArray);
      filesArray = filesArray.filter(filePath => api.mdFile(filePath))
     } 
    if(options.validate) {
    // filesArray.forEach((file))
    const statusLinks = api.validateLinks(api.getLinks(absoPath))
    statusLinks.then((obj) => {
      if(obj.length) {
        resolve(obj)
      }
      reject(new Error("There are no links in the file"))
    })
    }   else if(!options.validate) {
          const links = api.getLinks(absoPath)
          if(links.length) {
          resolve(links)
    }
          reject(new Error("There are no links in the file"))
     }
    
  }).catch((err) => {
    console.log(err)
  })
}

mdLinks('C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md', { validate: true }).then((resolve) => {
    console.log(resolve);
  
  })
  
    .catch((err) => {
        (err)
    });



module.exports = {
mdLinks
};
