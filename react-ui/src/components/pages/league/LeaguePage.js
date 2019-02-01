import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Ranking from "./Ranking";
import MatchesList from "../../MatchesList";
import Knockout from "./Knockout";
import SimpleSelect from "../../SimpleSelect";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    leagueMainPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '80px',
        height: '85vh',
        width: '100vw',
    },
    leagueTables: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: '0',
    },
    comeCenter: {
        alignSelf: 'center',
        flexGrow: '1',
        marginTop: '100px'
    },
});

class LeaguePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            week: 1,
            leagueInformation: null,
            matches: null,
            ranking: null,
        };
        this.id = props.match.params.id;
    }

    handleChange = event => {
        this.setState({week: event.target.value});
    };

    componentDidMount() {
        this.getLeagueInformation();
        this.getLeagueWeekMatches();
        this.getRanking();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.getLeagueWeekMatches();
    // }

    render() {
        const {classes} = this.props;
        if (this.state.leagueInformation !== null && this.state.matches !== null && this.state.ranking !== null) {
            let weeks = [];
            for (let i = 0; i < this.state.leagueInformation['weeks']; i++) {
                weeks.push(i + 1);
            }
            return (
                <div className={classes.leagueMainPageContainer}>
                    <div className={classes.comeCenter}>
                        <Paper>
                            <Typography variant="h3" component="h1">
                                {this.state.leagueInformation['text'] + ' ' + this.state.leagueInformation['subtitle']}
                            </Typography>
                        </Paper>
                    </div>
                    <div className={classes.leagueTables}>
                        <div>
                            <Ranking ranks={this.state.ranking}/>
                        </div>
                        <div style={{width: '40vw'}}>
                            <SimpleSelect subject={"هفته"} items={weeks}
                                          value={this.state.week}
                                          leagueChange={(league) => {
                                              this.setState({week: league}, this.getLeagueWeekMatches);
                                          }}/>
                            <MatchesList matches={this.state.matches}
                                         height={'60vh'}/>
                        </div>
                    </div>
                    <div className={classes.comeCenter}>
                        <Knockout teams={this.getTeams(this.props.name, this.props.season)} name={"جدول حذفی"}/>
                    </div>
                </div>
            );
        } else {
            return <div>Loading ...</div>
        }

    }

    getLeagueInformation() {
        let thisComp = this;
        let endpoint = '/api/league/' + this.id.toString() + '/';
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                leagueInformation: responseData,
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    getLeagueWeekMatches() {
        let thisComp = this;
        let endpoint = '/api/match-tile/?league=' + this.id.toString() + '&week=' + this.state.week.toString();
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                matches: responseData,
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    getRanking() {
        let thisComp = this;
        let endpoint = '/api/team-stat/?league=' + this.id.toString();
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                ranking: responseData,
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    getLeagueRanking(name, seson) {
        // TODO get desred league ranking from server
        return [
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 10
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'چلسی', 'avatar': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
            {
                'name': 'بارسلونا', 'avatar': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                'numOfMatches': 20, 'goalDiff': 12, 'pts': 46
            },
        ];
    }


    getTeams(name, season) {
        // TODO get information of knockout games of desired league from server
        return [
            [
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
            ],
            [
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
            ],
            [
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
            ],
            [
                {
                    'name1': 'barcelona',
                    'name2': 'chelsea',
                    'score1': 4,
                    'score2': 2,
                    'avatar1': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    'avatar2': 'http://pluspng.com/img-png/chelsea-png-chelsea-fc-1024.png'
                },
            ]
        ];
    }

}

export default withStyles(styles, {withTheme: true})(LeaguePage);