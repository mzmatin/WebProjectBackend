import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Members from "./Members";
import MatchesList from "../../MatchesList";
import Grid from "../../utils/Grid";
import Radio from '@material-ui/core/Radio';
import 'whatwg-fetch'
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';

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
            relatedNews: null,
            opponentName: '',
            user: null,
        };
        this.id = props.match.params.id;
    }

    handleChange = event => {
        this.setState({selectedValue: event.target.value}, this.getTeamMatches);
    };

    handleOpponentChange = event => {
        if (event.key === 'Enter') {
            const input = event.target.value;
            console.log(input);
            this.setState({
                opponentName: input,
            }, this.getTeamMatches);
        }
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.getTeamMatches();
    // }

    getRelatedNews() {
        let thisComp = this;
        let endpoint = '/api/related-news/?team=' + thisComp.id.toString();
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
                relatedNews: responseData
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    render() {
        const {classes} = this.props;
        if (this.state.teamInformation !== null && this.state.matches !== null && this.state.relatedNews !== null) {
            return (
                <div className={classes.teamPageContainer}>
                    <Members teamCode={this.id} teamInformation={this.state.teamInformation} addTofavorite={this.addTofavorite}/>
                    <div className={classes.matchNewsContainer}>
                        <div style={{marginLeft: '20px'}}>
                            <Input
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                }
                                placeholder={"نام تیم حریف"}
                                onKeyDown={this.handleOpponentChange}
                            />
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
                        <Grid listItems={this.state.relatedNews} listTitle={"اخبار مرتبط"} width={'auto'} columns={2}/>
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
        this.getRelatedNews();
        this.getUser();
    }

    getUser = () => {
        if (localStorage.getItem('token'))
            fetch('http://localhost:8000/api/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json, 'user found');
                    this.setState({user: json});
                });
    };

    addTofavorite = () => {
        if (localStorage.getItem('token')) {
            console.log(this.id, 'team_id');
            console.log(this.state.user.pk, 'user_id');
            fetch('http://localhost:8000/api/favorite/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    team: this.id,
                    user: this.state.user.pk,
                })
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                });
        }
    };

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
        if (thisComp.state.opponentName !== '') {
            endpoint += '&team2=' + thisComp.state.opponentName;
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
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    getTeamInformation() {
        let thisComp = this;
        let endpoint = '/api/team/' + thisComp.id.toString() + '/';
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