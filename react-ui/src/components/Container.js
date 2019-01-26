import React from 'react';
import AppNavBar from "./AppNavBar";
import RTL from "./utils/RTL";
import {withStyles} from "@material-ui/core";
import NewsPage from "./pages/news/NewsPage";
import Timeline from "./pages/matchPage/Timeline";
import Header from "./pages/matchPage/Header";
import MatchPage from "./pages/matchPage/MatchPage";
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import TeamPage from "./pages/TeamPage/TeamPage";
import PlayerPage from "./pages/player/PlayerPage";
import LeagueMainPage from "./pages/league/LeagueMainPage";
import LeaguePage from "./pages/league/LeaguePage";
import MainPage from "./pages/main/MainPage";

const styles = theme => ({
    baseContainer: {
    },
    appContainer : {
        marginLeft: theme.spacing.unit * 12,
        marginRight: theme.spacing.unit * 12,
        marginTop: theme.spacing.unit * 12,
    }
});

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

class Container extends React.Component{
    render() {
        const { classes} = this.props;
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
            <div className={classes.baseContainer}>
                <RTL>
                    <AppNavBar />
                </RTL>
                <div className={classes.appContainer}>
                        <MainPage/>
                </div>
            </div>
            </JssProvider>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Container);