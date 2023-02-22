@cryptosat/jsconsole
This package provides a web-based JavaScript console. It can be used in a web browser to execute JavaScript code, inspect variables, and debug code.

##Installation
###This package can be installed using npm or yarn. To install with npm, run:

    npm install @cryptosat/jsconsole
###To install with yarn, run:
    yarn add @cryptosat/jsconsole

## Development

###Enforcing Node.js and npm versions
To ensure that all developers working on the project use compatible versions of Node.js and npm, check the engines field of your package.json file. This field specifies the minimum required version of Node.js and npm.

to require Node.js version 16.0.0 or later and npm version 8.0.0 or later.

### Installation

To install the project dependencies first run:

    yarn install
    
### Testing
    
cd in to the project directory and run:

    yarn start

to runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deployment

To compile the app run:

    yarn build
    
This will create a directory called `build` in the project which can be served statically over the web. Once the command terminates you can run

    yarn global add serve
    serve -s build
  
To view it in a browser.

### Package 
builds the package for distribution
    yarn lib


## VIRTUAL ENVIRONMENT 

Steps you can follow to create a build environment and build jsconsole:

Install a Linux virtual machine on your computer. You can use VirtualBox or VMware to do this.

Install the latest version of Node.js (currently version 16.19) on the virtual machine. You can download it from the official Node.js website: https://nodejs.org/en/download/

Clone the cryptosat/jsconsole repository to your virtual machine using the following command:


git clone https://github.com/cryptosat/jsconsole.git
Navigate to the jsconsole directory using the following command:
```
    cd jsconsole
```


If you run into a memory error while building, you can try increasing the memory limit for Node.js. You can do this by setting the NODE_OPTIONS environment variable to --max_old_space_size=<memory limit> before running the yarn build command. For example, to set the memory limit to 4GB, you can use the following command:

```
    NODE_OPTIONS=--max_old_space_size=4096 yarn build
```