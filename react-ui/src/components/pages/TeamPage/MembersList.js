import React from 'react';
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import withStyles from "@material-ui/core/es/styles/withStyles";
import div from "@material-ui/core/es/Paper/Paper";
import Field from "./Field";
import PlayerAvatar from "../player/PlayerAvatar";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import Input from "@material-ui/core/Input/Input";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
        width : '200px',
        fontSize : '20px',

    },
    membersParentContainer:{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    membersContainer :{
        display :'flex',
        flexDirection : 'column',
        width: '170px',
        marginLeft:'50px',
        alignItems: 'center',
    },
    teamContainer : {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '50px',
    },
    fab: {
        margin: theme.spacing.unit,
    },
});

class MembersList extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            position: undefined,
            address : undefined,
            name : undefined,
        }
    }

    componentWillMount() {
        this.setState({
            name:this.props.club,
            address:this.props.logo,
        })
    }

    render() {
        const { classes} = this.props;
        const members = this.props.members;
        let field = undefined;
        if (this.props.sport === "soccer"){
            field = {'url' : 'https://i.etsystatic.com/11118846/r/il/0f6306/1133393522/il_570xN.1133393522_bnzg.jpg',
                'width':570, 'height':806};
        } else {
            field = {'url' : 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX24223786.jpg',
                'width':463, 'height':800};
        }
        let member_list = [];
        for (let i = 0; i < members.length; i++){
            member_list.push(
                    <Chip
                        avatar={<Avatar src={members[i].address}/>}
                        label={members[i].name}
                        clickable
                        onMouseOver={() => {
                            const alterName = this.ifNotPlayer(members[i].name, members[i].position);
                            this.setState({
                                position: members[i].position,
                                address: members[i].address,
                                name: alterName,
                            })
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
                            name:this.props.club,
                            address:this.props.logo,
                        })
                    }}>
                        <Fab variant="extended" aria-label="Delete" className={classes.fab} color={"primary"} onClick={()=>{alert("دنبال شد:)")}}>
                            <AddIcon/>
                            دنبال
                        </Fab>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
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

    ifNotPlayer(name, position) {
        switch (position) {
            case 'coach':
                return "سرمربی : " + name;
                break;
            case 'gk_trainer':
                return  "مربی دروازبان : " + name;
                break;
            case 'trainer':
                return "مربی : " + name;
                break;
            case 'body_trainer':
                return "بدن‌ساز : " + name;
                break;
            default:
                return name;
        }
    }
}

export default withStyles(styles, { withTheme: true })(MembersList);