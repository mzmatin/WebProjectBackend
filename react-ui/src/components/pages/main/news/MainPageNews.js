import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MainPageNewsContainer from './MainPageNewsContainer'
import SwitchLabels from "./SwitchLabels";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 'auto',
    },
});

// const basketballNews =

class MainPageNews extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            favorite : false,
            value : 0,
        }
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="فوتبال"/>
                        <Tab label="بسکتبال"/>
                    </Tabs>
                    <SwitchLabels isFavorite={this.state.favorite} handleChange={(checked) => {
                        this.setState({favorite : checked});
                        console.log(this.state.favorite);
                    }}/>
                </AppBar>

                <SwipeableViews
                    axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                    style={{width:'40vw'}}
                >
                    <MainPageNewsContainer title="soccer" fav={this.state.favorite}/>
                    <MainPageNewsContainer title="basketball" fav={this.state.favorite}/>
                </SwipeableViews>
            </div>
        );
    }
}

MainPageNews.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainPageNews);
