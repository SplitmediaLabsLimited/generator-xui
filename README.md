# Generator-XUI

This is a Yeoman Generator for scaffolding an XSplit plugin using the [XUI Framework](https://github.com/SplitmediaLabsLimited/xui).

## Scaffold a new XUI Plugin project (JS Based)
- Verify that Yeoman is installed

  ```shell
  npm install -g yo
  ```
- Install the xui generator

  ```shell
  npm install -g generator-xui
  ```
- Create a new plugin folder

  ```shell
  mkdir YOUR_PLUGIN_NAME
  cd YOUR_PLUGIN_NAME
  ```
- Execute our yo generator

  ```shell
  yo xui
  ```

That shall scaffold the basic structure of an XSplit plugin for you.

## Scaffold a new XUI Plugin project (TypeScript based)
- Verify that Yeoman is installed

  ```shell
  npm install -g yo
  ```
- Install the xui generator

  ```shell
  npm install -g generator-xui
  ```
- Create a new plugin folder

  ```shell
  mkdir YOUR_PLUGIN_NAME
  cd YOUR_PLUGIN_NAME
  ```
- Execute our yo generator with the `ts` flag

  ```shell
  yo xui:ts
  ```
That shall scaffold the basic structure of an XSplit plugin for you using TypeScript, including definition files for es6 Promises and the internal definition files.

- To compile your TypeScript  files, run `gulp` on the project root. This will compile all your TypeScript files and output it to `main.js` under `js` folder.
