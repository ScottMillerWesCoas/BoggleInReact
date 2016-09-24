 class ScoreBoard extends React.Component{
    render(){ 
        return(
        <div className='scoreBoard'>
        <span className='score1' style={{'color':'blue','float': 'left', 'fontWeight': 'bold'}}>Score: {this.props.state.score}</span>
          <ul>
              {this.props.state.submitArr.map(function(elem, i){
                return <li className='word2' style={{'color': 'red', 'fontWeight': 'bold'}} key={i}>{elem}</li>;
              })
              }
          </ul>
        </div>
        )
    }

 }