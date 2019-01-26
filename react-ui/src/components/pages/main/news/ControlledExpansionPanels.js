import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import div from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    newsLink: {
        textDecoration: 'none',
        '&:link':{color:'black'},
        '&:visited':{color:'grey'},
    }
});

class ControlledExpansionPanels extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        let news_list = [];

        for (let i = 0; i < this.props.news.length; i++){
            news_list.push(
                <ExpansionPanel expanded={expanded === 'panel' + i.toString()} onChange={this.handleChange('panel' + i.toString())} key={i} dir={"rtl"}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.heading}><a className={classes.newsLink} target="_blank" rel="noopener noreferrer" href={this.props.news[i]["title"]}>{this.props.news[i]["title"]}</a></div>
                        <div className={classes.secondaryHeading}>{this.props.news[i]["time"]}</div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            {this.props.news[i]["summary"]}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        }

        return (
            <div className={classes.root} style={{overflow: 'auto', height:'auto'}} >
                {news_list}
            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
