import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PersianNumber from "../../utils/PersianNumber";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


function PlayerInfTable(props) {
    const { classes } = props;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell style={{fontWeight:'bold'}}>سن</TableCell>
                        <TableCell><PersianNumber>{props.information['age'].toString()}</PersianNumber></TableCell>
                        <TableCell style={{fontWeight:'bold'}}>تیم</TableCell>
                        <TableCell>{props.information["team"]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{fontWeight:'bold'}}>قد</TableCell>
                        <TableCell><PersianNumber>{props.information["height"].toString()}</PersianNumber></TableCell>
                        <TableCell style={{fontWeight:'bold'}}>ملیت</TableCell>
                        <TableCell>{props.information["nationality"]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{fontWeight:'bold'}}>وزن</TableCell>
                        <TableCell><PersianNumber>{props.information["weight"].toString()}</PersianNumber></TableCell>
                        <TableCell style={{fontWeight:'bold'}}>پست</TableCell>
                        <TableCell>{props.information["ps"]}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </Paper>
    );
}

PlayerInfTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerInfTable);
