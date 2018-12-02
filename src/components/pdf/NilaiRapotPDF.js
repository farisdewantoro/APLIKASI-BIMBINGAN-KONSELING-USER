import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit
    },
    pdfPrint:{
        position: "relative",
        background: "#fff",
        border:" 1px solid #f4f4f4",
        padding: "20px",
        margin: "10px 25px"
    },
    identitasSiswa1:{
        minWidth:"115px",
        marginLeft:5
    }

});

 class NilaiRapotPDF extends Component {
     constructor(props){
         super(props);
         this.state={
             murid:null,
             rapot:null
         }
     }
     componentDidMount(){
         document.title = "BIMBINGAN KONSELING";
         if (localStorage.getItem("pdfDataPrint") !== null){
             let dataFromLocal = JSON.parse(localStorage.getItem("pdfDataPrint"));
             this.setState({rapot:dataFromLocal["rapot"]});
             this.setState({murid:dataFromLocal["murid"]});
             localStorage.removeItem("pdfDataPrint");
         }
        //  let dataFromLocal = JSON.parse(localStorage.pdfDataPrint);
        
        
     }
  render() {
      const { classes } = this.props;
      const {rapot,murid} = this.state;
        if(rapot !== null && murid !== null){
            console.log(rapot);
            console.log(murid);
  
    return (
      <div className={classes.pdfPrint} onload={window.print()}>
            <Grid container  spacing={8}>
            <Grid item xs={12}>
                <Divider/>
                    <Typography variant="h6" style={{textAlign:"center"}}>
                            DAFTAR NILAI
                    </Typography>
                <Divider/>
            </Grid>
                <Grid item xs={12}>
                    <Grid container justify="space-between"
                        alignItems="flex-start" direction="row">
                    <Grid item >
                        <Grid container direction="column">
                            <Grid item>
                                    <Grid container direction="row">
                                    <Typography variant="subheading" className={classes.identitasSiswa1}>
                                        No Induk Siswa
                                    </Typography>
                                    <Typography variant="subheading">
                                        : {murid.nis}
                                    </Typography>
                                    </Grid>
                            </Grid>
                                <Grid item>
                                    <Grid container direction="row">
                                        <Typography variant="subheading" className={classes.identitasSiswa1}>
                                            Nama Siswa
                                    </Typography>
                                        <Typography variant="subheading">
                                            : {murid.nama}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row">
                                        <Typography variant="subheading" className={classes.identitasSiswa1}>
                                            Tanggal Lahir
                                    </Typography>
                                        <Typography variant="subheading">
                                            : {moment(murid.tanggalLahir).format("LL")}
                                        </Typography>
                                    </Grid>
                                </Grid>

                        </Grid>
                    </Grid>
                        <Grid item >
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container direction="row">
                                        <Typography variant="subheading" className={classes.identitasSiswa1}>
                                            Kelas/Semester
                                    </Typography>
                                        <Typography variant="subheading">
                                            : {`${rapot.kelas.replace(/kelas/g, '') + ' ' + rapot.namaKelas} / ${rapot.semester.replace(/semester/g, '') == 2 ? "Genap" : 'Ganjil'}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row">
                                        <Typography variant="subheading" className={classes.identitasSiswa1}>
                                            Tahun Pelajaran
                                    </Typography>
                                        <Typography variant="subheading">
                                            : {rapot.tahunPelajaran}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Grid>
                
                
            <Grid item xs={12}>
          
                    <table className="tableModify">
                        <thead>     
                          <tr>
                                <th scope="col">No</th>
                                <th scope="col">Mata Pelajaran</th>
                                <th scope="col">Nilai</th>
                                <th scope="col">Predikat</th>
                            </tr>
                        </thead>
                        <tbody>
                    {rapot.pelajaran.map((pel,index)=>{
                        return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{pel.mataPelajaran}</td>
                                <td>{pel.nilai}</td>
                                <td>{pel.predikat}</td>
                            </tr>
                        
                        );
                    })} 
                            
                        </tbody>
                    </table>
                                
            </Grid>
               
          </Grid>
         
      </div>
    )
        }else{
            return(
                <Typography>
                    NO DATA
                </Typography>
            )
        }
  }
}


NilaiRapotPDF.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NilaiRapotPDF);