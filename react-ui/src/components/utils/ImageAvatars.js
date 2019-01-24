import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    bigAvatar: {
        margin: theme.spacing.unit * 2,
    },
    avatarGrid:{
        width: 'auto',
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
    },
    avatarWrapper : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
    }
});

function ImageAvatars(props) {
    const { classes } = props;
    return (
        <Grid container justify="center" alignItems="center" className={classes.avatarGrid}>
            <div className={classes.avatarWrapper}>
                <Avatar alt={props.name} src={props.avatar} style={{width: props.size, height: props.size}} className={classes.bigAvatar} />
                <Typography variant="subtitle2" gutterBottom>
                    {props.name}
                </Typography>
            </div>
        </Grid>
    );
}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
