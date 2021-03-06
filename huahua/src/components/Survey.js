import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from "@material-ui/core/Radio";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';



const styles = theme => ({
    head:{
        marginTop:60,
        marginLeft:100,
        marginRight:100,
    },
    title: {
        fontSize: 20
    },
    content:{
        marginTop:20,
        marginLeft:20,
    },
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginLeft:theme.spacing.unit * 16,
    },
    select:{
        marginRight:20,
        marginTop:10,
    },
    selectTitle:{
        fontSize:20,
        marginLeft:30,
        marginTop:10,
        width:200,
    },
    selectTitle1:{
        fontSize:22,
        marginLeft:30,
        paddingTop:15,
        paddingBottom:15,
    },
    TableCell:{
        paddingRight: - theme.spacing.unit * 3,
    },
    ba:{
        marginLeft: 30,
        marginTop:10,
    },
    LselectTitle:{
        fontSize:18,
        marginLeft:30,
        marginTop:10,
        width:200,
    },
    xuanx:{
        fontWeight:"bold"
    }
});


const quesMap = {   
        "1": " 我有信心完成科研任务。",
        "2": "我很喜欢参与公众科学的任务。",
        "3": "我可以成功地完成其他公众科学任务。",
        "4": "参与本次任务让我感到愉悦。",
        "5": "参与本次任务给我带来乐趣。",
        "6": "我享受参与本次任务。",
        "7": "在完成任务时我能排除其他干扰。",
        "8": "在完成任务时我很专注。",
        "9": "在完成任务时我很投入。",
        "10": "在完成任务时我的注意力不容易转移。",
        "11": "我计划在未来参与类似公众科学任务。",
        "12": "我打算在未来继续参与类似公众科学任务。",
        "13": "我希望将来能继续参与类似公众科学任务。",
        "14": "你在参与公众科学任务时，下列哪项最符合你获得的反馈信息：",
        "15": "你在参与公众科学任务时，下列哪项最符合你获得的反馈信息：",
}


class Survey extends Component {
    state = {
        basicInfo:[0,0,0,0],
        selectedValue: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    };

    handleChange = i => event => {
        let selectedValue = this.state.selectedValue;
        selectedValue[i] = event.target.value;
        this.setState({
            selectedValue: selectedValue
        });
    }

    handleChangeBasic = i => event => {
        let basicInfo = this.state.basicInfo;
        basicInfo[i] = event.target.value;
        this.setState({
            basicInfo: basicInfo
        });
    }

