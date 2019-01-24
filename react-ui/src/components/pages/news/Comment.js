import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import PersianNumber from '../../utils/PersianNumber';
import ImageAvatars from "../../utils/ImageAvatars";
import Expand from "react-expand-animated";
import TextField from "@material-ui/core/TextField/TextField";
import CommentReply from "./CommentReply";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {green} from "@material-ui/core/colors";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: theme.spacing.unit,
        borderWidth: 'thin',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
    },
    flex: {
        display: 'flex'
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginLeft: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    success: {
        backgroundColor: green[600],
    },
    form: {
      width: '100%',
      marginLeft: theme.spacing.unit * 3,
    },
    commentBody: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit * 2,
        flexGrow: '1',
    },
    commentInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 0.25,
        backgroundColor: 'transparent',
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
    replyButton:{
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 0.25,
        backgroundColor: '#00000000',
        borderColor: 'green',
        marginLeft: theme.spacing.unit * 4,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    flexMarginBottom: {
        display: 'flex',
        marginBottom: theme.spacing.unit * 2,
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = CheckCircleIcon;

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
        />
    );
}

class Comment extends React.Component {
    state = {
        like: false,
        disLike: false,
        replyOpen: false,
        snackBarOpen: false,
        reply: '',
    };

    handleReplyChange = (event) => {
        this.setState({reply: event.target.value});
    };

    handleLike = () => {
        //TODO: request for like
        this.setState({
            like: !this.state.like,
            disLike: false
        });
    };

    handleReplySend = () => {
        // TODO: send reply after checking for it being empty
        this.closeReply();
        this.setState({
            snackBarOpen: true,
        });
    };

    closeSnackBar = () => {
        this.setState({
            snackBarOpen: false,
        });
    };

    handleDisLike = () => {
        //TODO: request for disLike
        this.setState({
            disLike: !this.state.disLike,
            like: false
        });
    };

    openReply = () => {
        this.setState({replyOpen: true})
    };

    closeReply = () => {
        this.setState({replyOpen: false})
        // TODO: clear reply body
    };

    render() {
        const { classes } = this.props;
        const { like, disLike, replyOpen, snackBarOpen } = this.state;
        const transitions = ["height", "opacity", "background"];

        const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

        let replies = [];
        for (let i = 0; i < this.props.comment.commentReplies.length; i++) {
            replies.push (
                <CommentReply commentReply = {this.props.comment.commentReplies[i]}/>
            )
        }

        const snackBar = (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.snackBarOpen}
                autoHideDuration={6000}
                onClose={this.closeSnackBar}
            >
                <MySnackbarContentWrapper
                    onClose={this.closeSnackBar}
                    variant="success"
                    message="نظر شما جهت بررسی و تایید ارسال شد!"
                />
            </Snackbar>
        );

        return (
            <div className={classes.root}>
                {snackBar}
                <div className={classes.flex}>
                    <ImageAvatars name = {this.props.comment.commentBody.userName} avatar = {this.props.comment.commentBody.userAvatarUrl} size = {50}/>
                    <div className={classes.commentBody}>
                        <Typography style={{textAlign: 'justify'}}>
                            {this.props.comment.commentBody.text}
                        </Typography>
                        <div className={classes.commentInfo}>
                            <div style={{color: 'grey', alignSelf: 'center'}}>
                                <FontAwesomeIcon
                                    icon="clock"
                                    color="grey"
                                    size="2sm"
                                />
                                {' '}<PersianNumber>{this.props.comment.commentBody.time.day}</PersianNumber>
                                {' '}{this.props.comment.commentBody.time.month}
                                {' '}<PersianNumber>{this.props.comment.commentBody.time.year}</PersianNumber>
                                {' '}{'ساعت'}
                                {' '}<PersianNumber>{this.props.comment.commentBody.time.hour}</PersianNumber>
                                {':'}<PersianNumber>{this.props.comment.commentBody.time.minute}</PersianNumber>
                                {':'}<PersianNumber>{this.props.comment.commentBody.time.second}</PersianNumber>
                            </div>
                            <div className={classes.likeContainer}>
                                <Button onClick={this.openReply} variant="outlined" className={classes.replyButton}>
                                    <FontAwesomeIcon className={classes.rightIcon}
                                                     icon="reply"
                                                     color='grey'
                                                     size="2sm"
                                    />
                                    {' '}{'پاسخ'}
                                </Button>
                                <Button onClick={this.handleLike} variant="fab" className={classes.button}>
                                    <FontAwesomeIcon className={classes.rightIcon}
                                                     icon="thumbs-up"
                                                     color={like ? 'green' : 'grey'}
                                                     size="2sm"
                                    />
                                    {' '}{<PersianNumber>{String(this.props.comment.commentBody.likeCount + (like ? 1 : 0))}</PersianNumber>}
                                </Button>
                                <Button onClick={this.handleDisLike} variant="fab" className={classes.button}>
                                    <FontAwesomeIcon className={classes.rightIcon}
                                                     icon="thumbs-down"
                                                     color={disLike ? 'red' : 'grey'}
                                                     size="2sm"
                                    />
                                    {' '}{<PersianNumber>{String(this.props.comment.commentBody.dislikeCount + (disLike ? 1 : 0))}</PersianNumber>}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Expand
                    open={replyOpen}
                    duration={1000}
                    transitions={transitions}
                >
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
                                <Button onClick={this.handleReplySend} variant="contained" style={{backgroundColor: 'green', color: 'white'}} className={classes.button}>
                                    {' '}{'ارسال'}
                                </Button>
                                <Button onClick={this.closeReply} variant="contained" style={{backgroundColor: 'red', color: 'white'}} className={classes.button}>
                                    {' '}{'انصراف'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Expand>
                {replies}
            </div>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);
