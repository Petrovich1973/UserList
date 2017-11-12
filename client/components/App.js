import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import FormAddUser from './FormAddUser';
import Users from './Users';

import { fetchUsers, editUserCancel } from '../actions/userActions';

@connect((store) => {
    return {
        users: store.users
    };
})

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.initialState = {}
	}

	componentWillMount() {
		!this.props.users.length ? this.props.dispatch(fetchUsers()) : null;
	}

	handleClickUpdateUsers() {
		this.props.dispatch(fetchUsers());
	}

	handleClickEditUserCancel() {
		this.props.dispatch(editUserCancel());
	}

	render() {

		const { users, editMode, waiting } = this.props.users;

		return (
			<div>
				{ editMode ? <div className="overlay" onClick={this.handleClickEditUserCancel.bind(this)} /> : null }
				<div className="container">

					<h1><img src="libs/img/logo-sb.svg" width="48"/> <span>Users screen</span></h1>

					<FormAddUser />

					<h3 className="flex-space-between">
						<span>Users list</span>
						<button 
						type="button"
						className="btn btn-default btn-xs"
						disabled={ waiting ? true : false }
						onClick={ this.handleClickUpdateUsers.bind(this) }>
							<i className={classNames("fa", "fa-refresh", {"fa-spin": waiting})} /> Update users list
						</button>
					</h3>

					{ waiting ? 
						<p className="text-center">
							<i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
						</p> : 
						<Users users={ users } /> }

				</div>
			</div>			
		)
	}
}

App.displayName = 'App';

export default App;