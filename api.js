const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const example = "C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md";
const example2 = "./README.md";
const example3 = "C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/test";
const example4 = "C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/prueba.txt";

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
// console.log(absolutePath("README.md"))

const turnAbsolute = (filePath) => {
  return (path.resolve(filePath));
}
// console.log(turnAbsolute("./README.md"))

const isFile = (path) => fs.statSync(path).isFile();

// console.log(isFile("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md"))

function directory(dirPath) {
  const stats = fs.statSync(dirPath);
  if  (stats.isDirectory()) {
    return true
  }
  else {
    return false
  }
};
// console.log(directory(example3))


function mdFile(filePath) {
  const extName = path.extname(filePath);
  if (extName === ".md") { 
      return true;
  } else {
      return false;
  }
};
// console.log(mdFile(example))

const readFile = (path) => {
  return (fs.readFileSync(path, 'utf8'));
}
//  console.log(readFile("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/archivo4.md"))



function getLinks(path) {
 const data = readFile(path)
 const regEx = /\[[^\[\]]*\]\((https?):\/\/[^\(\)]+\)/gi;
 let arrayLinks = data.match(regEx)
 let newArray = [];
 for(let i=0; i<arrayLinks.length; i++) {
  newArray.push({
    href: arrayLinks[i].slice(arrayLinks[i].indexOf('](h') + 2, -1),
    text: arrayLinks[i].slice(1, arrayLinks[i].indexOf(']')),
    file: turnAbsolute(path),
  })
 }
 return newArray
};

// console.log(getLinks("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/archivo4.md"))


function validateLinks(arr) {
  return new Promise((resolve) => {
  let arrayLinks = [];
  for(let i= 0; i<arr.length; i++) {
  fetch(arr[i].href)
    .then((res)=>{
      arrayLinks.push({
        href: arr[i].href,
        text: arr[i].text,
        file: arr[i].file,
        status: res.status,
        statusText: res.statusText,
       })   
       if (arrayLinks.length === arr.length) {
        resolve(arrayLinks)
        }  
  })
   .catch((error)=>{
    arrayLinks.push({
      href: arr[i].href,
      text: arr[i].text,
      file: arr[i].file,
      status: 404,
      statusText: "fail",  
    })
    resolve(arrayLinks)
  })
  }
  })  
}; 

// const resultado = getLinks("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md");
// validateLinks(resultado)
//  .then((res) => console.log(res))
// .catch((error) => console.log(error))


function readDirectory(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    const absPath = path.join(dirPath, file)
    if(directory(absPath)) {
    readDirectory(absPath, arrayOfFiles)
    } else {
      arrayOfFiles.push(absPath)
    }
  })
 return arrayOfFiles
};

// const filesDirectory = []
// console.log(readDirectory("C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/prueba", filesDirectory))

const links = [
  {
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Status',
    text: 'Códigos de estado de respuesta HTTP - MDN',
    file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\README.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
    text: 'Generalidades del protocolo HTTP - MDN',
    file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\README.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Messages',
    text: 'Mensajes HTTP - MDN',
    file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\README.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',  
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
    file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\README.md',
    status: 404,
    statusText: 'fail'
  }
];

const totalLinks = (links) => {
  const total = links.length;
  return total;
};

// console.log(totalLinks(links))

const uniqueLinks = (links) => {
  const unique = links.map((link) => link.href)
  return unique.length;
};

// console.log(uniqueLinks(links))

const brokenLinks = (links) => {
  const broken = links.filter((link) => link.status !== 200)
  return broken.length
}

// console.log(brokenLinks(links))




module.exports = {
  validPath, 
  absolutePath,
  turnAbsolute,
  isFile,
  directory,
  mdFile,
  readFile,
  getLinks,
  validateLinks,
  readDirectory,
  totalLinks,
  uniqueLinks,
  brokenLinks,
  links,
};

  
  
  
 

  
 
    
   

    


  

  