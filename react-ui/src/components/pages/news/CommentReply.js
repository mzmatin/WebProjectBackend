import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import PersianNumber from '../../utils/PersianNumber';
import ImageAvatars from "../../utils/ImageAvatars";


const styles = theme => ({
    root: {
        display: 'flex',
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 10,
        borderTopStyle: 'solid',
        borderTopWidth: 'thin',
        borderTopColor: 'green',
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
    button: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 0.25,
        backgroundColor: 'transparent',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class CommentReply extends React.Component {

    state = {
        like: false,
        disLike: false,
    };

    handleLike = () => {
        //TODO: request for like
        this.setState({like : !this.state.like, disLike : false});

    };

    handleDisLike = () => {
        //TODO: request for disLike
        this.setState({disLike : !this.state.disLike, like: false});
    };

    render() {
        const { classes } = this.props;
        const { like, disLike } = this.state;

        return (
            <div className={classes.root}>
                <ImageAvatars name = {this.props.commentReply.userName} avatar = {this.props.commentReply.userAvatarUrl} size = {50}/>
                <div className={classes.commentBody}>
                    <Typography style={{textAlign: 'justify'}}>
                        {this.props.commentReply.text}
                    </Typography>
                    <div className={classes.commentInfo}>
                        <div style={{color: 'grey', alignSelf: 'center'}}>
                            <FontAwesomeIcon
                                icon="clock"
                                color="grey"
                                size="2sm"
                            />
                            {' '}<PersianNumber>{this.props.commentReply.time.day}</PersianNumber>
                            {' '}{this.props.commentReply.time.month}
                            {' '}<PersianNumber>{this.props.commentReply.time.year}</PersianNumber>
                            {' '}{'ساعت'}
                            {' '}<PersianNumber>{this.props.commentReply.time.hour}</PersianNumber>
                            {':'}<PersianNumber>{this.props.commentReply.time.minute}</PersianNumber>
                            {':'}<PersianNumber>{this.props.commentReply.time.second}</PersianNumber>
                        </div>
                        <div className={classes.likeContainer}>
                            <Button onClick={this.handleLike} variant="fab" color="default" className={classes.button}>
                                <FontAwesomeIcon className={classes.rightIcon}
                                                 icon="thumbs-up"
                                                 color={like ? 'green' : 'grey'}
                                                 size="2sm"
                                />
                                {' '}{<PersianNumber>{String(this.props.commentReply.likeCount + (like ? 1 : 0))}</PersianNumber>}
                            </Button>
                            <Button onClick={this.handleDisLike} variant="fab" color="default" className={classes.button}>
                                <FontAwesomeIcon className={classes.rightIcon}
                                                 icon="thumbs-down"
                                                 color={disLike ? 'red' : 'grey'}
                                                 size="2sm"
                                />
                                {' '}{<PersianNumber>{String(this.props.commentReply.dislikeCount + (disLike ? 1 : 0))}</PersianNumber>}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CommentReply.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentReply);
