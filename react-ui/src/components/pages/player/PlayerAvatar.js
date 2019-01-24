import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

const styles = {
    bigAvatar: {
        margin: 10,
        width: 170,
        height: 170,
    },
    avatarWrapper : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
    }
};

function PlayerAvatar(props) {
    const { classes } = props;
    return (
        <Grid container justify="center" alignItems="center">
            <div className={classes.avatarWrapper}>
                <Avatar alt={props.text} src={props.avatar} className={classes.bigAvatar} />
                <Typography variant="h3" gutterBottom>
                    {props.text}
                </Typography>
            </div>
        </Grid>
    );
}

PlayerAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerAvatar);
