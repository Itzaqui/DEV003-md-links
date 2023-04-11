const { mdLinks } = require('../index');
const {validPath, 
    absolutePath, 
    turnAbsolute, 
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
} = require('../api')



describe('validPath', () => {
  it('should be a function', () => {
      expect(typeof validPath).toBe('function');
  });
  it('should return true if the path is valid ', () => {
    const path = '/Users/Lenovo/Desktop/md-links/DEV003-md-links';
    expect(validPath(path)).toBeTruthy();
});
it('should return false if the path is not valid', () => {
    const path = '/Users/Itza/Desktop/md-links/DEV003-md-links';
    expect(validPath(path)).toBeFalsy();
});
});

describe('absolutPath', () => {
  it('should be a function', () => {
      expect(typeof absolutePath).toBe('function');
  });
  it('should return true if the path is absolute ', () => {
    const filePath = '/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md';
    expect(absolutePath(filePath)).toBeTruthy();
});
it('should return false if the path is not absolute', () => {
    const filePath = 'README.md';
    expect(absolutePath(filePath)).toBeFalsy();
});
});

describe('turnAbsolute', () => {
  it('should be a function', () => {
        expect(typeof turnAbsolute).toBe('function');
    });
  it('should change the path to absolute ', () => {
      const filePath = 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\README.md';
      const relativePath = 'README.md'
      expect(turnAbsolute(relativePath)).toBe(filePath);
  });
  it('should return the absolute path', () => {
      const filePath = '/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md';
      expect(absolutePath(filePath)).toBeTruthy();
  });
  });

describe('directory', () => {
  it('should be a function', () => {
        expect(typeof directory).toBe('function');
    });
    it('should return true if it is a directory ', () => {
      const dirPath = '/Users/Lenovo/Desktop/md-links/DEV003-md-links/test';
      expect(directory(dirPath)).toBeTruthy();
  });
  it('should return false if it is not a directory', () => {
      const dirPath = '/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md';
      expect(directory(dirPath)).toBeFalsy();
  });
  });

  describe('mdFile', () => {
    it('should be a function', () => {
        expect(typeof mdFile).toBe('function');
    });
    it('should return true if it is a md file ', () => {
      const filePath = '/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md';
      expect(mdFile(filePath)).toBeTruthy();
  });
  it('should return false if it is not a md file', () => {
      const filePath = '/Users/Lenovo/Desktop/md-links/DEV003-md-links/api.js';
      expect(mdFile(filePath)).toBeFalsy();
  });
  });

  describe('readFile', () => {
    it('should be a function', () => {
      expect(typeof readFile).toBe('function');
    });
    it('should read a text inside a file', () => {
      const filePath = 'C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/prueba/prueba.txt';
      expect(readFile(filePath)).toEqual("Estoy intentando leer un archivo");
    });
  });

  const arrayLinks = 
    [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\archivo4.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\archivo4.md'
      },
  ];

  const path = 'C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/archivo4.md'

  describe('getLinks', () => {
    it('should be a function', () => {
      expect(typeof getLinks).toBe('function');
    });
    it('should extract the links of md files', () => {
      expect (getLinks(path)).toEqual(arrayLinks);
   });
  });

  const arrOk = [{
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\archivo4.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\archivo4.md',
    status: 200,
    statusText: 'OK'
  }];


  global.fetch = jest.fn(() => {
    return Promise.resolve({ status: 200, statusText: 'OK' })
  })

  describe('validateLinks', () => {
  it('should be a function', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('should return the value of status and statusText ok', () => {
    validateLinks(arrayLinks).then(((response) => {
      expect(response).toEqual(arrOk);
    }));
  });
 });

 describe('readDirectory', () => {
  it('should be a function', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('should return files from a directory', () => {
    const userPath = 'C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/prueba'
    const files = [];
    expect (readDirectory(userPath, files)).toEqual(['C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\prueba\\archivo1.md',
    'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\prueba\\archivo2.md',
    'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\prueba\\archivo3.md',
    'C:\\Users\\Lenovo\\Desktop\\md-links\\DEV003-md-links\\prueba\\prueba.txt']);
 });
 });


 describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('should return a promise', () => {
    return mdLinks()
      .then(() => {
        expect(mdLinks).toBe(typeof 'promise')
      })
      .catch((err) => { err });
  });
  it('should return the value of status and statusText ok', async () => {
    const content = await mdLinks(path, { validate: true })
    expect(content).toEqual(arrOk)
  });
  it('should return the links with the value of href, text and file', async () => {
    const content = await mdLinks(path, { validate: false })
    expect(content).toEqual(arrayLinks)
  });
  it('should reject if there are no files md', () => {
    return mdLinks('C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/prueba/prueba.txt')
    .catch((err) => {
      expect(err).toBe('There are no files md')
    })
  })
 })

 describe('totalLinks', () => {
  it('should be a function', () => {
    expect(typeof totalLinks).toBe('function');
  });
  it('should add the total of links', () => {
    expect(totalLinks(links)).toBe(4);
  });
});

describe('uniqueLinks', () => {
  it('should be a function', () => {
    expect(typeof uniqueLinks).toBe('function');
  });
  it('should count the unique links', () => {
    expect(uniqueLinks(links)).toBe(4);
  });
});

describe('brokenLinks', () => {
  it('should be a function', () => {
    expect(typeof brokenLinks).toBe('function');
  });
  it('should count the broken links', () => {
    expect(brokenLinks(links)).toBe(1);
  });
});








// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
