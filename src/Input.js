import PouchDB from 'pouchdb-browser'
import React from 'react'
import { withDB } from 'react-pouchdb/browser';
import { Find, Get } from 'react-pouchdb/browser';

import styled from 'styled-components';

import * as moment from 'moment';


var taskdb = new PouchDB('task');
var mydb = new PouchDB('mydb');

// Get All Document
const getAllDocs = dbName =>
new Promise((resolve, reject) => {
setDB(dbName)
    .then(db =>
    db.allDocs({
        include_docs: true,
        attachments: true,
    })
    )
    .then(results => {
    const resultsDocs = results.rows.map(row => row.doc);
    console.log("resultsDocs",resultsDocs);
    resolve(resultsDocs)
    }).then(response => {
        console.log("json",response);
    })
    .catch(err => reject(err));
});


const setDB = dbName =>
  new Promise((resolve, reject) => {
    if (dbName === 'task') {
      resolve(taskdb);
    }
    if (dbName === 'mydb') {
        resolve(mydb);
     
    }
  });

  const saveDoc = (dbName, doc) =>
  new Promise((resolve, reject) => {
      console.log("save");
    setDB(dbName)
      .then(db => db.post(doc))
      .then(getAllDocs(dbName).then(newDocs => resolve(newDocs)))
      .catch(err => 
        reject(err));
  });

// const Wrapper = styled.div`
// padding: 4em;
// background: 'white';
// `;
// const TaskName = styled.h1`
// font-size: 1em;
// display: flex;
// alignItems:'flex-start',
// color: black;
// `;

// const Delete = styled.h1`
// color: #DB6863;
// cursor: pointer;
// margin-left: auto;
// font-size: 14px;
// line-height: 14px;
// transition: color .2s ease;
// `;
class Input extends React.Component{
    constructor(){
        super();
        this.addtask=this.addtask.bind(this)
        this.removeTasks=this.removeTasks.bind(this)
        this.showTodos=this.showTodos.bind(this)
    }

    addtask(e){
        const name = e.target.value.trim();
        if(e.keyCode === 13 && name){
            const task={
                name:name,
                timestamp:moment(Date.now(), 'x').fromNow()
            }
            saveDoc('task',task)
            this.showTodos()
            e.target.value=''
        }
    }

    removeTasks(doc){
        this.props.db.remove(doc)
    }
    
    showTodos(){
        var tasks=getAllDocs('task')
        console.log("tasks",tasks);
        // tasks.map((task)=>{
        //     return <li>{task.name}</li>
        // })
    }

    render(){
        return(
            <div>
              <h1>Add Tasks</h1>
                <input
                autoFocus
                placeholder="Add Task"
                onKeyDown={this.addtask}
                />
            {this.showTodos()}
            </div>
           
        )
    }
}
export default withDB(Input)