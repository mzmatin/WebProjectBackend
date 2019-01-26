import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ImageAvatars from "../../utils/ImageAvatars";
import Chip from "@material-ui/core/Chip/Chip";
import PersianNumber from "../../utils/PersianNumber";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        maxHeight: "60vh",
        overflow: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class Ranking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rankings : [],
        }
    }

    componentWillMount() {
        const ranks = this.props.ranks;
        this.setState({
            rankings : ranks,
        })
    }

    render() {
        const {classes} = this.props;
        const rankings = this.state.rankings;
        console.log(this.state.rankings);
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>ردیف</CustomTableCell>
                            <CustomTableCell>
                                <Chip
                                    label="تیم"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(this.compareName);
                                        this.setState({rankings:ranks});
                                    }}
                                />
                            </CustomTableCell>
                            <CustomTableCell>بازی</CustomTableCell>
                            <CustomTableCell>تفاضل گل</CustomTableCell>
                            <CustomTableCell>
                                <Chip
                                    label="امتیاز"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(this.compareScore);
                                        this.setState({rankings:ranks});
                                    }}
                                />
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rankings.map((row, id) => {
                            return (
                                <TableRow className={classes.row} key={id}>
                                    <CustomTableCell numeric><PersianNumber>{(id + 1).toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell>
                                        <ImageAvatars name={row.name} avatar={row.avatar} size={30}/>
                                    </CustomTableCell>
                                    <CustomTableCell numeric><PersianNumber>{row.numOfMatches.toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell numeric><PersianNumber>{row.goalDiff.toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell numeric><PersianNumber>{row.pts.toString()}</PersianNumber></CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    compareName(a, b){
        if (a.name < b.name){
            return -1;
        }
        if (a.name === b.name){
            return 0;
        }
        return 1;
    }

    compareScore(a, b){
        if (a.pts < b.pts){
            return 1;
        }
        if (a.pts === b.pts){
            return 0;
        }
        return -1;
    }

}

Ranking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ranking);
