#!/usr/bin/env node

"use strict";
// jshint esversion: 6

const pkg      = require('./package.json'),
      chalk    = require('chalk'),
      phantom  = require('phantom'),
      program  = require('commander');

program
    .version(pkg.version)
    .usage('[options] <url>')
    .option('-o, --output <file>', 'file to save the screenshot. ' +
                                   'Default: output.png')
    .option('-w, --width <px>', 'viewport width of the emulated browser')
    .option('-h, --height <px>', 'viewport height of the emulated browser')
    .option('-s, --sleep <ms>', 'milliseconds to wait before taking the ' +
                                'screenshot')
    .option('-d, --disable-js', 'disable JavaScript when loading the page');

// Extend the help text
['', '-h', '--help'].forEach(function(e) {
    program.on(e, function() {
        console.log('The result will have the same format as the ' +
                    'extension of the file specified\nin --output.');
        console.log('Note that --sleep starts to count after the page ' +
                    'has been fully loaded (i.e.\nall images, etc. are ' +
                    'ready). Thus, no need to use this to overcome slow\n' +
                    'connections.');
    });
});

program.parse(process.argv);

if(!program.args.length) {  // Show the help message if there are no args
    program.help();
}

const url = program.args[0];

// Display the header
print_name();
console.log(chalk.dim('Version ' + pkg.version + '\n'));
console.log('Taking a screenshot of '+ url + '...\n');

const options = {
    width: program.width || 1920,
    height: program.height || 1080,
    output: program.output || './output.png',
    sleep: program.sleep || 0
};

var _page = null;
var _ph = null;

phantom.create()
    .then(function(instance) {
        _ph = instance;
        return _ph.createPage();
    })
    .then(function(page) {  // Set the custom page configuration
        _page = page;
        _page.property('javascriptEnabled', program.disable_js || true);
        _page.property('viewportSize', {
            width: options.width,
            height: options.height
        });

        return _page.open(url);
    })
    .then(function(status) {
        if(status !== 'success') {
            throw 'Error: couldn\'t load the specified page.';
        }
        return new Promise(function(resolve, reject) {
            setTimeout(function(){  // Sleep (if needed)
                resolve(_page.render(options.output));
            }, options.sleep);
        });
    })
    .then(function() {
        console.log(chalk.green('Done! Your screenshot has been saved in ' +
                    options.output));
        _page.close();
        _ph.exit();
    })
    .catch(function(error) {
        console.error(chalk.red(error));
        _ph.exit();
    });

function print_name() {
    console.log(chalk.blue("                           _\n" +
                " _ __ _____   ___ __   ___| |__  \n" +
                "| '_ ` _ \\ \\ / / '_ \\ / __| '_ \\\n" +
                "| | | | | \\ V /| | | | (__| | | |\n" +
                "|_| |_| |_|\\_/ |_| |_|\\___|_| |_|\n"));
}
