import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAllJurusan} from '../../actions/jurusanActions';
const styles = theme => ({
    root: {
        width: '100%',
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
 class Dashboard extends Component {
     state = {
         expanded: null,
     };
     componentDidMount(){
         this.props.getAllJurusan();
     }
     handleChange = panel => (event, expanded) => {
         this.setState({
             expanded: expanded ? panel : false,
         });
     };
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        return (
            <div className={classes.root}>
            {this.props.jurusan.jurusans.map((jur,i)=>{
                return(
                    <ExpansionPanel expanded={expanded === i} onChange={this.handleChange(i)} key={i}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{jur.namaJurusan}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div dangerouslySetInnerHTML={{
                                __html:jur.deskripsi
                            }}>

                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
               
         
        
              
            </div>
        )
    }
}
Dashboard.propTypes = {
    jurusan: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
 
}

const mapStateToProps = (state) => ({
    jurusan: state.jurusan,
});

export default compose(
    connect(mapStateToProps, { getAllJurusan}),
    withStyles(styles))(Dashboard);
