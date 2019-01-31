import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class SimpleSelect extends React.Component {
    handleChange = event => {
        this.props.leagueChange(event.target.value);
    };

    render() {
        const {classes} = this.props;
        const items = [];
        for (let i = 0; i < this.props.items.length; i++) {
            items.push(
                <MenuItem value={this.props.items[i]} key={i}>{this.props.items[i]}</MenuItem>
            );
        }
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor={this.props.subject}>{this.props.subject}</InputLabel>
                    <Select
                        value={this.props.value}
                        onChange={this.handleChange}
                        inputProps={{
                            text: this.props.subject,
                            id: this.props.subject,
                        }}
                    >
                        {items}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
