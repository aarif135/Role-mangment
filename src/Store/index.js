import {createStore} from 'redux'
import rootreducer from './rootReducer.js'
const store=createStore(rootreducer)
export default store