import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}



class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row" >
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //changing the staus of the square
    squares[i] = this.state.xIsNext = 'y';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

    {




      //
      // RANDOM Z GENERATOR
      // for (let i = 0; i < squares.length; i++) {
      //
      //   let randNum = parseInt(Math.random() * 8);
      //   if (squares[randNum] == null) {
      //     squares[randNum] = this.state.xIsNext = 'z';
      //     this.setState({
      //       history: history.concat([{
      //         squares: squares
      //       }]),
      //       stepNumber: history.length,
      //       // xIsNext: !this.state.xIsNext,
      //     });
      //
      //     break;
      //   }
      //
      // }


      // TRYING TO MAKE A WORTHY ADVERSARY

      // THE ONE THAT WORKS!!!!!
      // Assumes that the player will always make their second move towards three in a row
      // there isn't an if statement to cover a move not towards three in a row
      // statements will always cover the horizontal three before the vertical three
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (history.length <= 1) {

          let randNum = parseInt(Math.random() * 8);
          if (squares[randNum] == null) {
            squares[randNum] = this.state.xIsNext = 'z';
            this.setState({
              history: history.concat([{
                squares: squares
              }]),
              stepNumber: history.length,
              // xIsNext: !this.state.xIsNext,
            });

            break;
          }
          break;
        }

        else if (squares[a] == 'y' && squares[b] == 'y' && squares[c] == null) {
          squares[c] = this.state.xIsNext = 'z';
          break;
        }
        else if (squares[b] == 'y' && squares[c] == 'y' && squares[a] == null) {
          squares[a] = this.state.xIsNext = 'z';
          break;
        }
        else if (squares[a] == 'y' && squares[c] == 'y' && squares[b] == null) {
          squares[b] = this.state.xIsNext = 'z';
          break;
        }

        // else if (squares[i] == null) {
        //   squares[i] = this.state.xIsNext = 'z';
        //   this.setState({
        //     history: history.concat([{
        //       squares: squares
        //     }]),
        //     stepNumber: history.length,
        //     // xIsNext: !this.state.xIsNext,
        //   });
        //
        //   break;
        // }
      }




      //TAKE 1
      // for (let i = 0; i < squares.length; i++) {
      //   if (squares[i] == 'y') {
      //     if (squares[i + 1] == null) {
      //       squares[i + 1] = this.state.xIsNext = 'z';
      //       this.setState({
      //         history: history.concat([{
      //           squares: squares
      //         }]),
      //         stepNumber: history.length,
      //         // xIsNext: !this.state.xIsNext,
      //       });
      //
      //       break;
      //     }
      //
      //     else if (squares[i - 1] == null) {
      //       squares[i - 1] = this.state.xIsNext = 'z';
      //       this.setState({
      //         history: history.concat([{
      //           squares: squares
      //         }]),
      //         stepNumber: history.length,
      //         // xIsNext: !this.state.xIsNext,
      //       });
      //
      //       break;
      //     }
      //
      //     else if (squares[i + 3] == null) {
      //       squares[i + 3] = this.state.xIsNext = 'z';
      //       this.setState({
      //         history: history.concat([{
      //           squares: squares
      //         }]),
      //         stepNumber: history.length,
      //         // xIsNext: !this.state.xIsNext,
      //       });
      //
      //       break;
      //     }
      //   }
      // }


      // ADVERSARY TAKE II





      // else if (squares[i] == null) {
      //   squares[i] = this.state.xIsNext = 'z';
      //   this.setState({
      //     history: history.concat([{
      //       squares: squares
      //     }]),
      //     stepNumber: history.length,
      //     // xIsNext: !this.state.xIsNext,
      //   });
      //
      //   break;
      // }


      // TESTS TO PARSE THROUGH ALL SQUARES AND LOG THEIR VALUES
      // for (let i = 0; i < squares.length; i++) {
      //   if (squares[i] == null) {
      //     console.log('null' + ' ' + i);
      //   }
      //
      //   else {
      //     console.log(squares[i] + ' ' + i);
      //   }
      // }



      // CODE FROM VANILLA TIC TAC TOE
      // squares[i + 1] = this.state.xIsNext = 'z';
      // this.setState({
      //   history: history.concat([{
      //     squares: squares
      //   }]),
      //   stepNumber: history.length,
      //   xIsNext: !this.state.xIsNext,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }




  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'go to move #' + move :
        'go to game start:';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    // } else {
    //   //Changing the status in game info
    //   status = 'next player: ' + (this.state.xIsNext = 'y');
    // }



    return (

      <div className="game">
        <div className="game-board" >
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>

      </div>


    );
  }
}

// ========================================


class Welcome extends React.Component {
  render() {
    return (
      <div className='welcome'>
        <h1>Welcome to Tic-Tac-Toe!{'\n'}</h1>

        <p>To play, simply click on a square to make your first move!</p>
      </div >
    );
  }
}

ReactDOM.render(
  <div className='content'>
    <Welcome />
    <Game />
  </div>,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// function randomPlayer(squares) {
//   const moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//   for (let j = 0; j < moves.length; j++) {
//
//     if (squares[j] == null) {
//       squares[j].state.xIsNext = 'z';
//     }
//   }
// }
