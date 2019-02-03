import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import timeline from "../../../drawables/timeline.svg";
import Event from "./Event";
import Paper from "@material-ui/core/Paper/Paper";
import basketTimeline from "../../../drawables/basketTimeline.svg"

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: theme.spacing.unit * 25,
        width: '80%',
        alignSelf: 'center',
    },
    teamContainer: {
        position: 'relative',
        width: '100%',
        flexGrow: 1,
    },
    timelineRoot: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing.unit * 2,
    }
});


class Timeline extends React.Component {

    render() {
        const { classes } = this.props;

        let homeEvents = [];
        for (let i = 0; i < this.props.homeEvents.length; i++) {
            homeEvents.push(
                <Event key={i} home = {true} event = {this.props.homeEvents[i]}/>
            )
        }
        let awayEvents = [];
        for (let i = 0; i < this.props.awayEvents.length; i++) {
            awayEvents.push(
                <Event key={i} home = {false} event = {this.props.awayEvents[i]}/>
            )
        }

        return (
            <Paper className={classes.timelineRoot}>
                <div className={classes.root}>
                    <div className={classes.teamContainer}>
                        {homeEvents}
                    </div>
                    <div>
                        <img src={this.props.sport === 'f' ? timeline : basketTimeline} style={{width: '100%'}}/>
                    </div>
                    <div className={classes.teamContainer}>
                        {awayEvents}
                    </div>
                </div>
            </Paper>

        );
    }
}

Timeline.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Timeline);
