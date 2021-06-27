import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Container } from 'react-bootstrap';
import Login from './pages/Login';
import PostList from './pages/posts/PostList';
import Profile from './pages/Profile';

class App extends Component{
    state = {
        PUBLIC_URL: "/task/"
    };

    render(){
        return (
            <div>
                <Router>
                    <Header />
                    <div>

                        <Container className="p-4">

                            <Switch>

                                <Route path={`${this.state.PUBLIC_URL}login`}>
                                    <Login />
                                </Route>

                                <Route path={`${this.state.PUBLIC_URL}posts`}>
                                    <PostList/>
                                </Route>

                                <Route path={`${this.state.PUBLIC_URL}profile`}>
                                    <Profile/>
                                </Route>


                            </Switch>

                            <Footer/>
                        </Container>
                    </div>
                    
                </Router>
            </div>
        );
    }
    
}
 
export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}