import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Chip from '@material-ui/core/Chip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PaperSheet from "../../PaperSheet";
import PersianNumber from '../../utils/PersianNumber';
import TextField from "@material-ui/core/TextField/TextField";
import ImageAvatars from "../../utils/ImageAvatars";
import Comment from "./Comment";


const styles = theme => ({
    root: {
        display: 'flex',
        maxWidth: "65%",
        flexDirection: 'column',
        marginLeft: theme.spacing.unit * 4,
    },
    flex: {
        display: 'flex',
    },
    resourceChipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    tagChipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    card: {
        display: 'flex',
        maxWidth: 800,
    },
    summary: {
        borderRadius: theme.spacing.unit * 1,
        backgroundColor: 'pink',
        padding: theme.spacing.unit * 1,
    },
    newsInfo: {
        display: 'flex',
        marginTop: theme.spacing.unit * 4,
        color: 'grey',
        justifyContent: 'space-between',
    },
    newsInfoSection: {
    },
    newsBody: {
        textAlign: 'justify',
        padding: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 2,
    },
    viewsCount: {
        position: 'relative',
        '&::before':{
            content: '\\F06E',
            fontFamily: 'FontAwesome',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: 'inherit',
        }
    },
    button: {
        margin: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 0.25,
        paddingBottom: theme.spacing.unit * 0.25,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    resourceChip: {
        margin: theme.spacing.unit,
    },
    tagChip: {
        margin: theme.spacing.unit,
        color: 'green',
    },
    commentsContainer: {
        marginTop: theme.spacing.unit * 2,
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderRadius: theme.spacing.unit,
        borderColor: 'grey',
    },
    commentsTitleContainer: {
        color: 'white',
        backgroundColor: 'darkBlue',
        borderTopLeftRadius: theme.spacing.unit,
        borderTopRightRadius: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
    title: {
        padding: theme.spacing.unit * 2,
    },
    form: {
        width: '100%',
        marginLeft: theme.spacing.unit * 3,
    },
    likeContainer: {
        display: 'flex',
        marginRight: theme.spacing.unit * 2,
    },
    cardSection: {
        display: 'flex',
        width: '50%',
        flexDirection: 'column',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit * 3,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    buttonSend: {
        marginTop: theme.spacing.unit,
        padding: theme.spacing.unit * 0.25,
        backgroundColor: 'rgb(51, 193, 93)',
        color: 'white',
        width: theme.spacing.unit * 16,
    },
    actions: {
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    avatar: {
        backgroundColor: red[500],
    },
    flexMarginBottom: {
        display: 'flex',
        marginBottom: theme.spacing.unit * 2,
        justifyContent: 'flex-end',
    },
});

class NewsMain extends React.Component {

    state = {
        like: false,
        disLike: false,
    };

    handleTagChipClick = (event, label) => {
        //TODO: go to news page with the clicked tag
        console.log("clicked on tag " + label)
    };

    handleLike = () => {
        //TODO: request for like
        this.setState({like : !this.state.like, disLike : false});
        console.log("clicked on like ")

    };

    handleDisLike = () => {
        //TODO: request for disLike
        this.setState({disLike : !this.state.disLike, like: false});
        console.log("clicked on dislike ")

    };

    handleSourceChipClick = (event, label) => {
        //TODO: go to news page with the clicked source
        console.log("clicked on source " + label);
    };

    render() {
        const { classes } = this.props;
        const { like, disLike } = this.state;

        let comments = [];
        for (let i = 0; i < this.props.newsComments.length; i++) {
            if (this.props.newsComments[i] !== null)
                comments.push(
                    <Comment key={i} userAvatar ={this.props.userAvatar} comment={this.props.newsComments[i]}/>
                )
        }

        let resources = [];
        for (let i = 0; i < this.props.news.resources.length; i++) {
            resources.push(
                <Chip key={i} onClick={(e) => {this.handleSourceChipClick(e, this.props.news.resources[i])}} label={this.props.news.resources[i]} className={classes.resourceChip} variant="outlined" />
            )
        }

        let tags = [];
        for (let i = 0; i < this.props.news.tags.length; i++) {
            tags.push(
                <Chip key={i} onClick={(e) => {this.handleTagChipClick(e, this.props.news.tags[i])}} label={this.props.news.tags[i]} className={classes.tagChip} variant="outlined" />
            )
        }

        return (
            <div className={classes.root}>
                <div className={classes.resourceChipContainer}>
                    {resources}
                </div>
                <Card className={classes.card}>
                    <div className={classes.cardSection}>
                        <CardMedia
                            className={classes.media}
                            image = {this.props.news.imageUrl}
                            title={this.props.news.title}
                        />
                    </div>
                    <CardContent className={classes.cardSection}>
                        <h3>{this.props.news.title}</h3>
                        <Typography className={classes.summary} component="p">
                            {this.props.news.summary}
                        </Typography>
                        <div className={classes.newsInfo}>
                            <div className={classes.newsInfoSection}>
                                <FontAwesomeIcon
                                    icon="eye"
                                    color="grey"
                                    size="2sm"
                                />
                                {' '}<PersianNumber>{this.props.news.viewsCount.toString()}</PersianNumber>
                            </div>
                            <div className={classes.newsInfoSection}>
                                <PersianNumber>{this.props.news.time.hour.toString()}</PersianNumber>
                                {':'}<PersianNumber>{this.props.news.time.minute.toString()}</PersianNumber>
                                {':'}<PersianNumber>{this.props.news.time.second.toString()}</PersianNumber>
                            </div>
                            <div className={classes.newsInfoSection}>
                                <PersianNumber>{this.props.news.time.day.toString()}</PersianNumber>
                                {' '}{this.props.news.time.month.toString()}
                                {' '}<PersianNumber>{this.props.news.time.year.toString()}</PersianNumber>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Paper>
                    <Typography className={classes.newsBody}>
                        {this.props.news.content}
                    </Typography>
                    <div className={classes.likeContainer}>
                        <Button onClick={this.handleLike} variant="contained" color="default" className={classes.button}>
                            <FontAwesomeIcon className={classes.rightIcon}
                                icon="thumbs-up"
                                color={like ? 'green' : 'grey'}
                                size="2sm"
                            />
                            {' '}{<PersianNumber>{String(this.props.news.likeCount + (like ? 1 : 0))}</PersianNumber>}
                        </Button>
                        <Button onClick={this.handleDisLike} variant="contained" color="default" className={classes.button}>
                            <FontAwesomeIcon className={classes.rightIcon}
                                icon="thumbs-down"
                                color={disLike ? 'red' : 'grey'}
                                size="2sm"
                            />
                            {' '}{<PersianNumber>{String(this.props.news.disLikeCount + (disLike ? 1 : 0))}</PersianNumber>}
                        </Button>
                    </div>
                    <div className={classes.tagChipContainer}>
                        {tags}
                    </div>
                </Paper>
                <Paper className={classes.commentsContainer}>
                    <div className={classes.commentsTitleContainer}>
                        <span className={classes.title}>نظرات کاربران</span>
                    </div>
                    <div className={classes.flex}>
                        <ImageAvatars avatar = {this.props.userAvatar} size = {50}/>
                        <div className={classes.form}>
                            <form>
                                <TextField
                                    onChange={this.handleReplyChange}
                                    fullWidth
                                    id="commentReply"
                                    placeholder={'نظر شما'}
                                    multiline
                                    className={classes.textField}
                                    margin="normal"
                                    required
                                    variant="outlined"
                                />
                            </form>
                            <div className={classes.flexMarginBottom}>
                                <Button onClick={this.handleReplySend} variant="contained" className={classes.buttonSend}>
                                    {' '}{'ارسال'}
                                </Button>
                            </div>
                        </div>
                    </div>
                        {comments}
                </Paper>
            </div>

        );
    }
}

NewsMain.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsMain);
