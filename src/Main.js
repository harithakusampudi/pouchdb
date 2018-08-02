import React from 'react'

import Input from './Input'
import TaskList from './TaskList'

export default class Main extends React.Component{
    render(){
        return(
            <div>
              <p>{Date.now()}</p>s
              <h1>Add Tasks </h1>
              <Input />
            </div>
        )
    }
}