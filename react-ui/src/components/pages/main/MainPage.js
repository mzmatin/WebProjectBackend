import React from 'react';
import MainPageNews from "./news/MainPageNews";
import MainPageMatches from "./matches/MainPageMatches";
import {withStyles} from "@material-ui/core";
import RTL from "../../utils/RTL";

const styles = theme => ({
    mainPageContainer : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'stretch',
        alignContent : 'center',
        height : '85vh',
    },
});

class MainPage extends React.Component{
    render() {
        const { classes } = this.props;
        return (
            <RTL>
                <div className={classes.mainPageContainer}>
                    <MainPageNews />
                    <MainPageMatches />
                </div>
            </RTL>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MainPage);