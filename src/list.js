import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
              <ul>
               {this.props.currentList.map((item, i) => {
                   return (<div>
                       <li onClick = {(e => {
                         this.props.deleteSong(item)
                       })}>x</li>
                       <li key ={i} onClick = {(e => {
                       this.props.syncMusic(item.url);
                   })}>{item.url}</li>
                   </div>)
               })}   
              </ul>
            </div>
        )
    }
}

