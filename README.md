# mvnch

[![npm](https://img.shields.io/npm/v/mvnch.svg)](https://www.npmjs.com/package/mvnch)
[![bitHound Code](https://www.bithound.io/github/YagoGG/mvnch/badges/code.svg)](https://www.bithound.io/github/YagoGG/mvnch)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/YagoGG/mvnch/master/LICENSE)

A Node.js command line tool that allows you to easily take screenshots of
websites.

Powered by [phantom](https://www.npmjs.com/package/phantom).

## Installation

mvnch is available as a npm package, so you can install it by running:

    npm install -g mvnch

## Usage

    mvnch [options] <url>

    Options:

        -h, --help           output usage information
        -V, --version        output the version number
        -o, --output <file>  file to save the screenshot. Default: output.png
        -w, --width <px>     width of the emulated browser. Default: 1920
        -h, --height <px>    height of the emulated browser. Default: 1080
        -s, --sleep <ms>     time to wait before taking the shot. Default: 0
        -d, --disable-js     disable JavaScript when loading the page

    The result will have the same format as the extension of the file specified
    in --output.
    Note that --sleep starts to count after the page has been fully loaded (i.e.
    all images, etc. are ready). Thus, no need to use this to overcome slow
    connections.

## License

All of mvnch's code is under the MIT license, which can be read in this
repo's LICENSE file.
 
---

&copy; 2017 [Yago González](https://github.com/YagoGG). All rights reserved.
