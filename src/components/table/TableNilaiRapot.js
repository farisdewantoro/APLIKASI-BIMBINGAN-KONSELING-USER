import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {compose} from 'redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import PrintIcon from '@material-ui/icons/Print';
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'no', numeric: false, disablePadding: false, label: 'No' },
    { id: 'mataPelajaran', numeric: false, disablePadding: false, label: 'Mata Pelajaran' },
    { id: 'nilai', numeric: false, disablePadding: false, label: 'Nilai' },
    { id: 'predikat', numeric: false, disablePadding: false, label: 'Predikat' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {  order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
              
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>


                        );
                    }, this)}

                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
  
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};





const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    ButtonExport:{
        margin: "10px 15px 10px 15px",
    },
    fileCopyIcon:{
        marginLeft:theme.spacing.unit
    }
});

class TableNilaiRapot extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        page: 0,
        rowsPerPage: 5,

    };
  

    pdfPrint = (rapot, murid)=>{
       
        if(rapot.tahunPelajaran !== '' && murid.nis !== ''){
            let data = {};
            data["rapot"] = rapot;
            data["murid"] = murid;
            
            localStorage.setItem("pdfDataPrint", JSON.stringify(data));
            
            window.open('/rapot/siswa/PDF', "_blank");
        }
    
    }

  
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };


    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handlerCancel =()=>{
        this.setState({newDataImport:null});
        this.setState({ htmlTable:null});
        this.props.closeImportDialog();
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, fullScreen, loadingImport, loading, disabledImport } = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;
        let { rapot,murid } = this.props;
       let htmlTable=  this.state.htmlTable;
       let loadingBar;
      
        if (loadingImport == true || loading){
            loadingBar =(
                <LinearProgress color="secondary" variant="query" />
            );
        }
        if(rapot !== null && murid !== null ){
            const emptyRows = rowsPerPage - Math.min(rowsPerPage, rapot.pelajaran.length - page * rowsPerPage);
            return (
                <div>
                
                <Paper className={classes.root}>
                      {loadingBar}
                    
                        <Button variant="contained" disabled={loading || disabledImport}  onClick={()=>this.pdfPrint(rapot,murid)} color="secondary"  className={classes.ButtonExport}>
                            Print
                            <PrintIcon className={classes.fileCopyIcon} />
                        </Button>

                <Toolbar>
                        <Typography color="inherit" variant="subtitle1">
                            Nilai Rapot
                 </Typography>
       
                </Toolbar>
                <Divider/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle" >
                            <EnhancedTableHead

                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={rapot.pelajaran.length}
                            />
                            <TableBody>
                                {stableSort(rapot.pelajaran, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((n,index) => {

                                          
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                <TableCell component="th" style={{width:"5px"}} scope="row" >
                                                    {index+1}
    
                                                </TableCell>
                                                <TableCell component="th" scope="row" >
                                                    {n.mataPelajaran}
                                
                                                </TableCell>

                                                <TableCell  >{n.nilai}</TableCell>
                                                <TableCell >{n.predikat}</TableCell>
                                            
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        component="div"
                        count={rapot.pelajaran.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>

                  
                </div>
            );
        } 
       
    }
}

TableNilaiRapot.propTypes = {
    classes: PropTypes.object.isRequired,
    rapot:PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,

};

export default compose(withStyles(styles), withMobileDialog())(TableNilaiRapot);