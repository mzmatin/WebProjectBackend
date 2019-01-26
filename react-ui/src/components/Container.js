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
                            <NewsPage />
                        </div>
                    </div>
                </JssProvider>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Container);