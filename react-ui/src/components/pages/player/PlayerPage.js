import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import PlayerAvatar from "./PlayerAvatar";
import PlayerTable from "./PlayerInfTable";
import PlayerStatTable from "./PlayerStatTable";
import SimpleSelect from "../../SimpleSelect";
import Grid from "../../utils/Grid";
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PersianNumber from "../../utils/PersianNumber";


const styles = theme => ({
    playerPageContainer : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        height : '85vh',
        marginTop: '100px',
    },
    rowContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
});


class PlayerPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            season : null,
            generalInformation: null,
            leagueStats: null,
            leagueNameList:null,
            leaguesTableStats: null,
        };
        this.id = props.match.params.id;
    }

    componentDidMount() {
        this.getInformation();
        this.getStats();
    }

    render() {
        const {classes} = this.props;
        const newsList = this.getRelatedPlayerNews(this.id);
        if (this.state.generalInformation !== null && this.state.leagueStats !== null
            && this.state.leagueNameList !== null && this.state.leaguesTableStats !== null && this.state.season !== null){
            console.log(this.state, 'state');
            return (
            <div className={classes.playerPageContainer}>
                <div className={classes.rowContainer}>
                    <div>
                        <PlayerAvatar text={this.state.generalInformation['name']} avatar={this.state.generalInformation['url']}/>
                    </div>
                    <div>
                        <PlayerTable information={this.state.generalInformation}/>
                    </div>
                </div>
                <div className={classes.rowContainer} style={{marginTop:'100px'}}>
                    <div style={{marginLeft:'40px'}}>
                        <SimpleSelect subject={"فصل"} items={this.state.leagueNameList}
                                      value={this.state.season}
                                      leagueChange={(league) => {
                            this.setState({season: league});
                        }}/>
                        <PlayerStatTable information={this.state.leaguesTableStats[this.state.season]}/>
                    </div>
                    <Grid listItems={newsList} listTitle={"اخبار مرتبط"} width={'auto'} columns={2}/>
                </div>
            </div>
            );
        } else {
            return <div>Loading....</div>
        }
    }


    // returns players general information
    getInformation() {
        let thisComp = this;
        let endpoint = undefined;
        if (window.location.href.includes('football')) {
            endpoint = '/api/football-player/' + this.id.toString() + '/';
        } else {
            endpoint = '/api/basketball-player/' + this.id.toString() + '/';
        }

        let lookupOptions = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                thisComp.setState({
                    generalInformation: responseData
                });
            }).catch(function (error) {
                console.log('error', error)
            });
    }

    // returns player stat based on season appearances
    getStats() {
        let thisComp = this;
        let endpoint = undefined;
        if (window.location.href.includes('football')){
            endpoint = '/api/football-player-stat/?player=' + this.id.toString()
        } else {
            endpoint = '/api/basketball-player-stat/?player=' + this.id.toString()
        }
        let lookupOptions = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                leagueStats: responseData
            });
            thisComp.getLeagueNamesList();
        }).then(function (error) {
            console.log(error)
        });
    }

    // returns player stat based on chosen league
    getLeagueNamesList(){
        const stats = this.state.leagueStats;
        let leaguesNameList = [];
        let matchType = window.location.href.includes('football') ? 'football' : 'basketball';
        let leaguesStat = {};
        let temp = "";
        if (matchType === 'football'){
            for (let i = 0; i < stats.length; i++){
                temp = stats[i]['league_name'] + ' ' + stats[i]['league_pre'].toString() +"-"+stats[i]['league_post'].toString();
                leaguesNameList.push(temp);
                leaguesStat[temp] = {
                    'type': matchType,
                    'goals': stats[i]['goals'],
                    'assists': stats[i]['assists'],
                    'appearance': stats[i]['appearance'],
                    'red_cards': stats[i]['red_cards'],
                    'yellow_cards': stats[i]['yellow_cards'],
                    'best': stats[i]['best'],
                };
            }
        } else {
            for (let i = 0; i < stats.length; i++){
                temp = stats[i]['league_name'] + ' ' + stats[i]['league_pre'].toString() +"-"+stats[i]['league_post'].toString();
                leaguesNameList.push(temp);
                leaguesStat[temp] = {
                    'type': matchType,
                    'scores': stats[i]['scores'],
                    'triple_points': stats[i]['triple_points'],
                    'double_points': stats[i]['double_points'],
                    'rebounds': stats[i]['rebounds'],
                    'max_score_in_one_game': stats[i]['max_score_in_one_game'],
                    'best': stats[i]['best'],
                };
            }
        }
        this.setState({
            leagueNameList:leaguesNameList,
            leaguesTableStats:leaguesStat,
            season: leaguesNameList[0],
        });
    }

    getRelatedPlayerNews(playerCode) {
        // TODO get related news to player from the server
        return [
            {"text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۵"
            },
            {"text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۱"
            },
            {"text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۴"
            },
            {"text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۵"
            },
            {"text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۱"
            },
            {"text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle" : "۱۳۹۷/۰۹/۱۴"
            },
        ];
    }
}

PlayerPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PlayerPage);
