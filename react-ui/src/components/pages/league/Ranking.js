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

class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rankings: [],
        }
    }

    componentWillMount() {
        const ranks = this.props.ranks;
        this.setState({
            rankings: ranks,
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
                                نام تیم
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="بازی"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareMatches);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="گل زده"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareGF);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="گل خورده"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareGA);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="تفاضل گل"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareGD);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="برد"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareWon);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="تساوی"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareDrawn);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="باخت"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareLost);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>

                            <CustomTableCell>
                                <Chip
                                    label="امتیاز"
                                    onClick={() => {
                                        let ranks = this.state.rankings;
                                        ranks = ranks.sort(Ranking.compareScore);
                                        this.setState({rankings: ranks});
                                    }}
                                />
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rankings.map((row, id) => {
                            return (
                                <TableRow className={classes.row} key={id}>
                                    <CustomTableCell
                                        numeric><PersianNumber>{(id + 1).toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell>
                                        <ImageAvatars name={row['team_name']} avatar={row['team_avatar']} size={30}/>
                                    </CustomTableCell>
                                    <CustomTableCell numeric><PersianNumber>{row['matches'].toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell
                                        numeric><PersianNumber>{row['goals_for'].toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell
                                        numeric><PersianNumber>{row['goals_against'].toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell
                                        numeric><PersianNumber>{row['goals_difference'].toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell
                                        numeric><PersianNumber>{row['won'].toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell
                                        numeric><PersianNumber>{row['drawn'].toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell
                                        numeric><PersianNumber>{row['lost'].toString()}</PersianNumber></CustomTableCell>
                                    <CustomTableCell
                                        numeric><PersianNumber>{row['points'].toString()}</PersianNumber></CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }


    static compareScore(a, b) {
        if (a['points'] < b['points']) {
            return 1;
        }
        if (a['points'] === b['points']) {
            return 0;
        }
        return -1;
    }

    static compareMatches(a, b) {
        if (a['matches'] < b['matches']) {
            return 1;
        }
        if (a['matches'] === b['matches']) {
            return 0;
        }
        return -1;
    }

    static compareGF(a, b) {
        if (a['goals_for'] < b['goals_for']) {
            return 1;
        }
        if (a['goals_for'] === b['goals_for']) {
            return 0;
        }
        return -1;
    }

    static compareGA(a, b) {
        if (a['goals_against'] < b['goals_against']) {
            return 1;
        }
        if (a['goals_against'] === b['goals_against']) {
            return 0;
        }
        return -1;
    }

    static compareGD(a, b) {
        if (a['goals_difference'] < b['goals_difference']) {
            return 1;
        }
        if (a['goals_difference'] === b['goals_difference']) {
            return 0;
        }
        return -1;
    }

    static compareWon(a, b) {
        if (a['won'] < b['won']) {
            return 1;
        }
        if (a['won'] === b['won']) {
            return 0;
        }
        return -1;
    }

    static compareDrawn(a, b) {
        if (a['drawn'] < b['drawn']) {
            return 1;
        }
        if (a['drawn'] === b['drawn']) {
            return 0;
        }
        return -1;
    }

    static compareLost(a, b) {
        if (a['lost'] < b['lost']) {
            return 1;
        }
        if (a['lost'] === b['lost']) {
            return 0;
        }
        return -1;
    }



}

Ranking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ranking);
