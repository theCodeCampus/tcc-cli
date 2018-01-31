# tcc-cli - theCodeCampus Command Line Interface

## Installation

Run ```npm install @thecodecampus/tcc-cli --save-dev``` in your project.
Add a script to your package.json to use local installation.

```
"scripts": {
    "tcc": "tcc"
}
```

Or run it via ```node_modules/.bin/tcc```

## Usage

Run ```tcc --help``` to see available commands and options.

Create a "tcc-cli-config.js" file in your project. See ```node_modules/@thecodecampus/tcc-cli/tcc-cli-config.sample.js```.

## Development

Run ```npm link``` in your clone of this repo. Do not install or remove installation in project.
