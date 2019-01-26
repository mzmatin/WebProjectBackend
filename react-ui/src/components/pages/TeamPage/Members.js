import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MembersList from "./MembersList";

const styles = theme => ({

});

class Members extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            members: [],
        };
        this.handlePost = this.handlePost.bind(this);
    }

    componentWillMount() {
        this.setState({
            members: this.getTeamMembers(this.props.teamCode)
        });
    }

    render() {
        const { classes} = this.props;
        const member_list = this.state.members;
        const name = this.getClubName(this.props.teamCode);
        const logo = this.getLogo(this.props.teamCode);
        const sport = this.getSport(this.props.teamCode);
        return (
          <div>
              <MembersList members={member_list} club={name} logo={logo} sport={sport} handlePost={this.handlePost}/>
          </div>
        );
    }


    handlePost(event){
        if (event.key === 'Enter'){
            const input = event.target.value;
            const members = this.getTeamMembers(this.props.teamCode);
            if (input === ""){
                this.setState({
                    members: members
                });
            }  else {
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
                    case 'کادر':
                        result = members.filter(member => member.position.length>3);
                        break;
                }
                this.setState({members:result})
            }
        }
    }

    getTeamMembers(teamCode) {
        // TODO get team Members Based on the team code from server
        if (teamCode === 0) { // soccer
            return [
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "gk"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "dc"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "dr"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "dl"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "mr"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": 'mc'},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "ml"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "fc"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "fl"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "fr"},
                {'name': "علی", 'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png', "position": "coach"},
                {
                    'name': "علی",
                    'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    "position": "gk_trainer"
                },
                {
                    'name': "علی",
                    'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    "position": "trainer"
                },
                {
                    'name': "علی",
                    'address': 'http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png',
                    "position": "body_trainer"
                },
            ];
        } else {
            return [
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": "bpg"},
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": "bsg"},
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": "bsf"},
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": "bpf"},
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": "bc"},
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": 'coach'},
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": "trainer"},
                {'name': "علی", 'address': 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png', "position": "body_trainer"},
            ];
        }
    }

    getClubName(teamCode) {
        // TODO get club name from server
        if (teamCode === 0){
            return "بارسلونا";
        } else {
            return "گلدن استیت";
        }
    }

    getLogo(teamCode) {
        // TODO get club logo from server
        if (teamCode === 0){
            return "http://pngimg.com/uploads/fcb_logo/fcb_logo_PNG4.png";
        } else {
            return "https://a.espncdn.com/i/teamlogos/nba/500/gs.png";
        }
    }

    getSport(teamCode) {
        // TODO get sport type by team code from server
        if (teamCode === 0){
            return "soccer";
        }  else {
            return "basketball";
        }
    }

}

export default withStyles(styles, { withTheme: true })(Members);