    handleClick = () => {
        axios.post('data', {
            groupType: this.props.groupType,
            userAnswers: this.props.userAnswers,
            selectedValue: this.state.selectedValue,
            basicInfo:this.state.basicInfo
        })
        console.log(this.props.groupType);
        console.log(this.props.userAnswers);
        console.log(this.state.selectedValue);
        console.log(this.state.basicInfo);

        this.props.history.push('finish');
    }

   
    surveyQuestion = (i) => {
        const { classes } = this.props;

        if (i === 14) {
            return(
                <div className={classes.ti} >
                <Grid container spacing={16} >
                    <Grid item xs={6} >
                            <span className={classes.LselectTitle} >
                                {i + '. ' + quesMap[i]}
                            </span>
                    </Grid>

                    <Grid item xs={6}>
                        <span className={classes.select} >
                        <Radio
                            checked={this.state.selectedValue[i-1] == 1}
                            onChange={this.handleChange(i-1)}
                            value="1"
                            name="radio-button-demo"
                            label="A"
                            />
                            <span className={classes.xuanx}  >A. 答题情况是否达到合格水平的信息。</span>
                            
                        </span>
                        <br/>
                        <span className={classes.select} >
                        <Radio
                            checked={this.state.selectedValue[i-1] == 2}
                            onChange={this.handleChange(i-1)}
                            value="2"
                            name="radio-button-demo"
                            label="B"
                            />
                            <span className={classes.xuanx}  >B. 答题表现是否令人满意的信息。</span>
                        </span>
                        <br/>
                        <span className={classes.select} >
                        <Radio
                                    checked={this.state.selectedValue[i-1] == 3}
                                    onChange={this.handleChange(i-1)}
                                    value={3}
                                    name="radio-button-demo"
                                    aria-label="C"
                                    />
                                    <span className={classes.xuanx}  >C. 不确定</span>
                        </span>
                    </Grid>
                </Grid>
                <Divider></Divider>
                </div>
            );
        } else if (i === 15) {
            return(
                <div className={classes.ti} >
                <Grid container spacing={16} >
                        <Grid item xs={6} >
                            <span className={classes.LselectTitle} >
                                {i + '. ' + quesMap[i]}
                        </span>
                </Grid>
                <Grid item xs={6}>
                <span className={classes.select} >
                <Radio
                    checked={this.state.selectedValue[i-1] == 1}
                    onChange={this.handleChange(i-1)}
                    value="1"
                    name="radio-button-demo"
                    label="A"
                    />
                    <span className={classes.xuanx}  >A. 我得到正面积极的反馈。</span>
                </span>
                <br/>
                <span className={classes.select} >
                <Radio
                    checked={this.state.selectedValue[i-1] == 2}
                    onChange={this.handleChange(i-1)}
                    value="2"
                    name="radio-button-demo"
                    label="B"
                    />
                    <span className={classes.xuanx}  >B. 我得到负面消极的反馈。</span>
                </span>
                <br/>
               <span className={classes.select} >
               <Radio
                        checked={this.state.selectedValue[i-1] == 3}
                        onChange={this.handleChange(i-1)}
                        value={3}
                        name="radio-button-demo"
                        aria-label="C"
                        />
                        <span className={classes.xuanx}  >C. 不确定</span>
               </span>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                </div>
            );
        } else {
            return(
                <div className={classes.ti} >
                <Grid container spacing={16} >
                        <Grid item xs={6} >
                            <span className={classes.selectTitle} >
                                {i + '. ' + quesMap[i]}
                        </span>
                </Grid>
                <Grid item xs={6}>
                <span className={classes.select} >
                <Radio
                    checked={this.state.selectedValue[i-1] == 1}
                    onChange={this.handleChange(i-1)}
                    value="1"
                    name="radio-button-demo"
                    label="A"
                    />1
                </span>
                
                <span className={classes.select} >
                <Radio
                    checked={this.state.selectedValue[i-1] == 2}
                    onChange={this.handleChange(i-1)}
                    value="2"
                    name="radio-button-demo"
                    label="B"
                    />
                    2
                </span>
               <span className={classes.select} >
               <Radio
                        checked={this.state.selectedValue[i-1] == 3}
                        onChange={this.handleChange(i-1)}
                        value={3}
                        name="radio-button-demo"
                        aria-label="C"
                        />
                        3
               </span>
                <span className={classes.select} >
                <Radio
                        checked={this.state.selectedValue[i-1] == 4}
                        onChange={this.handleChange(i-1)}
                        value={4}
                        name="radio-button-demo"
                        aria-label="D"
                        />
                        4
                </span>
                
                <span className={classes.select} >
                <Radio
                        checked={this.state.selectedValue[i-1] == 5}
                        onChange={this.handleChange(i-1)}
                        value={5}
                        name="radio-button-demo"
                        aria-label="E"
                        />
                        5
                </span>
                
                <span className={classes.select} >
                <Radio
                        checked={this.state.selectedValue[i-1] == 6}
                        onChange={this.handleChange(i-1)}
                        value={6}
                        name="radio-button-demo"
                        aria-label="E"
                        />
                        6
                </span>
                
                <span className={classes.select} >
                <Radio
                        checked={this.state.selectedValue[i-1] == 7}
                        onChange={this.handleChange(i-1)}
                        value={7}
                        name="radio-button-demo"
                        aria-label="F"
                        />
                        7
                </span>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                </div>
        
                );
        }      
    }

