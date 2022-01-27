import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home'

export default function App() {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
}