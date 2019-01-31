import React from 'react';
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import div from "@material-ui/core/Paper/Paper";
import Field from "./Field";
import PlayerAvatar from "../player/PlayerAvatar";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import Input from "@material-ui/core/Input/Input";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
        width: '200px',
        fontSize: '20px',

    },
    membersParentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    membersContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '170px',
        marginLeft: '50px',
        alignItems: 'center',
    },
    teamContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '50px',
    },
    fab: {
        margin: theme.spacing.unit,
    },
});

class MembersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: undefined,
            address: undefined,
            name: undefined,
        }
    }

    componentWillMount() {
        this.setState({
            name: this.props.club,
            address: this.props.logo,
        })
    }

    render() {
        const {classes} = this.props;
        const members = this.props.members;
        let field = undefined;
        if (this.props.sport === "football") {
            field = {
                'url': 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX7047077.jpg',
                'width': 521, 'height': 800
            };
        } else {
            field = {
                'url': 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX24223786.jpg',
                'width': 463, 'height': 800
            };
        }
        let member_list = [];
        for (let i = 0; i < members.length; i++) {
            member_list.push(
                <Chip
                    avatar={<Avatar src={members[i].url}/>}
                    label={members[i].name}
                    clickable
                    onMouseOver={() => {
                        this.setState({
                            position: members[i].position,
                            address: members[i].url,
                            name: members[i].name,
                        })
                    }}
                    onClick={() => {
                        if (members[i].url.includes('player')) {
                            if (this.props.sport === 'football') {
                                let path = '/player/football/' + members[i].pk.toString();
                                this.props.history.push(path);
                            } else {
                                let path = '/player/basketball/' + members[i].pk.toString();
                                this.props.history.push(path);
                            }
                        }
                    }}
                    className={classes.chip}
                    key={i}
                />
            )
        }
        return (
            <div className={classes.membersParentContainer}>
                <PlayerAvatar text={this.state.name} avatar={this.state.address}/>
                <div className={classes.teamContainer}>
                    <div className={classes.membersContainer} onMouseLeave={() => {
                        this.setState({
                            name: this.props.club,
                            address: this.props.logo,
                        })
                    }}>
                        <Fab variant="extended" aria-label="Delete" className={classes.fab} color={"primary"}
                             onClick={() => {
                                 alert("دنبال شد:)")
                             }}>
                            <AddIcon/>
                            دنبال
                        </Fab>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                            placeholder={"پست"}
                            onKeyDown={this.props.handlePost}
                        />
                        {member_list}
                    </div>
                    <Field width={field.width} height={field.height}
                           src={field.url}
                           position={this.state.position} address={this.state.address} name={this.state.name}
                    />
                </div>
            </div>
        );
    }

}

export default withRouter(withStyles(styles, {withTheme: true})(MembersList));