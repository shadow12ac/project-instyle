import React, { Component } from "react";
import "../Styles/Login.css"
import {NavLink,Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
import {getToken} from '../actions/authAction'

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
 			uid:'',
			email:"",
			password:"",
			isAuth:false,
			message:"",
			// token:""
		}
	}
	handleChange(evt){
		this.setState({[evt.target.name]:evt.target.value});
	}

	handleSubmit(evt) {
		//console.log("email: ", this.state.email)
		evt.preventDefault()

		console.log("Signing In")

		axios.post("/api/login",{
			email:this.state.email,
			password:this.state.password
		})
			.then(response => {
				if(response.data.isAuth) {
					this.props.getToken(response.data);
					this.setState(
						{
							isAuth: response.data.success,
							token:response.data.token,
							uid: response.data.uid,
							message: "Welcome " + this.state.email

						}
					)
					this.props.history.push('/')
				} else {
					this.setState(
						{
							isAuth: response.data.success,
							uid: null,
							message: response.data.message
						}
					)
				}
			}).catch(function (error) {
			console.log("Authorization failed: "+ error.message);
		})
		// return <Redirect to="/" />
	}


	render(){

		return(
			<div className="loginForm">
				<h5 className="signin-header" ><strong>Log-In</strong></h5>
				<div className="signin-body">
					<form className="signin-form">
					
						<div className="input-form">
							<input className="form-control" id="email-form" name="email" type="email"  value={this.state.email} onChange={this.handleChange.bind(this)}/>
							<label htmlFor="email-form" className="lable-control"> E-mail </label>
						</div>

						<div className="input-form">
							<input className="form-control" id="password-form" name="password" autoComplete="new-password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
							<label htmlFor="password-form" className="lable-control"> Password </label>
						</div>
						<div>
							<input className="message-box" id="message" disabled={true} readOnly={true} value={this.state.message}  size="30"/>
						</div>
						<br/>
						<button className="signin-button" type="submit" id="signIn" onClick={this.handleSubmit.bind(this)}>Sign In</button>
						{/*<button id="signOut" onClick={this.handleSignOut.bind(this)} >Sign Out</button>*/}

						<div>
							<div>
								<a className="forget-password" href="">Forget Password?</a>
							</div>
							Not a member? 
							<NavLink to="/register">Register</NavLink>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		token: state.auth.token
	}
}
export default connect(mapStateToProps,{getToken})(Login);
