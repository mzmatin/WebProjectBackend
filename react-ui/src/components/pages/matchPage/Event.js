import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import PersianNumber from "../../utils/PersianNumber";

const styles = theme => ({
    tooltipContainer:{
        backgroundColor: 'lightBlue',
        color: 'white',
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        flexDirection: 'column',
        borderRadius: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        justifyContent: 'center',
    },
    goalTooltipContainer: {
        backgroundColor: 'lightBlue',
        color: 'white',
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        borderRadius: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    playerName: {
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
    },
});


class Event extends React.Component {

    state = {
        showTooltip: false
    };

    getPosition = (time) => {
        // TODO: implement this
        let offset;
        if (time < 45 || (time > 45 && time < 90 && this.props.event.overtime)){
            if (time >= 55)
                offset = 55;
            else
                offset = time;
            return offset*8.5/10 + "%";
        }
        else if (!this.props.event.overtime || time < 100)
            return 53 + (time - 45) * 8.5/10 + "%";
        else
            return 100 + "%";


    };

    renderCardIcon = () => {
        return (
            <FontAwesomeIcon
                icon="square-full"
                color={this.props.event.iconColor}
                size="1x"
            />
        );
    };

    renderInSubIcon = () => {
        return (
            <FontAwesomeIcon
                icon='chevron-up'
                color={'green'}
                size="1x"
            />
        );
    };

    renderOutSubIcon = () => {
        return (
            <FontAwesomeIcon
                icon='chevron-down'
                color={'red'}
                size="1x"
            />
        );
    };

    renderGoalIcon = () => {
        return (
            <FontAwesomeIcon
                icon='futbol'
                color={this.props.event.ownGoal ? 'red' : 'Green'}
                size="1x"
            />
        );
    };

    renderPassIcon = () => {
        return (
            <FontAwesomeIcon
                icon='people-carry'
                color={'Green'}
                size="1x"
            />
        );
    };

    getCardInfo = () => {
        const { classes } = this.props;
        return (
            <div className={classes.tooltipContainer} style={{display: this.state.showTooltip ? 'flex' : 'none'}}>
                <div style={{display: 'flex'}}>
                    <div>
                        {this.renderCardIcon()}
                    </div>
                    <div className={classes.playerName}>
                        {this.props.event.playerName}
                    </div>
                    <div>
                        {'\''}<PersianNumber>{this.props.event.time}</PersianNumber>
                    </div>
                </div>
            </div>
        );
    };

    getSubstitutionInfo = () => {
        const { classes } = this.props;
        return (
            <div className={classes.tooltipContainer} style={{display: this.state.showTooltip ? 'flex' : 'none'}}>
                <div style={{display: 'flex'}}>
                    <div>
                        {this.renderInSubIcon()}
                    </div>
                    <div className={classes.playerName}>
                        {this.props.event.playerInName}
                    </div>
                    <div>
                        {'\''}<PersianNumber>{this.props.event.time}</PersianNumber>
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div>
                        {this.renderOutSubIcon()}
                    </div>
                    <div className={classes.playerName}>
                        {this.props.event.playerOutName}
                    </div>
                    <div>
                        {'\''}<PersianNumber>{this.props.event.time}</PersianNumber>
                    </div>
                </div>
            </div>
        );
    };

    getGoalInfo = () => {
        const { classes } = this.props;
        return (
            <div className={classes.goalTooltipContainer} style={{display: this.state.showTooltip ? 'flex' : 'none'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{display: 'flex'}}>
                        <div>
                            {this.renderGoalIcon()}
                        </div>
                        <div className={classes.playerName}>
                            {this.props.event.playerGoalName}
                        </div>
                    </div>
                    {
                        this.props.event.hasAssist
                            ?
                            <div style={{display: 'flex'}}>
                                <div>
                                    {this.renderPassIcon()}
                                </div>
                                <div className={classes.playerName}>
                                    {this.props.event.playerAssistName}
                                </div>
                            </div>
                            :
                            <div/>
                    }
                </div>
                <div style={{alignSelf: 'center'}}>
                    {'\''}<PersianNumber>{this.props.event.time}</PersianNumber>
                </div>
            </div>
        );
    };

    getEventIconContainerStyle = (isHome) => {
        return {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isHome ? 'flex-end' : 'flex-start',
        };
    };

    render(){
        const { classes } = this.props;

        const eventStyle = {
            display: 'flex',
            position: 'absolute',
            right: this.getPosition(Number(this.props.event.time)),
            height: '100%',
        };

        switch (this.props.event.eventType) {
            case 'card':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderCardIcon()}
                        </div>
                        {this.getCardInfo()}
                    </div>
                );
            case 'substitution':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderInSubIcon()}
                            {this.renderOutSubIcon()}
                        </div>
                        {this.getSubstitutionInfo()}
                    </div>
                );
            case 'goal':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderGoalIcon()}
                        </div>
                        {this.getGoalInfo()}
                    </div>
                );
        }
    }
}

Event.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Event);
