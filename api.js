const fs = require("fs");
const path = require("path");

const example = "C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md";
const example2 = "./README.md"
const example3 = "C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/test";
const example4 = "C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/prueba.txt"

function validPath(path) {
  if (fs.existsSync(path)) {
    return true
  }
else {
     return false
  }
}
// console.log(validPath(example))

function absolutePath(filePath) {
 if(path.isAbsolute(filePath)) {
  return true
 }
 else {
  return false
 }
}
// console.log(absolutePath(example2))

const turnAbsolute = (filePath) => {
  return (path.resolve(filePath));
}
console.log(turnAbsolute(example2))

function directory(dirPath) {
  const stats = fs.statSync(dirPath);//devuelve informacion sincronicamente sobre la ruta
  if  (stats.isDirectory()) {
    return true
  }
  else {
    return false
  }
};
// console.log(directory(example3))


function mdFile(filePath) {
  const extName = path.extname(filePath);//devuelve la extensión de la ruta de archivo despues del .
  if (extName === ".md") {  // compara la ruta con md
      return true;
  } else {
      return false;
  }
};
// console.log(mdFile(example))

const readFile = (path) => fs.readFileSync(path, 'utf8');
 // console.log(readFile(example4))

function getLinks(path) {
  const data = readFile(path)
  const regExp = /\[[^\[\]]*\]\((https?):\/\/[^\(\)]+\)/gi;
  let arrayLinks = data.match(regExp)
  let newArray = [];
  for(let i=0; i<arrayLinks.length; i++) {
    newArray.push({
      href: arrayLinks[i].slice(arrayLinks[i].indexOf('](h') + 2, -1),
      text: arrayLinks[i].slice(1, arrayLinks[i].indexOf(']')),
      file: path,
    });
  }
  return newArray
};
// console.log(getLinks("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md"))


function validateLinks(arr) {
  let arrayLinks = [];
  for(let i= 0; i<arr.length; i++) {
  fetch(arr[i].href).then((res)=>{
    if(res.status >= 200 && res.status <= 299){
      arrayLinks.push({
        href: arr[i].href,
        text: arr[i].text,
        file: arr[i].file,
        status: res.status,
        statusText: res.statusText,
       })
    }
    else {
      throw Error(res.statusText);
    }
  })
  .catch((error)=>{
    console.log(error)
    arrayLinks.push({
      href: arr[i].href,
      text: arr[i].text,
      file: arr[i].file,
      status: "",
      statusText: "",  
    })
  })
  }
  return Promise.all(arrayLinks)
}

// console.log(getLinks("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md"))
// const resultado = getLinks("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md");
// console.log(validateLinks(resultado))





// fetch("https://es.wikipedia.org/wiki/Markdown").then((res)=>{
//   console.log(res)
// })

  
module.exports = {
  validPath, 
  absolutePath,
  turnAbsolute,
  directory
};

  
  
  
 

  
 
    
   

    


  

  