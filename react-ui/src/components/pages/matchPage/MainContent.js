import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import StatTable from "./StatTable";
import PlayerList from "./PlayerList";

const styles = theme => ({
    root: {
        height: 'auto',
        display: 'flex',
        alignSelf: 'center',
        width: '100%',
        marginTop: theme.spacing.unit * 2,
    },
});


class MainContent extends React.Component {

    render(){
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <PlayerList teamName ={this.props.match.homeName} playerFields={this.props.match.homePlayers} />
                <StatTable match = {this.props.match}/>
                <PlayerList teamName ={this.props.match.awayName} playerFields={this.props.match.awayPlayers} />
            </Paper>
        )
    }
}

MainContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContent);
