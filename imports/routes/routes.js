import { Meteor } from 'meteor/meteor'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from '../ui/login'
import Register from '../ui/register'
import Link from '../ui/link'
import NotFound from '../ui/not-found'

const unauthenticatedPages = ['/', '/register']
const authenticatedPages = ['/links']

export const authChangeHandle = (isAuthenticated) => {
	const { pathname } = location

	const isUnAuthenticatedPage = unauthenticatedPages.includes(pathname)
	const isAuthenticatedPage = authenticatedPages.includes(pathname)

	if (isUnAuthenticatedPage && isAuthenticated) {
		location.assign('/links')
	} else if (isAuthenticatedPage && !isAuthenticated) {
		location.assign('/')
	}
}

export const routes = (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/links" component={Link} />
			<Route path="/register" component={Register} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
)