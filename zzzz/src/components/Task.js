import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Question from './Question';
import Response from './Response';
import TrainingResponce from './TrainingResponce';
import TrainingQuestion from './TrainingQuestion';

const styles = theme => ({
  backhome: {
    marginRight:theme.spacing.unit * 3,
  }
});

class Task extends Component {
  state = {
    current: 1,
    group: '01',
    ended: false,
    userAnswers: [[]],
    correctAnswers: [[false,false,false],[false,false,false],[false,false,false],[false,false,false],[false,false,false],],
    userAnswersT: [[]],
    correctAnswersT: [[false,false,false],[false,false,false],[false,false,false],[false,false,false],[false,false,false],],
    crt: 0,
    correctQuestions: [],
    isTraining: false,
    isResponsible: false,
    isSimple: false,
    trainingCurrent: 1,
  };

  divideGroup = (groupType) => {
    let simple = false, responsible = false, training = false;
    if(groupType <= 4 ) {
      simple = true;
    }
    if(groupType == 3 || this.state.groupType == 4 || this.state.groupType == 7 || this.state.groupType == 8) {
      responsible = true;
    }
    if(groupType % 2 == 0) {
      training = true;
    }
    this.setState({
      isSimple: simple,
      isResponsible: responsible,
      isTraining: training
    });
  }

  // componentWillMount(){
  //   let groupType = 1;
  //   this.divideGroup(groupType);
  // }


  onButtonClickNext = (userAnswer, correctAnswer) => {
    // if(this.state.is)
    this.setState(preState => ({
      current: this.state.current + 1,
      userAnswers: preState.userAnswers.concat([userAnswer]),
      correctAnswers: preState.correctAnswers.concat([correctAnswer])
    }), () => {
      if( (this.state.current  ) % 6 == 0) {
        this.calculate();
      }
    });
  };

  onButtonClickNextT = (userAnswerT, correctAnswerT) => {  
    this.setState(preState => ({
      trainingCurrent:this.state.trainingCurrent + 1 ,
      userAnswersT: preState.userAnswersT.concat([userAnswerT]),
      correctAnswersT: preState.correctAnswersT.concat([correctAnswerT])
    }), () => {
      if( (this.state.trainingCurrent  ) % 6 == 0) {
        this.calculateT();
      }
    });
  };

  onButtonClickNextPure = () => {
    this.setState({
      current: this.state.current + 1,
    });
  };

  onButtonClickBack = () => {
    this.setState({
      current: this.state.current - 1
    });
    this.setState(preState => ({
      userAnswers: preState.userAnswers.slice(0, preState.userAnswers.length-1),
      correctAnswers: preState.correctAnswers.slice(0, preState.correctAnswers.length-1)
    }));
  };

  onButtonClickBackT = () => {
    this.setState({
      trainingCurrent: this.state.trainingCurrent - 1
    });
    this.setState(preState => ({
      userAnswersT: preState.userAnswersT.slice(0, preState.userAnswersT.length-1),
      correctAnswersT: preState.correctAnswersT.slice(0, preState.correctAnswersT.length-1)
    }));
  };

  onButtonClickEnd = () => {
    this.setState({
      ended: true
    });
  };

  onButtonReturnTask = () => {
    this.setState({
      isTraining: false
    });
  }

  calculate = () => {
    let crt = 0;
    let lengthA = this.state.userAnswers.length;
    let lengthB = this.state.correctAnswers.length;
    let A = this.state.userAnswers.slice(lengthA - 5, lengthA);
    let B = this.state.correctAnswers.slice(lengthB - 5, lengthB);
    let C = [];
    // console.log("* " + A);
    // console.log("** " + B);

    for(let i = 0; i< 5; i++) {
      // console.log(i + ' A: '+ A[i] + '-' + typeof(A[i]) );
      // console.log(i + ' B: '+ B[i] + '-' + typeof(B[i]) );
      let flag = true;
      for(let j = 0; j < 3; j++) {
        if(A[i][j] != B[i][j]) {
          flag = false;
          break;
        }
      }
      if(flag) {
        crt ++;
        C.push(i);
      }
    }
    this.setState({
      correctQuestions: C,
      crt: crt
    });
    // console.log("*** " + C);
    // console.log("*** " + crt);

  }

  calculateT = () => {
    let crt = 0;
    let lengthA = this.state.userAnswersT.length;
    let lengthB = this.state.correctAnswersT.length;
    let A = this.state.userAnswersT.slice(lengthA - 5, lengthA);
    let B = this.state.correctAnswersT.slice(lengthB - 5, lengthB);
    let C = [];
    // console.log("* " + A);
    // console.log("** " + B);

    for(let i = 0; i< 5; i++) {
      // console.log(i + ' A: '+ A[i] + '-' + typeof(A[i]) );
      // console.log(i + ' B: '+ B[i] + '-' + typeof(B[i]) );
      let flag = true;
      for(let j = 0; j < 3; j++) {
        if(A[i][j] != B[i][j]) {
          flag = false;
          break;
        }
      }
      if(flag) {
        crt ++;
        C.push(i);
      }
    }
    this.setState({
      correctQuestions: C,
      crt: crt
    });
    console.log("*** " + C);
    console.log("*** " + crt);

  }
  
