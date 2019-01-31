import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MembersList from "./MembersList";
import 'whatwg-fetch'

const styles = theme => ({});

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: null,
            staffs: null,
            showMembers: null,
        };
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {
        this.getTeamMembers();
        this.getTeamStaffs();
    }

    render() {
        const {classes} = this.props;
        if (this.state.members !== null && this.state.staffs !== null && this.state.showMembers != null) {
            return (
                <div>
                    <MembersList members={this.state.showMembers.concat(this.state.staffs)} club={this.props.teamInformation['name']}
                                 logo={this.props.teamInformation['url']} sport={this.props.teamInformation['type']}
                                 handlePost={this.handlePost}/>
                </div>
            );
        } else {
            return <div>Loading...</div>
        }

    }

    // handling search in players
    handlePost(event) {
        if (event.key === 'Enter') {
            const input = event.target.value;
            const members = this.state.members;
            if (input === "") {
                this.setState({
                    showMembers: members
                });
            } else {
                let result = members;
                switch (input) {
                    case 'حمله':
                        result = members.filter(member => member.position.startsWith('f'));
                        break;
                    case 'هافبک':
                        result = members.filter(member => member.position.startsWith('m'));
                        break;
                    case 'دفاع':
                        result = members.filter(member => member.position.startsWith('d'));
                        break;
                }
                this.setState({showMembers: result})
            }
        }
    }

    // this function will get team staffs
    getTeamStaffs() {
        let thisComp = this;
        let staff_endpoint = '/api/staff/?team=' + this.props.teamCode.toString();
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
                staffs: responseData
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }

    // this function will get team members
    getTeamMembers() {
        let thisComp = this;
        let players_endpoint = undefined;
        if (this.props.teamInformation['type'] === 'football') {
            players_endpoint = '/api/football-member/?team=' + this.props.teamCode.toString();
        } else {
            players_endpoint = '/api/basketball-member/?team=' + this.props.teamCode.toString();
        }
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        fetch(players_endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                members: responseData,
                showMembers: responseData,
            });
        }).catch(function (error) {
            console.log('error', error)
        });
    }

  }

export default withStyles(styles, {withTheme: true})(Members);