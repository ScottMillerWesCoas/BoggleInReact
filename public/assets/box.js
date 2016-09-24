 class Box extends React.Component{
    render(){

       var boxes = []; 
       for (var i = 0; i < 25; i++){
        if (this.props.state.canBeUnclicked[this.props.state.canBeUnclicked.length-1] === i) {
            var box = (<button className="box" style={{'backgroundColor':'purple'}} id={i} key={i} name={this.props.state.boxValues[i]} onClick={this.props._unclick}>{this.props.state.boxValues[i]}</button>)
          }
        else if (this.props.state.canBeClicked[i] === true || this.props.state.canBeClicked[i] === undefined){
          var box = (<button className="box" style={{'backgroundColor':'blue'}} id={i} key={i} name={this.props.state.boxValues[i]} onClick={this.props._update}>{this.props.state.boxValues[i]}</button>)
          }

          else {
            var box = (<button className="box" style={{'backgroundColor':this.props.state.color[i]}} id={i} key={i} name={this.props.state.boxValues[i]}>{this.props.state.boxValues[i]}</button>)
          }
          boxes.push(box); 
       }
        
        return(
        <div>{boxes}</div>
        )
    }

 }

 module.exports = Box; 