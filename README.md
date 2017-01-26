# crudux

*Note:* crudux is still a work in progress.

Crudux is an attempt to dry up applications using Redux.

After creating a few Redux applications, we noticed we kept rewriting the
basic entity reducers/selectors. From those applications I've distilled some basic principals into `crudux`.

### Goals
- Keep request metadata state
  - crudux stores metadata about requests so that your application can show appropriate loading indicators
- Paging
  - crudux knows paging.  We store pages and paging information from your requests to make it simple to 
    page over your entities.
  - Paging state is grouped into isolated `PageGroups` which allow multiple paging instances at once.
- Don't mess with your entities
  - crudux stores operational metadata separately from your entities so you can expect to get out what you put in


Crudux comes with a reducer, and a set of actions / selectors to store your entity state.

It uses [normalizr](https://github.com/paularmstrong/normalizr) under the hood to store your entities
in a normalized way.


### Installation
```
npm install --save crudux
# or 
yarn add crudux
```

### Usage
- `TODO` - Fill this section out on how to create a reducer and attach it to your store.

## TODO
- [ ] Finish testing for `reducers` and `actions`.
- [ ] Flush out tracking of optimistic changes for `creating` and `updating`

### Thanks
This library was inspired by some great libraries out there.
- [redux-crud](https://github.com/Versent/redux-crud) for some initial ideas
- [Redux Real World Example](https://github.com/reactjs/redux/tree/master/examples/real-world) For the start of how to store entities
