import {createStore, combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

let redTok = (state, action)=>{
    if (state === undefined)return { token: null }
    if (action.type === "addToken")return { token: action.t }
    if (action.type === "delToken")return { token: null }
    return state
}
const mainReducer = combineReducers({
  tok: redTok,
  form: formReducer
})

let tokenAdd = token => ({type: "addToken", t: token})
let tokenDel = () => ({type: "delToken"})

const store = createStore(mainReducer)
export {store, tokenAdd, tokenDel}
