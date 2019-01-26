import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import PlayerField from "./PlayerField";

const styles = theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        width: theme.spacing.unit * 48,
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-around',
    },
});


class PlayerList extends React.Component {

    render(){
        const { classes } = this.props;

        let playerFields = [];
        for (let i = 0; i < this.props.playerFields.length; i++) {
            playerFields.push(
                <PlayerField key={i} player={this.props.playerFields[i]} />
            )
        }

        return (
            <Paper className={classes.root}>
                <div className={classes.header}>
                    <h3>لیست بازیکنان {this.props.teamName}</h3>
                </div>
                {playerFields}
            </Paper>
        )
    }
}

PlayerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerList);
