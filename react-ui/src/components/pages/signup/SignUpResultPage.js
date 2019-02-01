import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/es/Input/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import * as qs from 'query-string';


const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: 'blue',
        color: 'white',
        alignSelf: 'center',
    },
});


class SignUpResultPage extends React.Component {
        state = {
            success: false,
        };

    componentDidMount() {
        const parsed = qs.parse(this.props.location.search);
        console.log(parsed);

        fetch('http://localhost:8000/api/auth_mail/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsed)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            var p = JSON.parse(json);
            console.log(p);
            this.setState({success: p.success})
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper style={{ width: '50%', margin: 'auto'}}>
                    {this.state.success
                        ?
                        (<div className={classes.container}>
                            <p style={{alignSelf: 'center'}}>
                                عضویت شما با موفقیت انجام شد.
                            </p>
                            <Button component={Link} to={{ pathname: '/signin'}} className={classes.button}>
                            {'ورود به صفحه ورود'}
                            </Button>
                        </div>)
                        :
                        (<div className={classes.container}>
                            <p style={{alignSelf: 'center'}}>
                                خطا در عضویت. لطفا مجددا امتحان نمایید.
                            </p>
                            <Button component={Link} to={{ pathname: '/signup' }} className={classes.button}>
                            {'ورود به صفحه عضویت'}
                            </Button>
                        </div>)
                    }
                </Paper>
            </div>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    // redirect: PropTypes.bool.isRequired,
    // redirectSuccessful: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles)(SignUpResultPage));
