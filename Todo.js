import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {FaPencilAlt, FaTrash, FaSave} from 'react-icons/fa'
import {GiMagnifyingGlass} from 'react-icons/gi'
import {Container} from './App'
export default function Todo({email}) {
    const [todos, setTodos] = useState([])
    const [newTodos, setNewTodos] = useState(false)
    const [changeTodo, updateChangeTodo] = useState({i: null, type:false})
    const newTodo = useRef(null)

    const addTodos = () => {
        const values = [...todos];
        values.unshift("");
        setTodos(values);
        setNewTodos(true)
    }

    const changeTodos = (index) => {
        const values = [...todos].filter(val=>val!== '');
        if(index){
            values[index] = newTodo.current.value
        }else{
            values.unshift(newTodo.current.value)
        }
        setTodos(values);
        localStorage.setItem(email, JSON.stringify(values));
        setNewTodos(false)
        updateChangeTodo({i: null, type:false})
    }

    const deleteTodo = (index) => {
        const values = [...todos]
        values.splice(index,1)
        setTodos(values)
        localStorage.setItem(email, JSON.stringify(values));
    }

    const updateTodo = (index) => {
        updateChangeTodo({i: index, type:true})
    }

    const filterTodos = (values) => {
        const todos = JSON.parse(localStorage.getItem(email))
        const result = todos.filter(val => val.toLowerCase().includes(values.toLowerCase()));
        setTodos(result)
    }
    const renderChange = (index)=>{
        return (
            <NewTodo>
                <input ref={newTodo}/>
                <button onClick={()=>changeTodos(index)}>Save <FaSave/></button>
            </NewTodo>
        )
    }

    useEffect(() => {
        if(localStorage.getItem(email)){
            console.log("storage", JSON.parse(localStorage.getItem(email)))
            setTodos(JSON.parse(localStorage.getItem(email)))
        }
    }, [email])

    return (
        <Container style={{marginTop:"50px"}}>
            <h1>My To-do List</h1>
            <Todos>
                <Search>
                    <span><GiMagnifyingGlass/></span>
                    <input type="text" onChange={(e)=>filterTodos(e.target.value)} placeholder="Search"/>
                    <button onClick={addTodos}>New</button>
                </Search>
                {newTodos && renderChange()}
                {todos.length === 0 ? <span>Add a todo</span> :
                    <List>
                    {todos.map((todo, index)=>(
                    <div>{ todo &&
                        <div>
                        {changeTodo.i === index && changeTodo.type ? renderChange(index) :
                            <DivCont>
                                {todo}
                                <span>
                                    <span><FaPencilAlt color="skyblue" onClick={()=>updateTodo(index)}/></span>
                                    <span><FaTrash color="red" onClick={()=>deleteTodo(index)}/></span>
                                </span>
                            </DivCont>
                        }
                        </div>
                    }</div>
                ))}
                </List>
                }
            </Todos>
        </Container>
    )
}

const DivCont = styled.div`
    position: relative;
    margin-top: 20px;
    border-bottom: 1px solid black;
    justify-content: space-between;
    display:flex;
    padding: 10px;
    align-items:center;
    letter-spacing: 1px;
    background: linear-gradient(347deg, rgba(127,221,94,0.4238737731420693) 11%, rgba(255,57,70,1) 53%);
    span{
        padding: 5px;
        cursor: pointer;
    }
`

const Search = styled.div`
    flex-direction:row;
    width:max-content;
    position: relative;
    input {
        overflow: hidden;
        padding: 12px 20px;
        border: 1px solid;
        border-radius: 10px;
        letter-spacing: 1px;
        padding-left: 30px;
        box-sizing: border-box;
        &:focus{
        background-color: lightblue;
        outline: none;
        }
    }
    button{
        margin-left: 10px;
        padding: 10px;
        border-radius: 10px;
        width: 5em;
        background-color: cornflowerblue;
        letter-spacing: 1px;
        font-size: 15px;
        cursor: pointer;
    }
    span{
    position: absolute;
    left: 0;
    top: 8px;
    padding: 5px;
  }
`

const NewTodo = styled.div`
    input {
        overflow: hidden;
        padding: 12px 20px;
        border: 1px solid;
        border-radius: 10px;
        letter-spacing: 1px;
        padding-left: 30px;
        &:focus{
        background-color: #2cf585;
        outline: none;
        }
    }
    button{
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        background-color: #41b823;
        letter-spacing: 1px;
        cursor: pointer;
    }
`;

const List = styled.div`
    max-height:20rem;
    overflow-y: auto;
`;

const Todos = styled.div`
    border: thick double #32a1ce;
    padding: 5px;
`;