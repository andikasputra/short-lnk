import React from 'react'
import { Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'

export default class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: '',
			email: '',
			password: ''
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		const email = this.state.email
		const password = this.state.password

		if (password.length < 6) {
			return this.setState({ error: 'Password must be more 6 character or more' })
		}

		Accounts.createUser({ email, password }, (err) => {
			if (err) {
				this.setState({ error: err.reason })
			} else {
				this.setState({
					error: '',
					email: '',
					password: ''
				})
			}
		})
	}
	handleChange(e) {
		const target = e.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	}
	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Register</h1>
					{this.state.error ? <p>{this.state.error}</p> : undefined}
					<form onSubmit={this.handleSubmit.bind(this)} className="box-view__form">
						<input 
							type="email" 
							name="email" 
							placeholder="Email" 
							value={this.state.email} 
							onChange={this.handleChange.bind(this)} />
						<input 
							type="password" 
							name="password" 
							placeholder="Password" 
							value={this.state.password} 
							onChange={this.handleChange.bind(this)} />
						<button className="button">Register</button>
					</form>
					<Link to="/">Already have an account</Link>
				</div>
			</div>
		)
	}
}