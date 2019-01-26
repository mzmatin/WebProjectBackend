import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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


function PlayerStatTable(props) {
    const { classes } = props;
    let inf;
    if (props.information["type"] === "football"){
        inf = [<TableRow key={0}>
                <TableCell style={{fontWeight:'bold'}}>گل</TableCell>
                <TableCell>{props.information['goal']}</TableCell>
                <TableCell style={{fontWeight:'bold'}}>پاس گل</TableCell>
                <TableCell>{props.information["assist"]}</TableCell>
            </TableRow>,
            <TableRow key={1}>
                <TableCell style={{fontWeight:'bold'}}>تعداد بازی</TableCell>
                <TableCell>{props.information["numOfMatches"]}</TableCell>
                <TableCell style={{fontWeight:'bold'}}>کارت زرد</TableCell>
                <TableCell>{props.information["yellowCard"]}</TableCell>
            </TableRow>,
            <TableRow key={2}>
                <TableCell style={{fontWeight:'bold'}}>کارت قرمز</TableCell>
                <TableCell>{props.information["redCard"]}</TableCell>
                <TableCell style={{fontWeight:'bold'}}>بهترین بازیکن زمین</TableCell>
                <TableCell>{props.information["manOfTheMatch"]}</TableCell>
            </TableRow>,]
    }  else {
        inf = [<TableRow key={0}>
            <TableCell style={{fontWeight:'bold'}}>امتیاز</TableCell>
            <TableCell>{props.information['score']}</TableCell>
            <TableCell style={{fontWeight:'bold'}}>سه امتیازی</TableCell>
            <TableCell>{props.information["3score"]}</TableCell>
            </TableRow>,
            <TableRow key={1}>
                <TableCell style={{fontWeight:'bold'}}>دو امتیازی</TableCell>
                <TableCell>{props.information["2score"]}</TableCell>
                <TableCell style={{fontWeight:'bold'}}>ریباند</TableCell>
                <TableCell>{props.information["rebound"]}</TableCell>
            </TableRow>,
            <TableRow key={2}>
                <TableCell style={{fontWeight:'bold'}}>بیشتزین امتیاز در یک بازی</TableCell>
                <TableCell>{props.information["maxScore"]}</TableCell>
                <TableCell style={{fontWeight:'bold'}}>بهترین بازیکن</TableCell>
                <TableCell>{props.information["manOfTheMatch"]}</TableCell>
            </TableRow>,]
    }
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    {inf}
                </TableBody>
            </Table>
        </Paper>
    );
}

PlayerStatTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerStatTable);
