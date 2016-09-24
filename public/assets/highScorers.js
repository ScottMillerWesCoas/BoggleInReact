 class HighScorers extends React.Component {
  render() {
    return(
      <div className='highScore'>
        <span>{this.props.name} || {this.props.score}</span>
      </div>
    );
  }
}