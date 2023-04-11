#!/usr/bin/env node
const { mdLinks } = require("./index");
const { totalLinks, uniqueLinks, brokenLinks } = require("./api");
const process = require("process");
var colors = require('colors/safe');
const argv = process.argv;
const path = process.argv[2];
// console.log(process.argv)

function cli() {
    const validate = argv.includes("--validate") || argv.includes("-v");
    const stats = argv.includes("--stats") || argv.includes("-s");
    
    if (path === undefined || path === "--help" || path === "-h") {
        console.log((colors.blue("\n-------------------------------------------------------------------------------------------\n                    Welcome to Md-links")) 
        + (colors.blue("\n-------------------------------------------------------------------------------------------")));
    console.log(colors.blue("Insert your path and write:"));
    console.log(colors.white("--validate: To validate the status of the links"));
    console.log(colors.white("--stats: To see statistics of the links"));
    console.log(colors.white("--validate --stats: To see statistics and status of the links "));
    console.log(colors.blue("-------------------------------------------------------------------------------------------"));

    process.exit(0);
    }
    else if (stats && validate) {
        return mdLinks(path, { validate: validate, stats }).then((links) => {
            console.log(colors.blue("\nTOTAL LINKS  :") + (colors.white(totalLinks(links))));
            console.log(colors.blue("\nUNIQUE LINKS :") + (colors.white(uniqueLinks(links))));
            console.log(colors.blue("\nBROKEN LINKS :") + (colors.white(brokenLinks(links))));
            console.log(colors.blue("-------------------------------------------------------------------------------------------"));
            process.exit(0);
        }).catch((error) => { console.log(error); 
        })
        
    } else if(stats && !validate) {
        return mdLinks(path, { validate: stats }).then((links) => {
            console.log(colors.blue("\nTOTAL LINKS  :") + (colors.white(totalLinks(links))));
            console.log(colors.blue("\nUNIQUE LINKS :") + (colors.white(uniqueLinks(links))));
            console.log(colors.blue("-------------------------------------------------------------------------------------------"));
            process.exit(0);
        }).catch((error) => { console.log(error); })

    } else if (!stats && validate) {
        return mdLinks(path, { validate: true }).then((resolve) => {
           console.log(resolve)
           process.exit(0);
         }).catch((error) => { console.log(error); 
        })
    } else {
        console.log(colors.red("If you need help use the command --help or --h"));
        console.log(colors.blue("-------------------------------------------------------------------------------------------"));
    
      }
}
cli()