import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Members from "./Members";
import MatchesList from "../../MatchesList";
import Grid from "../../utils/Grid";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Radio from '@material-ui/core/Radio';
import 'whatwg-fetch'
import SimpleSelect from "../../SimpleSelect";

const styles = theme => ({
    teamPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    matchNewsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '100px',
        width: '60vw',
    }
});

class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'a',
            teamInformation: null,
            matches: null,
        };
        this.id = props.match.params.id;
    }

    handleChange = event => {
        this.setState({selectedValue: event.target.value});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getTeamMatches()
    }

    render() {
        const {classes} = this.props;
        const newsList = this.getRelatedTeamNews(this.id);
        if (this.state.teamInformation !== null && this.state.matches !== null) {
            console.log(this.state.selectedValue);
            return (
                <div className={classes.teamPageContainer}>
                    <Members teamCode={this.id} teamInformation={this.state.teamInformation}/>
                    <div className={classes.matchNewsContainer}>
                        <div style={{marginLeft: '20px'}}>
                            <SimpleSelect subject={"فصل"} items={this.state.leagueNameList}
                                          value={this.state.season}
                                          leagueChange={(league) => {
                                              this.setState({season: league});
                                          }}/>
                            <Radio
                                checked={this.state.selectedValue === 'a'}
                                onChange={this.handleChange}
                                value="a"
                                name="radio-button-demo"
                                aria-label="A"
                            />
                            همه
                            <Radio
                                checked={this.state.selectedValue === 'w'}
                                onChange={this.handleChange}
                                value="w"
                                name="radio-button-demo"
                                aria-label="W"
                            />
                            برد
                            <Radio
                                checked={this.state.selectedValue === 'd'}
                                onChange={this.handleChange}
                                value="d"
                                name="radio-button-demo"
                                aria-label="D"
                            />
                            تساوی
                            <Radio
                                checked={this.state.selectedValue === 'l'}
                                onChange={this.handleChange}
                                value="l"
                                color="default"
                                name="radio-button-demo"
                                aria-label="L"
                            />
                            باخت
                            <MatchesList matches={this.state.matches} height={'60vh'}/>
                        </div>
                        <Grid listItems={newsList} listTitle={"اخبار مرتبط"} width={'auto'} columns={2}/>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>
        }

    }

    componentDidMount() {
        this.getTeamInformation();
        this.getTeamMatches();
    }

    getTeamMatches() {
        let thisComp = this;
        let endpoint = '/api/match-tile/?team1=' + this.id.toString();
        switch (thisComp.state.selectedValue) {
            case 'a':
                break;
            case 'w':
                endpoint += '&win=1';
                break;
            case 'd':
                endpoint += '&drawn=1';
                break;
            case 'l':
                endpoint += '&lost=1';
                break;
        }
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
                matches: responseData
            });
            console.log(thisComp.state.matches)
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    getTeamInformation() {
        let thisComp = this;
        let endpoint = '/api/team/' + this.id.toString() + '/';
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
                teamInformation: responseData
            });
            console.log(thisComp.state.teamInformation)
        }).catch(function (error) {
            console.log('error', error)
        });
    }


    getRelatedTeamNews(teamCode) {
        // TODO get related news to the team from the server
        return [
            {
                "text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۵"
            },
            {
                "text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۱"
            },
            {
                "text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۴"
            },
            {
                "text": "پله: مارادونا همه چیز داشت، مسی نه ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360957.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۵"
            },
            {
                "text": "والورده: مصدومیت مسی جدی نیست",
                "address": "https://static.farakav.com/files/pictures/thumb/01354229.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۱"
            },
            {
                "text": "مسی چند کلاس بالاتر از مودریچ است ",
                "address": "https://static.farakav.com/files/pictures/thumb/01360776.jpg",
                "subtitle": "۱۳۹۷/۰۹/۱۴"
            },
        ];
    }
}

export default withStyles(styles, {withTheme: true})(TeamPage);