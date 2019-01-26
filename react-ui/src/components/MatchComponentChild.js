import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import ImageAvatars from "./utils/ImageAvatars";

const styles = theme => ({
   matchComponent : {
        display : 'flex',
        flexDirection : 'column',
   },
   matchType :{
        display : 'flex',
        flexDirection: 'row',
        justifyContent : 'center',
   },
   logoName : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-evenly',
   },
    result : {
        alignSelf : 'center',
    },
    Date : {
       alignSelf: 'center',
    }
});

class MatchComponentChild extends React.Component{
    render() {
        const { classes } = this.props;
        return (
          <div className={classes.matchComponent} >
                <div className={classes.matchType}>
                    <div>
                        <Typography variant="h6" gutterBottom>
                            {this.props.type}
                        </Typography>
                    </div>
                </div>
                <div className={classes.logoName}>
                    <div>
                        <ImageAvatars size={60} avatar={this.props.address1} name={this.props.name1}/>
                    </div>
                    <div className={classes.result}>
                        <Typography variant="subtitle2" gutterBottom>
                            {this.props.result}
                        </Typography>
                    </div>
                    <div>
                        <ImageAvatars size = {60} avatar={this.props.address2} name={this.props.name2}/>
                    </div>
                </div>
                <div className={classes.Date}>
                    <Typography variant="subtitle2" gutterBottom>
                        {this.props.date}
                    </Typography>
                </div>
          </div>
        );
    }
}
MatchComponentChild.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MatchComponentChild);