  getcurrent = () => {
    if(this.state.isTraining) {
      switch(this.state.trainingCurrent) {
        case 6:
          return (
            <TrainingResponce 
              trainingCurrent={this.state.trainingCurrent} 
              crt={this.state.crt}
              history={this.props.history}
              correctQuestions={this.state.correctQuestions}
              onButtonReturnTask ={() => this.onButtonReturnTask()}
            ></TrainingResponce>
          );
        default:
          return(
             <TrainingQuestion 
              trainingCurrent={this.state.trainingCurrent} 
              history={this.props.history}
              onButtonClickNextT={(userAnswerT, correctAnswerT,last) => this.onButtonClickNextT(userAnswerT, correctAnswerT,last)} //子组件向父组件传参
              onButtonClickBackT={() => this.onButtonClickBackT()} 
              onButtonClickEnd={() => this.onButtonClickEnd()}
              ></TrainingQuestion>
          );
      }


    } else {
      switch(this.state.current)
      {
        case 6:
          if(!this.state.isResponsible) {
            this.setState({
              current: this.state.current + 1
            });
            break ;
          }
          return(
              <Response 
              num={1} 
              current={this.state.current} 
              crt={this.state.crt}
              history={this.props.history}
              correctQuestions={this.state.correctQuestions}
              onButtonClickNextPure ={() => this.onButtonClickNextPure()}
            ></Response>);
        case 12:
          if(!this.state.isResponsible) {
            this.setState({
              current: this.state.current + 1
            });
            break ;
          }
          return(
              <Response 
              num={6} 
              current={this.state.current} 
              ratio={this.state.ratio}
              crt={this.state.crt}
              history={this.props.history}
              correctQuestions={this.state.correctQuestions}
              onButtonClickNextPure ={() => this.onButtonClickNextPure()}
            ></Response>);
        case 18:
          if(!this.state.isResponsible) {
            this.setState({
              current: this.state.current + 1
            });
            break ;
          }
          return(
            <Response 
              num={11} 
              current={this.state.current} 
              ratio={this.state.ratio}
              crt={this.state.crt}
              history={this.props.history}
              correctQuestions={this.state.correctQuestions}
              onButtonClickNextPure ={() => this.onButtonClickNextPure()}
            ></Response>);
        case 24:
          if(!this.state.isResponsible) {
            this.setState({
              current: this.state.current + 1
            });
            break ;
          }
          return(
            <Response 
              num={16}
              current={this.state.current}  
              ratio={this.state.ratio}
              crt={this.state.crt}
              history={this.props.history}
              correctQuestions={this.state.correctQuestions}
              onButtonClickNextPure ={() => this.onButtonClickNextPure()}
            ></Response>);
        case 30:
          if(!this.state.isResponsible) {
            this.setState({
              current: this.state.current + 1
            });
            break ;
          }
          return(
            <Response 
              num={21} 
              current={this.state.current} 
              ratio={this.state.ratio}
              crt={this.state.crt}
              history={this.props.history}
              correctQuestions={this.state.correctQuestions}
              onButtonClickNextPure ={() => this.onButtonClickNextPure()}
            ></Response>);
        case 36:
          if(!this.state.isResponsible) {
            this.setState({
              current: this.state.current + 1
            });
            break ;
          }
          return(
              <Response 
              num={26} 
              current={this.state.current} 
              ratio={this.state.ratio}
              crt={this.state.crt}
              history={this.props.history}
              correctQuestions={this.state.correctQuestions}
              onButtonClickNextPure ={() => this.onButtonClickNextPure()}
            ></Response>
            );

        default:
            return(
              <Question 
              current={this.state.current} 
              group={this.state.group}
              isResponsible={this.state.isResponsible}
              history={this.props.history}
              onButtonClickNext={(userAnswer, correctAnswer) => this.onButtonClickNext(userAnswer, correctAnswer)} //子组件向父组件传参
              onButtonClickBack={() => this.onButtonClickBack()} 
              onButtonClickEnd={() => this.onButtonClickEnd()}
              ></Question>
            );
      }
    }
    
  }

  render() {
    const { classes } = this.props;


    return (
      <div className="Task">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.backhome} onClick={() => {
              this.props.history.push('home')
          }} noWrap>
          首页
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
          Botanical Classification 植物学分类任务
          </Typography>
        </Toolbar>
      </AppBar>
            {this.getcurrent()}
      </div>
    );
  }
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task);