import "./styles/App.scss";
import { Container } from "react-bootstrap";

/* For page routing */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import RegistrarRoute from "./components/Routes/RegistrarRoute";

import NavBar from "./components/NavBar";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About";
import Classes from "./components/pages/Classes";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import ApplyPage from "./components/pages/ApplyPage";
import CreateUserForm from "./components/RegisterView/Applications/CreateUserForm";
import CreateCourseForm from "./components/RegisterView/CreateCourseForm";
import ApplicationsPage from "./components/RegisterView/Applications/ApplicationsPage";
import Applicant from "./components/RegisterView/Applications/Applicant";
import RegistrarMangementPage from "./components/RegisterView/Mangement/RegistrarManagementPage";
import NotFound from "./components/pages/NotFound";
import ManageTaboo from "./components/RegisterView/Taboo/ManageTaboo";
import SemesterManagement from "./components/RegisterView/Mangement/SemesterManagement";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/classes" component={Classes} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={Logout} />

        {/* Not logged in users only*/}
        <PublicRoute path="/apply">
          <ApplyPage />
        </PublicRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>

        {/* Logged in users only */}

        {/* Registrar users only */}
        <RegistrarRoute path="/registrar">
          <RegistrarMangementPage />
        </RegistrarRoute>
        <RegistrarRoute path="/create/user">
          <CreateUserForm />
        </RegistrarRoute>
        <RegistrarRoute path="/create/course">
          <CreateCourseForm />
        </RegistrarRoute>
        <RegistrarRoute exact path="/applications">
          <ApplicationsPage />
        </RegistrarRoute>
        <RegistrarRoute path="/applications/:id">
          <Applicant />
        </RegistrarRoute>
        <RegistrarRoute path="/taboo">
          <ManageTaboo />
        </RegistrarRoute>
        <RegistrarRoute path="/semester">
          <SemesterManagement />
        </RegistrarRoute>

        {/* Page not found */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
