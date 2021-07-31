const initState = {
    postList: [
        
    ]
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                postList: [
                    ...state.postList,
                    action.payload
                ]
            }
        case 'REMOVE_TODO':
            return {
                ...state,
                postList: action.payload
            }
        default:
            return state
    }
}

export default todoReducer;