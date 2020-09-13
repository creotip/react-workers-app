import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import generalReducer from '../redux/reducers/general'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  general: generalReducer,
})

composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export { store }
