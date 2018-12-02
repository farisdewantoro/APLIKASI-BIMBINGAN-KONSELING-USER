import React, { Component } from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {getRapotList} from '../../../actions/rapotActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

 class RapotList extends Component {
    constructor(props){
        super(props);
        this.state={
            rapotList:[],
            expanded:false
        }
    } 
    componentDidMount(){
         this.props.getRapotList(this.props.auth.murid.murid._id);
     }
     componentWillReceiveProps(nextProps) {
       let rapot= nextProps.rapot.rapotList;
       let rapotList=[];
       let kelas=[];
       let result=[];
         if (rapot !== null){
             rapot.forEach(r=>{
                 if(kelas.indexOf(r.kelas) === -1){
                     kelas.push(r.kelas);
                     result.push({kelas:r.kelas,semester:[r.semester]});
                 }else{
                     result.forEach(res => {
                         if(res.semester.indexOf(r.semester) === -1){
                             res.semester.push(r.semester);
                         }
                        
                     })
                 }
                 
             });
             this.setState({rapotList:result});
         }
    
     }
     handleChange = panel => (event, expanded) => {
         this.setState({
             expanded: expanded ? panel : false,
         });
     };
  render() {
      let murid = this.props.auth.murid.murid;
      let {loading} = this.props.rapot;
      let { rapotList, expanded} = this.state;
      let {classes} = this.props;
      let loadingBar;
      let loadingText;
      if (loading) {
          loadingBar = (
                  <LinearProgress color="secondary" variant="query" />   
          );

          loadingText=(
              <Typography variant="h6">
                  PLEASE WAIT.....
              </Typography>
          )
      }
    return (
      <div className="rapotsiswa">
            <Card>
                {loadingBar}
                <CardContent>
                    <Grid container
                        direction="row"
                        justify="space-between"
                        style={{ marginBottom: 20 }}>
                        <Typography variant="h6">
                            Data Nilai Rapot
                            </Typography>


                    </Grid>

                    <Grid container direction="column" >
                        {loadingText}
                        {rapotList.map((list,i)=>{
                            return(
                                <ExpansionPanel key={i} expanded={expanded === list.kelas} onChange={this.handleChange(list.kelas)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Kelas {list.kelas.replace(/kelas/g, '')}</Typography>
                                    </ExpansionPanelSummary>
                                    <Divider />
                                    <ExpansionPanelDetails>
                                        <Grid container spacing={16}>
                                        {list.semester.map((semester,i)=>{
                                            return(
                                                <Grid item xs={12} key={i} >
                                                    <Button variant="contained" style={{ width: '100%' }} component={Link} to={`rapotsiswa/${murid.nis}/${list.kelas}/${semester}`}>
                                                       Semester {semester.replace(/semester/g,'')}
                                                 </Button>
                                                </Grid>
                                            )
                                        })}
                                            
                                            <Divider />
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })}
                       

                    </Grid>
                </CardContent>
            </Card>
        
      </div>
    )
  }
}

RapotList.propTypes={
    auth:PropTypes.object.isRequired,
    rapot:PropTypes.object.isRequired,
    getRapotList:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    auth:state.auth,
    rapot: state.rapot
});

export default compose(withStyles(styles,{name:"RapotList"}),connect(mapStateToProps, { getRapotList}))(RapotList);