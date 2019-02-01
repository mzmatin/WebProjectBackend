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
            showForm: true,
            username:'',
            password:'',
            status: false,
        };

    handleLogin = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/token-auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            console.log(json.token);
            if (json.token != null) {
                localStorage.setItem('token', json.token);
                localStorage.setItem('user', json.user);

                this.setState({
                    showForm: false,
                    status: true,
                });
                this.props.onLogIn()

            }
            else {
                this.setState({
                    showForm: false,
                    status: false
                })
            }
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
                                      id="username"
                                      fullWidth
                                      label="نام کاربری"
                                      className={classes.textField}
                                      type="text"
                                      onChange = {(event) => {this.setState({username:event.target.value})}}
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
                                <Button onClick={this.handleLogin} className={classes.button}>
                                {'ورود'}
                                </Button>
                            </div>)
                        :
                            this.state.status
                            ?
                                (<div className={classes.container}>
                                    <p style={{alignSelf: 'center', textAlign: 'center'}}>
                                        ورود شما با موفقیت انجام شد.
                                    </p>
                                    <Button component={Link} to={{pathname: '/'}}  className={classes.button}>
                                        {'صفحه اصلی'}
                                    </Button>
                                </div>)
                            :
                                <div className={classes.container}>
                                    <p style={{alignSelf: 'center', textAlign: 'center'}}>
                                        خطایی در ورود شما رخ داده است.
                                    </p>
                                    <Button onClick={this.showForm}  className={classes.button}>
                                        {'تلاش مجدد'}
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
    onLogIn: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignInPage);
