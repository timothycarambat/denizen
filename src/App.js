import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import LandingPage from "./pages/Landing";
import WorkspacePage from "./pages/Workspace";
import SpacesPage from "./pages/Spaces";
import AboutPage from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/space/:workspaceId">
          <WorkspacePage />
        </Route>
        <Route exact path="/spaces">
          <SpacesPage />
        </Route>
        <Route exact path="/spaces/:nearby">
          <SpacesPage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
