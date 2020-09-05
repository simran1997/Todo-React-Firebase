import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Modal,
  makeStyles,
  
} from "@material-ui/core";
import { db } from "./Firebase";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Task(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const handleOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
      };

      const updateTodo = () => {
        db.collection("todos").doc(props.td.id).set({
            text: input
        }, {merge: true})
        setOpen(false)
      }


  return (
    <>
      <Modal open={open} onClose={handleClose}>
          <div className={classes.paper}>
              <h1>Update the task.. </h1>
                <input
                placeholder={props.td.text}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button onClick={updateTodo}>Update Todo</Button>
          </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{/* <ImageIcon /> */}</Avatar>
          </ListItemAvatar>
          {console.log(props.td)}
          <ListItemText primary={props.td.text} secondary="Added at: ⏰" />
        </ListItem>
        <button onClick={e => setOpen(true)}>Edit</button>
        {/* <Button
          onClick={(event) => {
            db.collection("todos").doc(props.td.id).delete();
          }}
        >
          ❌ Delete
        </Button> */}
        <DeleteForeverIcon
            fontSize='large'
          onClick={(event) => {
            db.collection("todos").doc(props.td.id).delete();
          }}
        />
         
      </List>
    </>
  );
}

export default Task;
