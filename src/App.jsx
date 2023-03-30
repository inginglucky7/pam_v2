import { useState, ReactDOM } from 'react'
import './App.css'
import Testcomp from "./comps/testcomp.jsx";
import LoginPage from "./comps/LoginPage.jsx"
import RegisterPage from "./comps/RegisterPage.jsx"
import HowToPlayPage from "./comps/HowToPlayPage.jsx"
import SettingsPage from "./comps/SettingsPage.jsx"
import ProfilePage from "./comps/Profile.jsx"
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<LoginPage />}>
                <Route index path="/registerpage" element={<RegisterPage/>}/>
                <Route path="/howtoplaypage" element={<HowToPlayPage/>}/>
                <Route path="/settingspage" element={<SettingsPage/>}/>
                <Route path="/profilepage" element={<ProfilePage/>}/>
            </Route>
        )
    )

  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  )
}

export default App
