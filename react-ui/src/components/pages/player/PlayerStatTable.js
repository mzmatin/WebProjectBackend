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


function PlayerStatTable(props) {
    const { classes } = props;
    let inf;
    if (props.information["type"] === "football"){
        inf = [<TableRow key={0}>
                <TableCell style={{fontWeight:'bold'}}>گل</TableCell>
            <TableCell><PersianNumber>{props.information['goals'].toString()}</PersianNumber></TableCell>
                <TableCell style={{fontWeight:'bold'}}>پاس گل</TableCell>
            <TableCell><PersianNumber>{props.information["assists"].toString()}</PersianNumber></TableCell>
            </TableRow>,
            <TableRow key={1}>
                <TableCell style={{fontWeight:'bold'}}>تعداد بازی</TableCell>
                <TableCell><PersianNumber>{props.information["appearance"].toString()}</PersianNumber></TableCell>
                <TableCell style={{fontWeight:'bold'}}>کارت زرد</TableCell>
                <TableCell><PersianNumber>{props.information["yellow_cards"].toString()}</PersianNumber></TableCell>
            </TableRow>,
            <TableRow key={2}>
                <TableCell style={{fontWeight:'bold'}}>کارت قرمز</TableCell>
                <TableCell><PersianNumber>{props.information["red_cards"].toString()}</PersianNumber></TableCell>
                <TableCell style={{fontWeight:'bold'}}>بهترین بازیکن زمین</TableCell>
                <TableCell><PersianNumber>{props.information["best"].toString()}</PersianNumber></TableCell>
            </TableRow>,]
    } else {
        console.log("basketballing");
        inf = [<TableRow key={0}>
            <TableCell style={{fontWeight:'bold'}}>امتیاز</TableCell>
            <TableCell><PersianNumber>{props.information['scores'].toString()}</PersianNumber></TableCell>
            <TableCell style={{fontWeight:'bold'}}>سه امتیازی</TableCell>
            <TableCell><PersianNumber>{props.information["triple_points"].toString()}</PersianNumber></TableCell>
            </TableRow>,
            <TableRow key={1}>
                <TableCell style={{fontWeight:'bold'}}>دو امتیازی</TableCell>
                <TableCell><PersianNumber>{props.information["double_points"].toString()}</PersianNumber></TableCell>
                <TableCell style={{fontWeight:'bold'}}>ریباند</TableCell>
                <TableCell><PersianNumber>{props.information["rebounds"].toString()}</PersianNumber></TableCell>
            </TableRow>,
            <TableRow key={2}>
                <TableCell style={{fontWeight:'bold'}}>بیشتزین امتیاز در یک بازی</TableCell>
                <TableCell><PersianNumber>{props.information["max_score_in_one_game"].toString()}</PersianNumber></TableCell>
                <TableCell style={{fontWeight:'bold'}}>بهترین بازیکن</TableCell>
                <TableCell><PersianNumber>{props.information["best"].toString()}</PersianNumber></TableCell>
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
