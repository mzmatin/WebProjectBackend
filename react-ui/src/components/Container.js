import React from 'react';
import AppNavBar from "./AppNavBar";
import RTL from "./utils/RTL";
import withStyles from "@material-ui/core/styles/withStyles";
import NewsPage from "./pages/news/NewsPage";
import Timeline from "./pages/matchPage/Timeline";
import Header from "./pages/matchPage/Header";
import MatchPage from "./pages/matchPage/MatchPage";
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import {Switch, Route} from 'react-router-dom'
import MainPage from "./pages/main/MainPage";
import PlayerPage from "./pages/player/PlayerPage";
import LeagueMainPage from "./pages/league/LeagueMainPage";
import TeamPage from "./pages/TeamPage/TeamPage";

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: 'c',
});


const styles = theme => ({
    baseContainer: {
    },
    appContainer : {
        marginLeft: theme.spacing.unit * 12,
        marginRight: theme.spacing.unit * 12,
        marginTop: theme.spacing.unit * 12,
    }
});

class Container extends React.Component{
    render() {
        const { classes} = this.props;
        return (
            <div>
                <RTL>
                    <AppNavBar />
                </RTL>
                <JssProvider generateClassName={generateClassName}>
                    <div className={classes.baseContainer}>
                        <div className={classes.appContainer}>
                            <Switch>
                                <Route path={'/'} component={MainPage} exact/>
                                <Route path={'/player/:id'} component={PlayerPage}/>
                                <Route path={'/league'} component={LeagueMainPage}/>
                                <Route path={'/news'} component={NewsPage}/>
                                <Route path={'/match'} component={MatchPage}/>
                                <Route path={'/team'} component={TeamPage}/>
                            </Switch>
                        </div>
                    </div>
                </JssProvider>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Container);