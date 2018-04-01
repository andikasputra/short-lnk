import React from 'react'

import PrivateHeader from './private-header'
import AddLink from './add-link'
import LinksList from './links-list'
import LinksListFilter from './links-list-filter'

const Link = () => {
	return (
		<div>
			<PrivateHeader title="Links" />
			<div className="page-content">
				<LinksListFilter />
				<AddLink />
				<LinksList />
			</div>
		</div>
	)
}

export default Link