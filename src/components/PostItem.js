import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


//Single todo item component
const PostItem = (props) => {
    //Get postList from todoReducer
    const postList = useSelector(state => state.todos.postList)
    //Use for all the dispatch actions
    const dispatch = useDispatch();

    //Remove single todo in the list
    const removePostItem = (todoId) => {
        //filter to get the todoId which need to be remove
        let newTodoList = postList.filter(item => item.id !== todoId);
        dispatch({ type: 'REMOVE_TODO', payload: newTodoList })

    }

    return (
        <tr className="collection-item" key={props.item.id}>

            <td>{props.item.name}</td>
            <td>{props.item.email}</td>
            <td>{props.item.text}</td>

            <span
                onClick={() => {
                    removePostItem(props.item.id)
                }}
                className="secondary-content">
                <i className="remove-btn material-icons blue-text">clear</i>
            </span>
        </tr>
    );
}

export default PostItem;