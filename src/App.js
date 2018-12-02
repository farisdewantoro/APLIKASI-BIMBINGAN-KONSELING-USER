import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentMurid, logoutMurid } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';
import MainLayout from './components/layouts/MainLayout';
import Login from './components/auth/Login';
import Dashboard from './components/pages/Dashboard';
import Konsultasi from './components/pages/Konsultasi/Konsultasi';
import RapotList from './components/pages/Rapot/RapotList';
import ShowRapotSiswa from './components/pages/Rapot/ShowRapotSiswa';
import NilaiRapotPDF from './components/pdf/NilaiRapotPDF';
import './App.css';
// Check for token 
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get admin info experid
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set admin and isAuthenticated
  store.dispatch(setCurrentMurid(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout Admin
    store.dispatch(logoutMurid());
    // TODO:Clear current profile
    // Redirect to login
    window.location.href = '/login';
  }

}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/rapot/siswa/PDF" exact component={NilaiRapotPDF} />
            <MainLayout>
              <Switch>
                <PrivateRoute path="/" exact component={Dashboard} />
                <PrivateRoute path="/konsultasi" exact component={Konsultasi} />
                <PrivateRoute path="/rapotsiswa" exact component={RapotList}/>
                <PrivateRoute path="/rapotsiswa/:nis/:kelas/:semester" exact component={ShowRapotSiswa}/>
              </Switch>
            </MainLayout>

          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
