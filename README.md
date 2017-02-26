# redux-async-thunk
Expension for thunk middleware for redux to enable async/await or generator/yield flow.
No need to install thunk middleware, it is supported as well.

# installation
```javascript
npm install redux-async-thunk --save
```

# usage

Apply redux-async-thunk middleware

```javascript
import { createStore, applyMiddleware } from 'redux';
import asyncThunk from 'redux-async-thunk';
import reducers from './reducers/index';

const store = createStore(
  reducers,
  applyMiddleware(asyncThunk)
);
```

On action

```javascript
function getSomeData(){
  return async function(dispatch, getState){
    let data = await fetch('http://exampleurl.com/data');
    dispatch({type: 'MY_ACTION_TYPE', data});
  }
}
```
Or
```javascript
function getSomeData(){
  return function* (dispatch, getState){
    let data = yield fetch('http://exampleurl.com/data');
    dispatch({type: 'MY_ACTION_TYPE', data});
  }
}
```
Or the original thunk way
```javascript
function getSomeData(){
  return function(dispatch, getState){
    fetch('http://exampleurl.com/data').then(data => {
      dispatch({type: 'MY_ACTION_TYPE', data});
    });    
  }
}
```