import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends React.Component {
    state = {
        checkedA: false,
    };

    handleChange = name => event => {
        this.props.handleChange(event.target.checked);
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value="checkedA"
                        />
                    }
                    label="موردعلاقه"
                />

            </FormGroup>
        );
    }
}

export default SwitchLabels;