    isCompleted = () => {
        let selectedValue = this.state.selectedValue
        const length = selectedValue.length
        let Completed = true;
        for(let i = 0; i<length;i++) {
            if(selectedValue[i] == 0){
                Completed = false;
                break;
            } else{}
        }
        return Completed;
    }

    selectedButton = (isCompleted) => {
        if(isCompleted){
            return(
                <Grid item xs={12} >
                    <center>
                    <Button variant='contained' color='secondary' size='large' onClick={this.handleClick} >提交问卷</Button>
                    </center>
                </Grid>
            );
        } else {
            return(
                <Grid item xs={12} >
                    <center>
                    <Button variant='contained' color='default' size='large' >请完成所有题目</Button>
                    </center>
                </Grid>
            );
        }
    }

    render(){
        const { classes } = this.props;
        console.log(this.state.selectedValue);
        return (
            <Grid container spacing={40} >
                <Grid item xs={12} >
                <div className={classes.head} >
                <Typography variant="display1" className={classes.title} > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请根据您刚刚参与的公众科学任务，完成下面的调查问卷。此次调查采用非实名制，所得数据仅用于统计分析，研究结果将为公众科学项目设计提供指导建议，十分感谢您的支持与协助！</Typography>
                </div>
                </Grid>

                
                <Grid item xs={12} >
                <div className={classes.head} >
                <Typography variant="display1" className={classes.title} >一、基于您本次参加的公众科学任务，下面哪项描述最符合您的体验：</Typography>
                </div>
                </Grid>
                <Paper className={classes.root}>
                    <Grid container spacing={16} className={classes.selectTitle1} >
                        <Grid item xs={7} >
                            <span > 题目 </span>
                        </Grid>
                        <Grid item xs={5} >
                            <span className={classes.manyi}> 非常不赞同 ---> 非常赞同 </span>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                        
                        
                    {this.surveyQuestion(1)}
                    {this.surveyQuestion(2)}
                    {this.surveyQuestion(3)}
                    {this.surveyQuestion(4)}
                    {this.surveyQuestion(5)}
                    {this.surveyQuestion(6)}
                    {this.surveyQuestion(7)}
                    {this.surveyQuestion(8)}
                    {this.surveyQuestion(9)}
                    {this.surveyQuestion(10)}
                    {this.surveyQuestion(11)}
                    {this.surveyQuestion(12)}
                    {this.surveyQuestion(13)}
                </Paper>

                <Grid item xs={12} >
                <div className={classes.head} >
                <Typography variant="display1" className={classes.title} >二、基于你本次参与的公众科学任务，下面哪些描述最符合你的经历：</Typography>
                </div>
                </Grid>
                <Paper className={classes.root}>
                    <Grid container spacing={16} className={classes.selectTitle1} >
                        <Grid item xs={7} >
                            <span > 题目 </span>
                        </Grid>
                        <Grid item xs={5} >
                            <span className={classes.manyi}></span>
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    {this.surveyQuestion(14)}
                    {this.surveyQuestion(15)}
                </Paper>

                <Grid item xs={12} >
                <div className={classes.head} >
                <Typography variant="display1" className={classes.title} >三、基本信息</Typography>
                </div>
                </Grid>

                <Paper className={classes.root} >
                    <Grid container spacing={16} >
                        <Divider/>
                        <Grid item xs={6} >
                        <span className={classes.ba} > 性别  </span>
                            
                        </Grid>
                        <Grid item xs={6} >
                            <span className={classes.select}  >
                                <Radio
                                    checked={this.state.basicInfo[0] == 1}
                                    onChange={this.handleChangeBasic(0)}
                                    value={1}
                                    name="radio-button-demo"
                                    />
                                    男
                            </span>
                            <span className={classes.select} >
                            <Radio
                                    checked={this.state.basicInfo[0] == 2}
                                    onChange={this.handleChangeBasic(0)}
                                    value={2}
                                    name="radio-button-demo"
                                    />
                                    女
                            </span>
                            <span className={classes.select} >
                            <Radio
                                    checked={this.state.basicInfo[0] == 3}
                                    onChange={this.handleChangeBasic(0)}
                                    value={2}
                                    name="radio-button-demo"
                                    />
                                    其他
                            </span>
                        </Grid>
                        <Grid item xs={6} >
                            <span className={classes.ba} > 年龄  </span>
                            
                        </Grid>
                        <Grid item xs={6} >
                            <span className={classes.select}  >
                                <Radio
                                    checked={this.state.basicInfo[1] == 1}
                                    onChange={this.handleChangeBasic(1)}
                                    value={1}
                                    name="radio-button-demo"
                                    />
                                    20岁以下
                            </span>
                            <span className={classes.select} >
                            <Radio
                                    checked={this.state.basicInfo[1] == 2}
                                    onChange={this.handleChangeBasic(1)}
                                    value={2}
                                    name="radio-button-demo"
                                    />
                                    20-39岁
                            </span>
                            <span className={classes.select}  >
                                <Radio
                                    checked={this.state.basicInfo[1] == 3}
                                    onChange={this.handleChangeBasic(1)}
                                    value={3}
                                    name="radio-button-demo"
                                    />
                                    40-59岁
                            </span>
                            <span className={classes.select} >
                            <Radio
                                    checked={this.state.basicInfo[1] == 4}
                                    onChange={this.handleChangeBasic(1)}
                                    value={4}
                                    name="radio-button-demo"
                                    />
                                    60岁及以上
                            </span>
                        </Grid>
                        <Grid item xs={6} >
                        <span className={classes.ba} > 受教育程度  </span>
                            
                        </Grid>
                        <Grid item xs={6} >
                            <span className={classes.select}  >
                                <Radio
                                    checked={this.state.basicInfo[2] == 1}
                                    onChange={this.handleChangeBasic(2)}
                                    value={1}
                                    name="radio-button-demo"
                                    />
                                    高中
                            </span>
                            <span className={classes.select} >
                            <Radio
                                    checked={this.state.basicInfo[2] == 2}
                                    onChange={this.handleChangeBasic(2)}
                                    value={2}
                                    name="radio-button-demo"
                                    />
                                    专科
                            </span>
                            <span className={classes.select}  >
                                <Radio
                                    checked={this.state.basicInfo[2] == 3}
                                    onChange={this.handleChangeBasic(2)}
                                    value={3}
                                    name="radio-button-demo"
                                    />
                                    本科
                            </span>
                            <span className={classes.select} >
                            <Radio
                                    checked={this.state.basicInfo[2] == 4}
                                    onChange={this.handleChangeBasic(2)}
                                    value={4}
                                    name="radio-button-demo"
                                    />
                                    研究生
                            </span>
                        </Grid>
                        <Grid item xs={6} >
                        <span className={classes.ba} > 您对植物学的感兴趣程度  </span>
                        </Grid>
                        <Grid item xs={6} >
                            <span className={classes.select}  >
                                <Radio
                                    checked={this.state.basicInfo[3] == 1}
                                    onChange={this.handleChangeBasic(3)}
                                    value={1}
                                    name="radio-button-demo"
                                    />
                                    感兴趣
                            </span>
                            <span className={classes.select} >
                            <Radio
                                    checked={this.state.basicInfo[3] == 2}
                                    onChange={this.handleChangeBasic(3)}
                                    value={2}
                                    name="radio-button-demo"
                                    />
                                    一般
                            </span>
                            <span className={classes.select}  >
                                <Radio
                                    checked={this.state.basicInfo[3] == 3}
                                    onChange={this.handleChangeBasic(3)}
                                    value={3}
                                    name="radio-button-demo"
                                    />
                                    不感兴趣
                            </span>
                        </Grid>
                        
                    </Grid>
                </Paper>
                
                {this.selectedButton(this.isCompleted())}
            </Grid>
        );
    }
}

Survey.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Survey);
