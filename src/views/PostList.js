import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostItem from '../components/PostItem';
import Modal from 'react-modal';
import 'reactjs-popup/dist/index.css';


const PostList = () => {

  //#2 Used to get a single attribute or object inside the Reducer

  //Get postList from todoReducer
  const postList = useSelector(state => state.todos.postList);

  //Use for all the dispatch actions
  const dispatch = useDispatch();

  //Local state for the input
  const [inputName, setPostName] = useState('');
  const [inputEmail, setPostEmail] = useState('');
  const [inputText, setPostText] = useState('');
  //const [inputDescription, setPostDescription] = useState('');
  //Local state for the input error message
  const [errMsg, setErrMsg] = useState('');
  const [filterText, setFilterText] = useState("");


  const [show, setShow] = useState(false);
  const [showEdit, setEditShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);


  //Handle onChange event
  function handleEdit(e) {
    const post = postList.filter(
      function (postList) { return postList.id === e });
    console.log(post)
  }

  const handleNameInput = (e) => {
    setPostName(e.target.value);
  }

  const handleEmailInput = (e) => {
    setPostEmail(e.target.value);
  }

  const handleTextInput = (e) => {
    setPostText(e.target.value);
  }


  //filter for search feature

  const filteredItems = postList.filter(
    item =>
      item.name.toLocaleLowerCase().includes(filterText) ||
      item.email.toLocaleLowerCase().includes(filterText) ||
      item.text.toLocaleLowerCase().includes(filterText)
  );

  const itemsToDisplay = filterText ? filteredItems : postList;
  console.log(itemsToDisplay)

  const removePostItem = (todoId) => {
    //filter to get the todoId which need to be remove
    let newTodoList = postList.filter(item => item.id !== todoId);
    dispatch({ type: 'REMOVE_TODO', payload: newTodoList })

  }

  //Handle onClick event
  const addNewTodo = () => {
    //Valid input value

    if (inputName.trim().length > 0 && inputEmail.trim().length > 0
      && inputText.trim().length > 0) {
      if (inputEmail.trim().includes("@")) {
        setErrMsg('');
        let newTodoObject = {
          id: postList.length + 1,
          name: inputName,
          email: inputEmail,
          text: inputText,

        }
        //Add new todo item into List with the action
        dispatch({ type: 'ADD_TODO', payload: newTodoObject });
        //Empty input 
        setPostName('');
        setPostEmail('');
        setPostText('');
        setShow(false)
        setEditShow(false)
      }
      else{
        setErrMsg('Invalid email address');
      }
    }
    else {
      //Display Error message
      setErrMsg('Empty input');
    }
  }



  return (
    <section id="section-todo">

      <h3 className="center-align white-text blue">Post BBS</h3>

      <input
        type="text"
        placeholder="Search the post"
        value={filterText}
        onChange={e => setFilterText(e.target.value.toLocaleLowerCase())}
      />

      <div>
        <button variant="primary" onClick={handleShow}>
          Create Post
        </button>
      </div>



      <Modal className="Modal" isOpen={show}>

        <div className="row">
          <p className="red-text err-msg col s12 center-align">
            {errMsg}
          </p>
          <div className="input-field col s10">
            <div>
              Author Name(Max 20 Character):
              <input onChange={handleNameInput} value={inputName} maxlength="20" placeholder="e.g. John Smith" id="todo-input" type="text" />
            </div>
            <div>
              Author Email(Max 30 Character):
              <input onChange={handleEmailInput} value={inputEmail} maxlength="30" placeholder="e.g. xxx@xxx.com" id="todo-input" type="text" />
            </div>

            <div>
              Free Text Area(Max 150 Character):
              <input onChange={handleTextInput} value={inputText} maxlength="150" placeholder="e.g. Hello..." id="todo-input" type="text" />
            </div>


          </div>
        </div>
        <button className="btn col s2 blue" onClick={addNewTodo} >Create Post</button>
        <button className="btn col s2 blue" onClick={handleClose} >Cancel</button>
      </Modal>

      <Modal className="Modal" isOpen={showEdit}>
        <div className="row">
          <p className="red-text err-msg col s12 center-align">
            {errMsg}
          </p>
          <div className="input-field col s10">
            <div>
              Replier name(Max 20 Character):
              <input onChange={handleNameInput} value={inputName} maxlength="20" placeholder="e.g. John Smith" id="todo-input" type="text" />
            </div>
            <div>
              Replier Email(Max 30 Character):
              <input onChange={handleEmailInput} value={inputEmail} maxlength="30" placeholder="e.g. xxx@xxx.com" id="todo-input" type="text" />
            </div>
            <div>
              Replier Free Text Area(Max 150 Character):
              <input onChange={handleTextInput} value={inputText} maxlength="150" placeholder="e.g. Hello..." id="todo-input" type="text" />
            </div>

          </div>
        </div>
        <button className="btn col s2 blue" onClick={addNewTodo} >Reply Post</button>
        <button className="btn col s2 blue" onClick={handleEditClose} >Close</button>
      </Modal>

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Post Text</th>
        </tr>
      </thead>



      {
        postList.length > 0 ?
          (<ul className="collection">
            {
              itemsToDisplay.map(item => {
                return <div>
                  <button className="edit-btn" onClick={handleEditShow}
                  >Reply This Post</button>
                  <span
                    onClick={() => {
                      removePostItem(item.id)
                    }}
                    className="secondary-content">
                    <i className="remove-btn material-icons blue-text">clear</i>
                  </span>

                  <div key={item.id}>
                    <div class="row">
                      <div class="column">{item.name}</div>
                      <div class="column">{item.email}</div>
                      <div class="column">{item.text}</div>
                    </div>


                  </div>
                </div>
              })
            }
          </ul>) :
          (<p className="center-align">Post BBS is empty now.</p>)
      }


    </section>
  );
}

export default PostList;