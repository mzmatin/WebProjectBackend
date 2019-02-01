import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/es/Input/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        alignSelf: 'center',
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


class SignUp extends React.Component {
        state = {
            showForm: true,
            username:'',
            password:'',
            email:''
        };

    sendAuthMail = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/send_mail/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                userEmail: this.state.email
            })
        })
        .then(res => res.json())
        .then(json => {
            this.setState({showForm: false})
        });
    };

    render() {
        const { classes } = this.props;
        // const redirect = (this.props.location.state == null) ? false : this.props.location.state.redirect;
        // const redirectSuccessful = (this.props.location.state == null)? false : this.props.location.state.redirectSuccessful;
        return (
            <div>
                <Paper style={{ width: '50%', margin: 'auto'}}>
                    {this.state.showForm
                        ?
                        <div style={{margin: 16}} className={classes.container}>
                            <TextField
                                  id="username"
                                  fullWidth
                                  label="نام کاربری"
                                  className={classes.textField}
                                  type="text"
                                  onChange = {(event) => {this.setState({username:event.target.value})}}
                                  margin="normal"
                            />
                            <TextField
                                  id="email"
                                  fullWidth
                                  label="ایمیل"
                                  className={classes.textField}
                                  type="email"
                                  onChange = {(event) => {this.setState({email:event.target.value})}}
                                  margin="normal"
                            />
                            <TextField
                                  id="password"
                                  fullWidth
                                  label="کلمه عبور"
                                  className={classes.textField}
                                  type="password"
                                  onChange = {(event) => {this.setState({password:event.target.value})}}
                                  margin="normal"
                            />
                            <Button onClick={this.sendAuthMail} className={classes.button}>
                                {'انجام'}
                            </Button>
                        </div>
                        :
                        <div className={classes.container}>
                            <p style={{alignSelf: 'center', textAlign: 'center'}}>
                                لینک فعال‌سازی و تایید حساب به آدرس ایمیل شما ارسال شده است.
                            </p>
                            <p style={{alignSelf: 'center', textAlign: 'center'}}>
                                در صورتی که ایمیل را دریافت نکرده‌اید، برای ارسال مجدد بر روی دکمه زیر کلیک کنید.
                            </p>
                            <Button onClick={this.sendAuthMail}  className={classes.button}>
                                {'ارسال مجدد'}
                            </Button>
                        </div>
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

export default withRouter(withStyles(styles)(SignUp));
