import { Avatar, List, ListItem,  ListItemText, ListItemAvatar,ImageIcon, Button  } from '@material-ui/core'
import react, { useState, useEffect } from 'react';
import './Todo.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import firebase from 'firebase';

function Todo(props) {

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        // const top = 50 + rand();
        // const left = 50 + rand();

        const top = 50 ;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        })
    );

    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [currTodo, setCurrTo] = useState('');
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateToDo = (event) => {
        db.collection("todos").doc(props.todo.id).set(
            {todo: currTodo, timestamp: firebase.firestore.FieldValue.serverTimestamp() }, 
            {merge: true})
        handleClose();
    }

    const openEditTodoModal =() => {
        setCurrTo(props.todo.todo);
        handleOpen();
    }
    
    return (
        <>
            <Modal open={open} onClose={handleClose} >
                <div style={modalStyle} className={classes.paper}>
                    <input value={currTodo} onChange={event => setCurrTo(event.target.value)}/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={updateToDo}>  Update Todo </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>  Cancel </Button>
                </div>
            </Modal>

            <List className="todo_list">
                <ListItem>
                    <ListItemText>
                        <ListItemText primary={props.todo.todo} secondary="Deadline: "/>
                    </ListItemText>
                </ListItem>
                <EditIcon onClick={event => openEditTodoModal()}/>
                <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
            </List>
        </>
    )
}

export default Todo
