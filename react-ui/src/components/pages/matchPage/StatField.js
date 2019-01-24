import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import PersianNumber from "../../utils/PersianNumber";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        alignSelf: 'center',
    },
    headerMiddle: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        alignItems: 'center',
        alignSelf: 'center'
    },
    homeContainer: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginRight: theme.spacing.unit * 8,
    },
    awayContainer: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing.unit * 8,
    },
});


class StatField extends React.Component {

    render(){
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <div className={classes.homeContainer}>
                    <h5 style={{alignSelf: 'center'}}><PersianNumber>{this.props.stat.homeValue}</PersianNumber></h5>
                </div>
                <div className={classes.headerMiddle}>
                    <h3>{this.props.stat.name}</h3>
                </div>
                <div className={classes.awayContainer}>
                    <h5 style={{alignSelf: 'center'}}><PersianNumber>{this.props.stat.awayValue}</PersianNumber></h5>
                </div>
            </Paper>
        )
    }
}

StatField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatField);
