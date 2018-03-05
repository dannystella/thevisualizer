import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
              <ul className = "list-group slideDown slideUp">
               {this.props.currentList.map((item, i) => {
                   return (<div>
                       <li className = "list-group-item border-0" key ={i} onClick = {(e => {
                       this.props.syncMusic(item.url);
                   })}>{item.url} <button className = "btn btn-primary btn-sm" onClick = {(e => {
                    this.props.deleteSong(item)
                  })}>x</button></li>
                   </div>)
               })}   
              </ul>
            </div>
        )
    }
}

