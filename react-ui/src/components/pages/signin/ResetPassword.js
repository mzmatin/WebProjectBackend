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


class ResetPasswordPage extends React.Component {
        state = {
            authSuccess: false,
            changeSuccess: false,
            changeP: false,
            password: "",
            token: ""
        };

    handleChangePass = (e) =>{
        e.preventDefault();

        const parsed = qs.parse(this.props.location.search);
        console.log(parsed);

        fetch('http://localhost:8000/api/change-pass/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: parsed.name,
                pass: this.state.password,
                token: this.state.token,
                email: parsed.email
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            var p = JSON.parse(json);
            console.log(p);
            this.setState({changeP: true, changeSuccess: p.success})
        });

    };

    componentDidMount() {
        const parsed = qs.parse(this.props.location.search);
        console.log(parsed);

        fetch('http://localhost:8000/api/auth_forget_mail/', {
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
            this.setState({authSuccess: p.success, token: p.token})
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper style={{ width: '50%', margin: 'auto'}}>
                    {(this.state.authSuccess)
                        ?
                        (this.state.changeP)
                                ?
                                (this.state.changeSuccess)
                                    ?
                                    (<div className={classes.container}>
                                        <p style={{alignSelf: 'center'}}>
                                            تغییر با موفقیت انجام شد.
                                        </p>
                                        <Button component={Link} to={{ pathname: '/signin'}} className={classes.button}>
                                        {'ورود به صفحه ورود'}
                                        </Button>
                                    </div>)
                                    :
                                    (<div className={classes.container}>
                                        <p style={{alignSelf: 'center'}}>
                                            خطا در تایید. لطفا مجددا امتحان نمایید.
                                        </p>
                                        <Button component={Link} to={{ pathname: '/forget-pass' }} className={classes.button}>
                                        {'ورود به صفحه فراموشی'}
                                        </Button>
                                    </div>)

                                :
                                (<div style={{margin: 16}} className={classes.container}>
                                    <TextField
                                          id="password"
                                          fullWidth
                                          label="کلمه عبور جدید"
                                          className={classes.textField}
                                          type="password"
                                          onChange = {(event) => {this.setState({password:event.target.value})}}
                                          margin="normal"
                                    />
                                    <Button onClick={this.handleChangePass} className={classes.button}>
                                    {'تغییر'}
                                    </Button>
                                </div>)
                        :
                        (<div className={classes.container}>
                            <p style={{alignSelf: 'center'}}>
                                خطا در تایید. لطفا مجددا امتحان نمایید.
                            </p>
                            <Button component={Link} to={{ pathname: '/forget-pass' }} className={classes.button}>
                            {'ورود به صفحه فراموشی'}
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

export default withRouter(withStyles(styles)(ResetPasswordPage));
