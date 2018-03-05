import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        }
    }

   resetInput(){
    this.setState({
        searchInput:''
    })  
   }


    render() {
        return (
            <div>
              
              <input type= "text"
                value = {this.state.searchInput}
                onChange= {(e) => {
                 this.setState({searchInput: e.target.value}, () => {
                 }) 
                   }
                }
                onKeyPress={(e) => {
                    if(e.key === 'Enter'){
                        this.props.syncMusic(this.state.searchInput); 
                        this.resetInput();                    
                        }
                        }
                }
                 
                 placeholder = "       search a song"
                />          
            </div>
        )
    }
}

