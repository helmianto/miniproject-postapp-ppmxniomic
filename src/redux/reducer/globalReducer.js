import ActionType from './globalActionType';

const globalState = {
    posts : []
}

//Reducer
const rootReducer = (state = globalState, action) => {
    if(action.type === ActionType.SET_POSTS) {
        return {
            ...state,
            posts: action.data
        }
    }
    return state;
}

export default rootReducer;