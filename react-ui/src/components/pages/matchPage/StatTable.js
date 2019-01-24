import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import ImageAvatars from "../../utils/ImageAvatars";
import Paper from "@material-ui/core/Paper/Paper";
import StatField from "./StatField";

const styles = theme => ({
    root: {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    header: {
        display: 'flex',
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
        marginRight: theme.spacing.unit * 2,
    },
    awayContainer: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing.unit * 2,
    },
});


class StatTable extends React.Component {

    render(){
        const { classes } = this.props;

        let fields = [];
        for (let i = 0; i < this.props.match.statFields.length; i++) {
            fields.push(
                <StatField key={i} stat={this.props.match.statFields[i]} />
            )
        }

        return (
            <Paper className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.homeContainer}>
                        <ImageAvatars size={75} avatar={this.props.match.homePic}/>
                    </div>
                    <div className={classes.headerMiddle}>
                        <h5>{this.props.match.status}</h5>
                        <h4>آمار بازی</h4>
                    </div>
                    <div className={classes.awayContainer}>
                        <ImageAvatars size={75} avatar={this.props.match.awayPic}/>
                    </div>
                </div>
                {fields}
            </Paper>
        )
    }
}

StatTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatTable);
