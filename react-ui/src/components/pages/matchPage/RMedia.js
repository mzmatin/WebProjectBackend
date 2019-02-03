import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {withRouter} from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 2,
    },
    gridList: {
        height: 'auto',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

const nowrap = {
    whiteSpace: 'normal',
};

function RMedia(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList} style={{width: props.width}}>
                <GridListTile key="Subheader" cols={props.columns} style={{height: 'auto'}}>
                    <ListSubheader component="div">{props.listTitle}</ListSubheader>
                </GridListTile>
                {props.listItems.map((tile, i) => (
                    <GridListTile key={i}>
                        {tile.type === 'p'? <img src={tile.media_link} alt={tile.title}/> : tile.media_link}
                        <GridListTileBar
                            title={<span style={nowrap}>{tile.title}</span>}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

RMedia.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(RMedia));
