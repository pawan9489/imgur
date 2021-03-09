import AppNav from "./components/AppNav";
import { Switch, Route } from "react-router-dom";
import LoginForm from './pages/LoginForm';
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";

function App() {
  return (
    <div>
      <AppNav title="Imgur"/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
