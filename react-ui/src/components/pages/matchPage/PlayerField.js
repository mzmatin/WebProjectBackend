import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import PersianNumber from "../../utils/PersianNumber";
import Paper from "@material-ui/core/Paper/Paper";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        alignSelf: 'center',
    },
});


class PlayerField extends React.Component {
    state = {
        expanded: false,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render(){
        const { classes } = this.props;
        const { expanded } = this.state;

        let playerStats = [];
        for (let i = 0; i < this.props.player.playerStats.length; i++) {
            playerStats.push(
                <div style={{display: 'flex',marginBottom: '8px', justifyContent: 'space-between', borderBottom: 'solid', borderBottomColor: 'green', borderBottomWidth: 'thin'}} key={i}>
                    <div style={{flexGrow: '1'}}>
                        {this.props.player.playerStats[i].name}
                    </div>
                    <div>
                        <PersianNumber>{this.props.player.playerStats[i].value}</PersianNumber>
                    </div>
                </div>
            )
        }

        return (
            <Paper className={classes.root}>
                <ExpansionPanel style={{width: '100%'}} expanded={expanded === 'panel' + this.props.key} onChange={this.handleChange('panel' + this.props.key)}>
                    <ExpansionPanelSummary style={{width: '100%'}} expandIcon={<ExpandMoreIcon />}>
                        <div style={{display: 'flex', padding: '0', width: '100%', justifyContent: 'space-between'}}>
                            <div style={{flexGrow: 1}}>
                                {this.props.player.playerName}
                            </div>
                            {
                                this.props.player.hasBeenSubed
                                    ?
                                        <div style={{display: 'flex'}}>
                                            <FontAwesomeIcon
                                                icon= {this.props.player.subIn ? 'chevron-up': 'chevron-down'}
                                                color={this.props.player.subIn ? 'green': 'red'}
                                                size="1x"
                                                style={{marginLeft: '8px'}}
                                            />
                                            <div>
                                                {'\''}<PersianNumber>{this.props.player.subTime}</PersianNumber>
                                            </div>
                                        </div>
                                    :
                                        <div/>
                            }
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{width: '100%'}}>
                        <div style={{width: '100%'}}>
                            {playerStats}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        )
    }
}

PlayerField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerField);
