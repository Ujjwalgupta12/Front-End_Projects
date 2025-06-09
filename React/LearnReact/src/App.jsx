import { useEffect, useState } from "react";
import classes from './components/style.module.css';
import TodoItem from './components/todo-item'
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";




function App() {

const [loading,setLoading] = useState(false);
const [todoList,setTodoList] = useState([]);
const [errorMsg, setErrorMsg] = useState(null);
const [todoDetails, setTodoDetails] = useState(null);
const [openDialog, setOpenDialog] = useState(false);



async function fetchListOfTodos(){
  try{
    setLoading(true);
    const apiReponse = await fetch('https://dummyjson.com/todos');
    const result = await apiReponse.json();

    console.log(result);
    if(result?.todos && result?.todos?.length > 0) {
      setTodoList(result?.todos);
      setLoading(false)
    }else{
      setTodoList([])
      setLoading(false)
      setErrorMsg("Error")
    }

  }catch(e){
    console.log(e)
    setErrorMsg("Some Error Ocurred")
  }
}



 async function fetchDetailsOfCurrentTodo(getCurrentTodoId){
  console.log(getCurrentTodoId)
  try{
    const apiResponse = await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`)
    const details = await apiResponse.json()
    if(details){
      setTodoDetails(details);
      setOpenDialog(true)
    }else{
      setTodoDetails(null)
      setOpenDialog(false)
    }

    console.log(result);
    
  }catch(error){
    console.log(error)
  }
 }




useEffect (() =>{
  fetchListOfTodos()
},[]);

if (loading) {
  return (
    <div className={classes.mainwrapper}>
      <h1 className={classes.headerTitle}>TODO APP material UI</h1>
      <div className={classes.todoListWrapper}>
        {Array.from(new Array(6)).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={280}
            height={140}
            animation="wave"
            sx={{ borderRadius: 3 }}
          />
        ))}
      </div>
    </div>
  );
}


  return (
    <div className={classes.mainwrapper}>
      <h1 className={classes.headerTitle}>TODO APP material UI</h1>
      <div className={classes.todoListWrapper}>
        {
          todoList && todoList.length > 0 ?
          todoList.map((todoItem ,index)=><TodoItem fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo} key={`${todoItem.id}-${index}`} todo={todoItem}/>) : null
        }
      </div>
      <TodoDetails setOpenDialog={setOpenDialog} openDialog={openDialog} todoDetails={todoDetails} setTodoDetails={setTodoDetails}/>
    </div>
  )
}

export default App
