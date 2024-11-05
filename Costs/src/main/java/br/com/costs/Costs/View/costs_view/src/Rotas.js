import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/pages/Home.js';
import Contact from './components/pages/Contact.js';
import Company from './components/pages/Company.js';
import NewProject from './components/pages/NewProject.js';

import Container from "./components/layout/Container.js";

export default function Rotas(){
    return(
        <BrowserRouter>
            <p>Header</p>    
            <Container customClass="min-height">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/contact" element={<Contact/>}/>
                    <Route exact path="/company" element={<Company/>}/>
                    <Route exact path="/newproject" element={<NewProject/>}/>
                </Routes>
            </Container>
            <p>Footer</p>
        </BrowserRouter>
    );
}
