import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import PersianNumber from "../../utils/PersianNumber";
import ImageAvatars from "../../utils/ImageAvatars";

const styles = theme => ({
    root: {
        backgroundImage: 'url(https://www.vertaalt.nu/file/xl8-review-samples.jpg)',
        width: '100%',
        height: theme.spacing.unit * 24,
        display: 'flex',
        color: 'white',
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


class Header extends React.Component {

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.homeContainer}>
                    <ImageAvatars size={75} avatar={this.props.match.homePic}/>
                    <h2 style={{alignSelf: 'center'}}>{this.props.match.homeName}</h2>
                </div>
                <div className={classes.headerMiddle}>
                    <h1>
                        <PersianNumber>{this.props.match.homeScore}</PersianNumber>
                        {" - "}
                        <PersianNumber>{this.props.match.awayScore}</PersianNumber>
                    </h1>
                    <h5>{this.props.match.subtitle}</h5>
                </div>
                <div className={classes.awayContainer}>
                    <ImageAvatars size={75} avatar={this.props.match.awayPic}/>
                    <h2 style={{alignSelf: 'center'}}>{this.props.match.awayName}</h2>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
