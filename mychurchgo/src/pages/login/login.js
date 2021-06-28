import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { toast } from "react-toastify";
import decode from 'jwt-decode';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import loginMary from "../../assets/loginMary.png";

const checkAuth = () => {
    const token = localStorage.getItem('token');
    const refreshtoken = localStorage.getItem('refreshtoken');
    if (!token || !refreshtoken) {
        return false;
    }
    try {
        const { exp } = decode(refreshtoken);
        if (exp < new Date().getTime()) {
            return false;
        }
    } catch (e) {
        return false;
    }
}

class Login extends Component {

    state = {
        credentials: {
            email: '',
            password: ''
        },
        isLoginView: true,
        errorMessage: ''
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({ credentials: cred });

    }
    login = event => {
        if (this.state.isLoginView) {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/login/`,//'https://afternoon-forest-69943.herokuapp.com/api/Parishioner',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.credentials)
                }).then(resp => resp.json())
                .then(res => {
                    localStorage.setItem('login', JSON.stringify({ login: true, token: res.token }))
                    localStorage.setItem('xlogin', res.token)
                    this.props.cookies.set('my-token', res.token);
                    window.location.href="/home";
                })
                .catch(error => { this.setState({ errorMessage: console.error.message }) })
        }
            else {
                fetch(`${process.env.REACT_APP_API_URL}/api/users/login/`,//'https://afternoon-forest-69943.herokuapp.com/api/Parishioner',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.state.credentials)
                    }).then(resp => resp.json())
                    .then(res => {
                        this.setState({ isLoginView: true })
                    })
                    .catch(error => { this.setState({ errorMessage: console.error.message }) })
            }
          

    }

    render() {
        return <div className="login-container">
            <h1>              Login</h1>
            <div className="row">
                <div className="col-md-4">
                    <img src={loginMary} />
                </div>
                <div className="col-md-5">
                    <span>Email</span><input type="text" name="email" value={this.state.credentials.email}
                        onChange={this.inputChanged} /><br />
                    <span>Password</span><input type="password" name="password" value={this.state.credentials.password}
                        onChange={this.inputChanged} /><br />
                    <button onClick={this.login}>Login</button>
                    <p onClick={this.toggleView}></p>
                    {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>}
                </div>
            </div>
        </div>
    }
}

export default withCookies(Login);