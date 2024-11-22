import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/pages/Home.js';
import Contact from './components/pages/Contact.js';
import Company from './components/pages/Company.js';
import NewProject from './components/pages/NewProject.js';
import Projects from "./components/pages/Projects.js";
import Project from "./components/pages/Project.js";

import Container from "./components/layout/Container.js";
import NavBar from "./components/layout/NavBar.js";
import Footer from "./components/layout/Footer.js";

export default function Rotas(){
    return(
        <BrowserRouter>
            <NavBar/>
            <Container customClass="min-height">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/company" element={<Company/>}/>
                    <Route path="/newproject" element={<NewProject/>}/>
                    <Route path="/project/:id" element={<Project/>}/>
                </Routes>
            </Container>
            <Footer/>
        </BrowserRouter>
    );
}
