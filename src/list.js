import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const backgroundWhite = {
        //     backgroundColor: "white"
        // }
        
        // const backgroundBlack = {
        //     backgroundColor: "black"
        // }
        return (
            <div style = {{backgroundColor: this.props.visualState === 1 ? 'black' : 'white' }}>
              <ul className = "list-group slideDown slideUp" style = {{backgroundColor: this.props.visualState === 1 ? 'black' : 'white', }}>
               {this.props.currentList.map((item, i) => {
                   return (<div key ={i}>
                       <li style = {{backgroundColor: this.props.visualState === 1 ? 'black' : 'white' }}className = "list-group-item border-0" key ={i} onClick = {(e => {
                           this.props.syncMusic(item.url);
                   })}><p style = {{color: this.props.visualState === 1 ? 'white' : 'black'}}>{item.url}  <button className = "btn btn-primary btn-sm" onClick = {(e => {
                    this.props.deleteSong(item)
              })}>x</button></p> </li>
                   </div>)
               })}   
              </ul>
            </div>
        )
    }
}

