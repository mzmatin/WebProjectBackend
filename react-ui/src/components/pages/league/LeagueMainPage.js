import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "../../utils/Grid";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Input from "@material-ui/core/Input/Input";
import SearchIcon from '@material-ui/icons/Search';


const styles = ({
    leagueMainPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: '100px',
        height: '85vh',
        // width : '100vw',
    },
    leagueTables: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});


class LeagueMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLeagues: null,
            oldLeagues: null,
            currentLeaguesShow:null,
            oldLeaguesShow: null,
        }
    }

    componentDidMount() {
        this.getCurrentLeagues();
        this.getOldLeagues();
    }

    getCurrentLeagues() {
        let thisComp = this;
        let staff_endpoint = '/api/league/?current=97';
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(staff_endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                currentLeagues: responseData,
                currentLeaguesShow: responseData,
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    getOldLeagues() {
        let thisComp = this;
        let staff_endpoint = '/api/league/?archive=97';
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(staff_endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                oldLeagues: responseData,
                oldLeaguesShow: responseData,
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }


    render() {
        const {classes} = this.props;
        if (this.state.oldLeagues !== null && this.state.currentLeagues !== null &&
            this.state.oldLeaguesShow !== null && this.state.currentLeaguesShow !== null) {
            return (
                <div className={classes.leagueMainPageContainer}>
                    <div style={{width: '30vw'}}>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                            placeholder={"نام لیگ سال"}
                            onKeyDown={this.handleLeaguePage}
                        />
                    </div>
                    <div className={classes.leagueTables}>
                        <div>
                            <Grid listItems={this.state.currentLeaguesShow} listTitle={"فصل جاری"} width={700} columns={2}/>
                        </div>
                        <div>
                            <Grid listItems={this.state.oldLeaguesShow} listTitle={"فصل‌های قدیمی"} width={700}
                                  columns={2}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Loading ... </div>
        }

    }

    handleLeaguePage = (event) => {
        if (event.key === 'Enter') {
            let input = event.target.value;
            const currentLeagues = this.state.currentLeagues;
            const oldLeagues = this.state.oldLeagues;
            if (input === "") {
                this.setState({
                    currentLeaguesShow: currentLeagues,
                    oldLeaguesShow: oldLeagues,
                });
            } else {
                let strs = input.split(" ");
                this.currentFilter(strs[0], strs[1]);
                this.oldFilter(strs[0], strs[1]);
            }
        }
    };

    currentFilter(name, date) {
        const current = this.state.currentLeagues;
        let currentLeagueInformation = [];
        for (let j = 0; j < current.length; j++) {
            if (current[j]["text"] === name && current[j]["subtitle"].includes(date)) {
                currentLeagueInformation.push(current[j])
            }
        }
        this.setState({currentLeaguesShow: currentLeagueInformation});
    }

    oldFilter(name, date) {
        const old = this.state.oldLeagues;
        let oldLeagueInformation = [];
        for (let j = 0; j < old.length; j++) {
            if (old[j]["text"] === name && old[j]["subtitle"].includes(date)) {
                oldLeagueInformation.push(old[j])
            }
        }
        this.setState({oldLeaguesShow: oldLeagueInformation});
    }


            //     "text": "لیگ برتر انگلیس",
            //     "address": "https://img5.s3wfg.com/web/img/images_uploaded/b/4/barclayspremierleague.jpg",
            //     "subtitle": "۱۳۹۴-۱۳۹۵"

}

LeagueMainPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(LeagueMainPage);
