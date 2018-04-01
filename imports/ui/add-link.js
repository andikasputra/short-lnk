import React from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

import { Links } from '../api/links'

export default class AddLink extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			url: '',
			isOpen: false,
			error: ''
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		const { url } = this.state
		if (url) {
			// Links.insert({ url, userId: Meteor.userId() })
			Meteor.call('links.insert', url, (err, res) => {
				if (!err) {
					this.handleModalClose()
				} else {
					this.setState({ error: err.reason })
				}
			})
		}
	}
	handleChange(e) {
		const target = e.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	}
	handleModalClose() {
		this.setState({
			isOpen: false,
			url: '',
			error: ''
		})
	}
	render() {
		return(
			<div>
				<button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
				<Modal 
					isOpen={this.state.isOpen} 
					contentLabel="Add Link" 
					onAfterOpen={() => this.refs.url.focus()}
					onRequestClose={this.handleModalClose.bind(this)}
					className="boxed-view__box"
					overlayClassName="boxed-view boxed-view__modal">
					<h1>Add Link</h1>
					{this.state.error ? <p>{this.state.error}</p> : undefined}
					<form onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
						<input 
							type="text" 
							name="url" 
							ref="url"
							placholder="URL"
							value={this.state.url} 
							onChange={this.handleChange.bind(this)} />
						<button className="button">Add Link</button>
						<button className="button button--secondary" type="button" onClick={this.handleModalClose.bind(this)}>Cancel</button>
					</form>
				</Modal>
			</div>
		)
	}
}