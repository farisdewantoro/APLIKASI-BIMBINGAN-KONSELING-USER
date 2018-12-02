import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { getDataRapotMurid} from '../../../actions/rapotActions';
import TableNilaiRapot from '../../table/TableNilaiRapot';
const styles = theme => ({
    infoSiswa: {
        fontWeight: "bold",
        textTransform: "Uppercase"
    },

    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    margin: {
        marginBottom: 20
    },
    paperRoot: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    addIcon: {
        marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

});

class ShowRapotSiswa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rapot: {
                murid: '',
                kelas: '',
                semester: '',
                namaKelas: "",
                tahunPelajaran: "",
                pelajaran: [
                    { mataPelajaran: '', nilai: '', predikat: '' }
                ]
            },
            importOpen:false,
            disabledImport:true

        }
    }
    componentDidMount() {
        this.props.getDataRapotMurid(this.props.match.params.nis, this.props.match.params.kelas, this.props.match.params.semester);
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.rapot.rapot) {
        //     let murid = nextProps.rapot.rapot;
        //     this.setState({
        //         murid: {
        //             nama: murid.nama,
        //             nis: murid.nis,
        //             tanggalLahir: murid.tanggalLahir,
        //         },

        //     });
        //     this.setState(prevState => ({
        //         rapot: {
        //             ...prevState.rapot,
        //             murid: murid._id
        //         }
        //     }));
        // }
        if (nextProps.rapot.rapot && nextProps.rapot.rapot !== null) {
            this.setState({ disabledImport: false });
            this.setState({
                rapot: nextProps.rapot.rapot
            })
        //    if(nextProps.rapot.loadingImport == false){
        //        this.setState({ importOpen: false });
        //    }
            
        }

    }




    render() {
        // const { murid, rapot, disabledImport } = this.state;
        // const { loadingImport, loading} = this.props.rapot;
       const {murid} = this.props.auth.murid;
       const {loading} = this.props.rapot;
        const {rapot} = this.state;
        const { classes } = this.props;
        return (
            <Grid container spacing={8} direction="row">
            <Grid item xs={12}>
                    <Card>
                    
                        <CardContent>
                            <Grid container direction="column" spacing={24}>
                                <Grid item>
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                NIS : {murid.nis}
                                            </Typography>

                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                NAMA :{murid.nama}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                TANGGAL LAHIR :{moment(murid.tanggalLahir).format("L")}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                Kelas : {this.props.match.params.kelas.replace(/kelas/g,"")}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                Semester : {this.props.match.params.semester.replace(/semester/g,"")}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                Tahun Pelajaran : {rapot.tahunPelajaran}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </CardContent>


                    </Card>
            </Grid>
            
            <Grid item xs={12}>
  
                    <TableNilaiRapot 
                    rapot={rapot} 
                    murid={murid} 
                    loading={loading}
                    kelas={rapot.namaKelas + ' ' + this.props.match.params.kelas.replace(/kelas/g, '')} 
                    semester={this.props.match.params.semester.replace(/semester/g, '')}
                     />
            </Grid>

            </Grid>
        )
    }
}

ShowRapotSiswa.propTypes = {
    classes: PropTypes.object.isRequired,
    rapot: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    getDataRapotMurid:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    rapot: state.rapot,
    auth:state.auth
});

export default
    compose(
        withStyles(styles, { name: "ShowRapotSiswa" }),
        connect(mapStateToProps, { getDataRapotMurid}))(withRouter(ShowRapotSiswa));
