// const mdLinks = require('../');
const {validPath, 
    absolutePath, 
    turnAbsolute, 
    directory, 
    mdFile,
    readFile,
    getLinks} = require('../api')

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
      const filePath = '/Users/Lenovo/Desktop/md-links/DEV003-md-links/prueba.txt';
      expect(readFile(filePath)).toEqual("Estoy intentando leer un archivo");
    });
  });

  const arrayLinks = 
    [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'C:/Users/Lenovo/Desktop/md-links/DEV003-md-links/README.md'
      } 
  ];

 








// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
