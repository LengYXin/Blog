import * as React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

export const AuthExample = ({ match }) => (
    <div>
        <AuthButton />
        <ul>
            <li><Link to={`${match.url}`} >Public Page</Link></li>
            <li><Link to={`${match.url}/protected`}  >Protected Page</Link></li>
        </ul>
        <Route path={`${match.url}`} component={Public} />
        <Route path={`${match.url}/login`} component={Login} />
        <PrivateRoute path={`${match.url}/protected`} component={Protected} match={match} />
    </div>
)

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 1000) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 1000)
    }
}

const AuthButton = withRouter((props) => {
    console.log("history", props);
    let { history } = props;
    return fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
                fakeAuth.signout(() => history.push({ pathname: '/' }))
            }}>Sign out</button>
        </p>
    ) : (
            <p>You are not logged in.</p>
        )
})

const PrivateRoute = ({ component: Component, ...rest }) => {
    {
        console.log("rest", rest);
        return <Route {...rest} render={props => (
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: rest.match.path + '/login',
                        state: { from: props.location }
                    }} />
                )
        )} />
    }
}
const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component<any, any> {
    state = {
        redirectToReferrer: false
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true })
        })
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            console.log("from", from);
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}
