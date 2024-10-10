import {Routes, Route} from 'react-router-dom'
// Components
import App from './App'
import Login from './Login';
import Home from './Home';
import About from './About';

// Styles
import './styles.css'


function MainApp(){
    return(
        <div>
            <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/app' element={<App/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </div>
    )
}

export default MainApp;