> We can create a http server via **Node.js**. There is a installed module which called http. But with
> **Express** it is really handy and efficient to create http server.

- _Node.js_ does not support **ES Modules** for now. **ES Modules** are which we use as `export` vs. `import`. It uses **CommonJS module** (which we use with `require`) by default.
- To prevent stop and restarting our http server, we downloaded nodemon as _development dependency_.
- **Dev Dependencies** are needed in development. They are not required for _production_. They are not included in the **production bundle** which is created by web bundlers like **WebPack**
- Nodemon keeps **tracks of changed files**, automatically restarts our http server.
- It is a good practice to save our request in _requests_ folder. WE install VS Code REST Client extension

### Running Project

- `yarn install` or `yarn` to install all the _dependencies_
- `yarn dev` to run application with _nodemon_.
