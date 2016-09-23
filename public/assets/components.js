class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = this._startValue();
    this._update = this._update.bind(this);
    this._submit = this._submit.bind(this);
    this._unclick = this._unclick.bind(this);
    this._highScore = this._highScore.bind(this);
    this._checkHighScore = this._checkHighScore.bind(this);
    this._dictionary = this._dictionary.bind(this);
  }

    _highScore(){
        var dataTable = this.state.highScores; 
        return dataTable.map((el, i) => {
          return(
            <div>
            <Comment 
              name = {el.name}
              score = {el.score}
              key = {i}
            />
            </div>
          )
        })
        
    }
    _dictionary(input){
      var dictionary = ['A','AA', 'AAH', 'AAHED', 'AAHING']; 
      if (dictionary.indexOf(input) > -1) return true; 
      else return false; 
    }

    _checkHighScore(){
      var that = this, counter = 0; 
      var dataTable = this.state.highScores;
         dataTable.forEach(function(el, i){
        for (var x in el){
          if (typeof el[x] === "number" && el[x] < that.state.score && counter === 0) {
            dataTable.splice(i, 1, {name: name, score: that.state.score})  
            counter++;   
          }
        }
       });
        localStorage.setItem('highScores', JSON.stringify(dataTable));  
        this.setState({highScores: dataTable});  
    }

  _update(e){
    for (var a = 0; a < 25; a++){
      this.state.canBeClicked[a] = false; 
    } 
    var b = parseInt(e.target.id); 
    this.state.canBeUnclickedID.push(b); 
    for (var j = 4; j < 7; j++){
      this.state.canBeClicked[b + j] = true; 
      this.state.canBeClicked[b - j] = true; 
    }
    this.state.canBeClicked[b - 1] = true; 
    this.state.canBeClicked[b + 1] = true;     
      this.state.wordArr.push([e.target.name])
      var  i = e.target.id; 
      this.state.canBeUnclicked.push(b); 
      var newIsClicked = 0; 
      this.state.isClicked = e.target.id; 
      this.setState({wordArr: this.state.wordArr, isClicked: this.state.isClicked, canBeClicked: this.state.canBeClicked, canBeUnclicked: this.state.canBeUnclicked, canBeUnclickedID: this.state.canBeUnclickedID}); 
  }

  _unclick(e){
    console.log('inside unclick', e.target.id)
    var i = parseInt(e.target.id);
    for (var a = 0; a < 25; a++){
      this.state.canBeClicked[a] = false; 
    } 
    this.state.wordArr.pop(); 
    this.state.canBeUnclickedID.pop(); 
    if (this.state.wordArr.length === 0) {
      for (var a = 0; a < 25; a++){
        this.state.canBeClicked[a] = true; 
      } 
    } else {
      var newUC = this.state.canBeUnclickedID[this.state.canBeUnclickedID.length-1]; 
      for (var a = 0; a < 25; a++){
        this.state.canBeClicked[a] = false; 
      }
      for (var j = 4; j < 7; j++){
      this.state.canBeClicked[newUC + j] = true; 
      this.state.canBeClicked[newUC - j] = true; 
      }
      this.state.canBeClicked[newUC - 1] = true; 
      this.state.canBeClicked[newUC + 1] = true;  
    } 
    var newColor = this.state.color; 
    newColor[i] = '#99D6FF'; 
    this.state.canBeUnclicked.pop(); 
    console.log('after uc cbuc', this.state.canBeUnclicked)
    this.setState({wordArr: this.state.wordArr, color: newColor, canBeClicked: this.state.canBeClicked, canBeUnclicked: this.state.canBeUnclicked, canBeUnclickedID: this.state.canBeUnclickedID})
  }

  _submit(e){ 
    var that = this; 
    var wordCheck = $('#wordCheck'); 
    var submitted = e.target.name; 
    var submittedID = e.target.id; 
      $.get("/dictionary.txt", function(data){
        var words = data.split('\n');
        if (words.indexOf(submitted) > -1){
          wordCheck.text("Nice! " + submitted + " is a real word!").css({'color':'green', 'font-size': '35px', 'margin-left': '25px', 'font-weight':'bold', 'position': 'absolute', 'top':'80%', 'left': '50%'});
          that.state.submitArr.push([submitted])
          that.state.canBeUnclickedID.push([submittedID])
          if (submitted.length < 3) {
            that.state.score += 0; 
          }
          else if (submitted.length >= 3 && submitted.length < 5){
            that.state.score += 1
            console.log('score', that.state.score); 
          }
          else if (submitted.length === 5){
            that.state.score += 2
          }
          else if (submitted.length === 6){
            that.state.score += 3
          }
          else if (submitted.length === 7){
            that.state.score += 5
          }
          else if (submitted.length > 7){
            that.state.score += 11
          }
          that._checkHighScore(); 
          that.setState({submitArr: that.state.submitArr, score: that.state.score, wordArr: [], canBeClicked: {}, color: {}, canBeUnclicked: [], canBeUnclickedID: []}); 
        } 
        else { 
        wordCheck.text(submitted + " is not a real word, foo!").css({'color': 'red','font-size': '35px', 'margin-left': '25px', 'font-weight':'bold', 'position': 'absolute', 'top':'80%', 'left': '50%'});
        that.setState({wordArr: [], canBeClicked: {}, color: {}, canBeUnclicked: [], canBeUnclickedID: []});
      }
      }); 
      // if (this._dictionary(e.target.name)) console.log(e.target.name, ' exists in dictionary'); 
      // else console.log(e.target.name, ' does not exist in dictionary'); 
     
      
  }


    _startValue(){
      var winnerList = [
       {name: 'Mike', score: 3},
       {name: 'Scott', score: 0}
      ]; 
      // localStorage.setItem('highScores', JSON.stringify(winnerList)); 
        var savedData = localStorage.getItem('highScores'); 
      if (savedData){
        winnerList = JSON.parse(savedData); 
      }
      const dieArray = ['aaafrs','aaeeee', 'aafirs','adennn','aeeeem','aeegmu','aegmnn','afirsy','bjkqxz','ccenst','ceiilt','ceilpt','ceipst','ddhnot','dhhlor','dhlnor','dhlnor','eiiitt','emottt','ensssu','fiprsy','gorrvw','iprrry','nootuw','ooottu']; 
      var capLetterArr = []; 
      var letterArr = []; 
      for (var i = 0; i < dieArray.length; i++){
          capLetterArr.push(dieArray[i].toUpperCase());
      }
  
      function randLetter (){
         return Math.ceil(Math.random() * 5); 
      }
 
      for (var i = 0; i < capLetterArr.length; i++){
        if (capLetterArr[i][randLetter()] === 'Q' || capLetterArr[i][randLetter()] === 'q' ){ 
          letterArr.push('Qu')
        }
        else letterArr.push(capLetterArr[i][randLetter()]); 
      }

      return {boxValues: letterArr, wordArr: [], submitArr: [], score: 0, isClicked: [], color: {}, canBeClicked: {}, canBeUnclicked: [], canBeUnclickedID: [], highScores: winnerList}; 
    }



    render(){
        const winners = this._highScore() || [];
        return (
            <div>
              <img className='pic' src='http://1.bp.blogspot.com/-PwkH4sY6ML8/VcD8DygakRI/AAAAAAAAFao/CkqIOkFkQUI/s640/Boggle_Logo_PR_150804_6PM_CET.png'/>
               <h3>{winners}</h3>
              <Box state={this.state} _update={this._update} _unclick={this._unclick}/>
              <WordBuild state={this.state} _submit={this._submit} />
              <ScoreBoard state={this.state} />
            </div>
            )
    }
}

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


 

 class Comment extends React.Component {
  render() {
    return(
      <div className='highScore'>
        <span>{this.props.name} || {this.props.score}</span>
      </div>
    );
  }
}

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


// jQuery(function() {
  ReactDOM.render(
        <Game />,
    document.getElementById('game-box')
  );
// })
