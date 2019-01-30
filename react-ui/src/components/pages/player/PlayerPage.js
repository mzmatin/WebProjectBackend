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
            season : "۱۳۹۴-۱۳۹۵",
            generalInformation: null,
        };
        this.id = props.match.params.id;
    }

    componentDidMount() {
        this.getInformation();
    }

    render() {
        const {classes} = this.props;
        const stat = this.getStat(1);
        const newsList = this.getRelatedPlayerNews(this.id);
        if (this.state.generalInformation !== null){
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
                        <SimpleSelect subject={"فصل"} items={["۱۳۹۶-۱۳۹۷", "۱۳۹۵-۱۳۹۶"]}
                                      value={this.state.season}
                                      leagueChange={(league) => {
                            this.setState({season: league});
                        }}/>
                        <PlayerStatTable information={stat}/>
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
            endpoint = 'http://127.0.0.1:8000/api/football-player/' + this.id.toString() + '/';
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


    getStat(playerCode) {
        if (playerCode===1) {
            if (this.state.season === "۱۳۹۶-۱۳۹۷"){
                return {
                    "type": "football",
                    "goal": "۴۵",
                    "assist": "۱۷",
                    "numOfMatches": "۳۰",
                    "yellowCard": "۳",
                    "redCard": "۱",
                    "manOfTheMatch": "۲۰",
                }
            } else {
                return {
                    "type": "football",
                    "goal": "۵۵",
                    "assist": "۲۷",
                    "numOfMatches": "۳۳",
                    "yellowCard": "۵",
                    "redCard": "۲",
                    "manOfTheMatch": "۱۴",
                }
            }
        } else {
            if (this.state.season === "۱۳۹۶-۱۳۹۷"){
                return {
                    "type": "basketball",
                    "score": "۲۰۰",
                    "3score": "۴۰",
                    "2score": "۴۰",
                    "rebound": "۳۷",
                    "maxScore": "۵۶",
                    "manOfTheMatch": "۱۲",
                }
            } else {
                return {
                    "type": "basketball",
                    "score": "۱۸۰",
                    "3score": "۳۴",
                    "2score": "۳۹",
                    "rebound": "۵۰",
                    "maxScore": "۴۰",
                    "manOfTheMatch": "۲۰",
                }
            }
        }
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
