import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom' //You can install this complement using: npm i react-router-dom
import jwtDecode from 'jwt-decode';
import './App.css';

//Login component
import Login from './components/login/Login'

//Fixed components
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer'

//Dynamic components
import Administrators from './components/contents/administrators/Administrators'
import Slide from './components/contents/slide/Slide'
import Galery from './components/contents/galery/Galery'
import Users from './components/contents/users/Users'
import Articles from './components/contents/articles/Articles'
import Error404 from './components/contents/error404/Error404'

export default function App() {
  const auth = getAccessToken();

  if(!auth){ //If not authenticated
    return(
      <Login/>
    )
  }

  return ( //If authenticated
    <div className="sidebar-mini">
      <div className="wrapper">
        <Header/>
        <Sidebar/>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Administrators}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/slide" component={Slide}/>
            <Route exact path="/galery" component={Galery}/>
            <Route exact path="/articles" component={Articles}/>
            <Route component={Error404}/>
          </Switch>
        </BrowserRouter>

        {/* <Administrators/> */}
        <Footer/>
      </div>
    </div>
  );
}

//Function to have access to the token
const getAccessToken = ()=>{
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const idUser = localStorage.getItem("ID");
  const user = localStorage.getItem("USER");

  if(!accessToken || accessToken === null ||
     !idUser || idUser === null ||
     !user || user === null)
  {
    return false;
  }
    
  const metaToken = jwtDecode(accessToken);

  if(!metaToken.data)
    return false;
  

  if(isTokenExpired(accessToken, metaToken) || metaToken.data._id !== idUser || metaToken.data.user !== user)
    return false;
  
  else
    return true;
}

//Function to verify token expiration date
const isTokenExpired = (accessToken, metaToken)=>{
  const seconds = 60;
  const {exp} = metaToken;
  const now = (Date.now()+seconds)/1000;

  return exp < now;
}