import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MatchesList from "../../../MatchesList";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 'auto',
    },
});


class MainPageMatches extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            value : 0,
        }
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };


    render() {
        const { classes, theme } = this.props;
        const matches_list_fav = this.getMatches(0);
        const matches_list_all = this.getMatches(1);
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="مورد علاقه"/>
                        <Tab label="همه"/>
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <MatchesList matches={matches_list_fav} height={'auto'}/>
                    <MatchesList matches={matches_list_all} height={'auto'}/>
                </SwipeableViews>
            </div>
        );
    }

    getMatches(value) {
        if (value === 0){
            return [
                {
                    "type": "فوتبال",
                    "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                    "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                    "result": "۲-۲", "subtitle" : "دیروز : ۲۱:۰۰ "
                },
                {
                    "type": "فوتبال",
                    "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                    "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                    "result": " - ", "subtitle" : "امروز: ۲۱:۰۰ "
                },
                {
                    "type": "بسکتبال",
                    "address1": 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "name1": "گلدن‌استیت واریرز",
                    "address2": 'https://png2.kisspng.com/sh/5ab942379f302c2947f27f84e45e0778/L0KzQYm3VMExN6NBfZH0aYP2gLBuTfxwe15mhtlubHX2Pb3oiBVze15zetM2dYTkeH7xggp7NaRmhp9qboTyfrr2TgNxfaN4RdV1ZYbofLL1hL1kaadmhNtucoOwRbLqhMRjPpU7S6U9NkOxSYi5UsU3QGQ2TaQ8NEC2RoOCVMA3PF91htk=/kisspng-los-angeles-lakers-nba-utah-jazz-san-antonio-spurs-cleveland-cavaliers-5acd4b6d633463.9722568315234036294064.png', 'name2': 'لس‌آنجلس لیکرز',
                    "result": " - ", "subtitle" : "فردا: ۲۱:۰۰ "
                },
            ];
        } else {
            return [
                {
                    "type": "فوتبال",
                    "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                    "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                    "result": "۲-۲", "subtitle" : "امروز: ۸:۰۰ "
                },
                {
                    "type": "بسکتبال",
                    "address1": 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "name1": "گلدن‌استیت واریرز",
                    "address2": 'https://png2.kisspng.com/sh/5ab942379f302c2947f27f84e45e0778/L0KzQYm3VMExN6NBfZH0aYP2gLBuTfxwe15mhtlubHX2Pb3oiBVze15zetM2dYTkeH7xggp7NaRmhp9qboTyfrr2TgNxfaN4RdV1ZYbofLL1hL1kaadmhNtucoOwRbLqhMRjPpU7S6U9NkOxSYi5UsU3QGQ2TaQ8NEC2RoOCVMA3PF91htk=/kisspng-los-angeles-lakers-nba-utah-jazz-san-antonio-spurs-cleveland-cavaliers-5acd4b6d633463.9722568315234036294064.png', 'name2': 'لس‌آنجلس لیکرز',
                    "result": "۱۱۲ - ۱۰۰", "subtitle" : "امروز: ۱۷:۰۰ "
                },
                {
                    "type": "فوتبال",
                    "address1": 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "name1": "بارسلونا",
                    "address2": 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png', 'name2': 'چلسی',
                    "result": " - ", "subtitle" : "امروز: ۲۱:۰۰ "
                },
            ];
        }
    }
}

MainPageMatches.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainPageMatches);
