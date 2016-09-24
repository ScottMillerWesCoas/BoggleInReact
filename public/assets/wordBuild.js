  class WordBuild extends React.Component{
    render(){
   
        return(
        <div className='wordArr'>
        <button className='submitButton' name={this.props.state.wordArr.join('')} onClick={this.props._submit}>Submit Word</button>
          <h1 className='word' style={{'color':'purple'}}>{this.props.state.wordArr}</h1> 
        </div>
        )
    }

 }