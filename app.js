// Libs
import React from 'react';
import ReactDOM from 'react-dom';

var playerList = [
  {
    name: 'Shane',
    score: 21,
    id: 1,
  },
  {
    name: 'Tony',
    score: 19,
    id: 2,
  }
]

var nextID = playerList.length + 1;

var Stopwatch = React.createClass({
  
  getInitialState: function() {
    return {
      isRunning: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },
  
  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },
  
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  
  onTick: function(e) {
    if(this.state.isRunning) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
  },
  
  onStop: function(e) {
    this.setState({
      isRunning: false
    });
  },
  
  onStart: function(e) {
    this.setState({
      isRunning: true,
      previousTime: Date.now(),
    });
  },
  
  onReset: function(e) {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  },
  
  render: function() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <div className="stopwatch__time">{seconds}</div>
        {
          this.state.isRunning ? 
          <button className="stopwatch__start" onClick={this.onStop}>Stop</button> :
          <button className="stopwatch__stop" onClick={this.onStart}>Start</button>
        }
        <button className="stopwatch__stop" onClick={this.onReset}>Reset</button>
      </div>
    )
  }
});

var AddPlayer = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired, 
  },
  
  getInitialState: function() {
    return {
      name: ""
    }
  },
  
  onNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  
  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },
  
  render: function() {
    return(
      <form onSubmit={this.onSubmit} className="add-player">
        <p>Add New Player</p>
        <input type="text" onChange={this.onNameChange} value={this.state.name} />
        <input type="submit" />
       </form>
    );
  }
});

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalScore = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);
  return (
    <div className="stats">
      <p>Num Players: {totalPlayers}<br/>
      Total score: {totalScore}</p>
     </div>
  );
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,  
};


function Header(props) {
  return (
    <h1>{props.title}</h1>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,  
};

function Counter(props) {
  return (
      <div className="player__counter">
        <div className="player__minus" onClick={function() {props.onChange(-1)}}>-</div>
        <div className="player__score">{props.score}</div>
        <div className="player__add" onClick={function() {props.onChange(1)}}>+</div>
      </div>
    );
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
}

function Player(props) {
  return (
    <div className="player">
      <div className="player__name">
        <div className="player__delete" onClick={props.onPlayerDelete}>&#10060;</div>
        {props.name}
      </div>
      <Counter score={props.score} onChange={props.onScoreChange} />
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onPlayerDelete: React.PropTypes.func.isRequired,
};

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  
  getDefaultProps: function() {
    return {
      title: 'Scoreboard',
    };
  },
  
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState({players: this.state.players});
  },
  
  onPlayerDelete: function(index) {
    this.state.players.splice(index, 1);
    this.setState({players: this.state.players});
  },
  
  onPlayerAdd: function(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextID,
    });
    this.setState({players: this.state.players});
    nextID += 1;
  },
  
  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },
  
  render: function() {
    return(
      <div className="application">
        <Header title={this.props.title} />

        {this.state.players.map(function(player, index) {
          return ( 
            <Player 
              onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
              onPlayerDelete={function(delta) {this.onPlayerDelete(index)}.bind(this)}
              name={player.name} 
              score={player.score} 
              key={player.id} 
             />
            );
        }.bind(this))}
        
        <Stopwatch />
        
        <Stats players={this.state.players} />

        <AddPlayer onAdd={this.onPlayerAdd} />

      </div>
    );
  }
});


ReactDOM.render(
  <Application title="The Scoreboard" initialPlayers={playerList} />,
  document.getElementById('app')
);