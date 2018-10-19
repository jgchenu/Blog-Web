import {
    combineReducers
} from 'redux'
import {
    user
} from './redux/user.redux.js'
import {
    admin
} from './redux/admin.redux.js'
export default combineReducers({
    user,
    admin
})