# mvnch

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
        -w, --width <px>     viewport width of the emulated browser
        -h, --height <px>    viewport height of the emulated browser
        -s, --sleep <ms>     milliseconds to wait before taking the screenshot
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
