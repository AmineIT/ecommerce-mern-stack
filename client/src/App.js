import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './utils/PrivateRoutes'
import ProfilePage from './pages/ProfilePage'
import CreateProduct from './pages/CreateProduct'
import Product from './pages/Product'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/product/:id' exact component={Product} />
        <PrivateRoute path='/cart' exact component={CartPage} />
        <PrivateRoute path='/profile' exact component={ProfilePage} />
        <PrivateRoute path='/product/create' exact component={CreateProduct} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/register' exact component={RegisterPage} />
      </Switch>
    </Router>
  )
}

export default App
