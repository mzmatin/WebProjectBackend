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
        alignSelf: 'center',
        margin: theme.spacing.unit,
        backgroundColor: 'blue',
        color: 'white',
    },
});


class SignInPage extends React.Component {
        state = {
            email:'',
            username:'',
            showForm: true,
        };

    sendEmail = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/send_forget_mail/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                userEmail: this.state.email
            })
        })
        .then(res => res.json())
        .then(json => {
            this.setState({showForm: false})
        });
    };

    showForm = (e) => {
        e.preventDefault();

        this.setState({
            showForm: true,
            status: false
        })
    };

    render() {
        const { classes, onLogIn } = this.props;
        return (
            <div>
                <Paper style={{ width: '50%', margin: 'auto'}}>
                    {
                        this.state.showForm
                            ?
                        (<div style={{margin: 16}} className={classes.container}>
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
                                  id="username"
                                  fullWidth
                                  label="نام کاربری"
                                  className={classes.textField}
                                  type="text"
                                  onChange = {(event) => {this.setState({username:event.target.value})}}
                                  margin="normal"
                            />
                            <Button onClick={this.sendEmail} className={classes.button}>
                            {'ارسال ایمیل بازیابی'}
                            </Button>
                        </div>)
                            :
                            <div className={classes.container}>
                                <p style={{alignSelf: 'center', textAlign: 'center'}}>
                                    ایمیل برای شما ارسال شد.
                                </p>
                            </div>
                    }

                </Paper>
            </div>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    onLogIn: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignInPage);
