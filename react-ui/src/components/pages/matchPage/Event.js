import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
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

    renderCardIcon = (v) => {
        return (
            <FontAwesomeIcon
                icon="square-full"
                color={v}
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

    renderGoalIcon = (v) => {
        return (
            <FontAwesomeIcon
                icon='futbol'
                color={v}
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

    getCardInfo = (v) => {
        const { classes } = this.props;
        return (
            <div className={classes.tooltipContainer} style={{display: this.state.showTooltip ? 'flex' : 'none'}}>
                <div style={{display: 'flex'}}>
                    <div>
                        {this.renderCardIcon(v)}
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
                        {this.props.event.playerName}
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
                        {this.props.event.playerName2}
                    </div>
                    <div>
                        {'\''}<PersianNumber>{this.props.event.time}</PersianNumber>
                    </div>
                </div>
            </div>
        );
    };

    getGoalInfo = (v) => {
        const { classes } = this.props;
        return (
            <div className={classes.goalTooltipContainer} style={{display: this.state.showTooltip ? 'flex' : 'none'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{display: 'flex'}}>
                        <div>
                            {this.renderGoalIcon(v)}
                        </div>
                        <div className={classes.playerName}>
                            {this.props.event.playerName}
                        </div>
                    </div>
                    {
                        !this.props.event.playerName2.isEmpty
                            ?
                            <div style={{display: 'flex'}}>
                                <div>
                                    {this.renderPassIcon()}
                                </div>
                                <div className={classes.playerName}>
                                    {this.props.event.playerName2}
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
            case 'rc':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderCardIcon('red')}
                        </div>
                        {this.getCardInfo('red')}
                    </div>
                );
            case 'yc':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderCardIcon('yellow')}
                        </div>
                        {this.getCardInfo('yellow')}
                    </div>
                );
            case 's':
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
            case 'g':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderGoalIcon('green')}
                        </div>
                        {this.getGoalInfo('green')}
                    </div>
                );
            case 'pm':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderGoalIcon('red')}
                        </div>
                        {this.getGoalInfo('red')}
                    </div>
                );
            case 'gp':
                return (
                    <div style={eventStyle}>
                        <div
                            style={this.getEventIconContainerStyle(this.props.home)}
                            onMouseOver={() => {this.setState({showTooltip: true})}}
                            onMouseOut={() => {this.setState({showTooltip: false})}}
                        >
                            {this.renderGoalIcon('yellow')}
                        </div>
                        {this.getGoalInfo('yellow')}
                    </div>
                );
        }
    }
}

Event.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Event);
