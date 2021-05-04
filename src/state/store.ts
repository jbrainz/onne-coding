import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { ActionTypes } from './action-types'

export const store = createStore(reducers, {}, applyMiddleware(thunk))

store.dispatch({
  type: ActionTypes.UPDATE_CELL,
  payload: {
    id: 'c05mt',
    content: 'new content',
  },
})
console.log(store.getState())
