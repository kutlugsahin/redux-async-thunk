function createAsyncThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      if (Object.getPrototypeOf(action).constructor.name === 'AsyncFunction') {
        return (async function() { await action(dispatch, getState, extraArgument); })();
      }

      if (Object.getPrototypeOf(action).constructor.name === 'GeneratorFunction') {
        var asy = require('async_polyfill');
        return asy(action)(dispatch, getState, extraArgument);
      }

      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const asyncThunk = createAsyncThunkMiddleware();
asyncThunk.withExtraArgument = createAsyncThunkMiddleware;

export default asyncThunk;