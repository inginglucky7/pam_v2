import { useState, ReactDOM } from 'react'
import './App.css'
import {RootLayout, ErrorPage, HowToPlayPage, LoginPage, Profile, RegisterPage, SettingsPage, GamePage, MainMenuPage} from './layouts';
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import {AuthProvider} from "./contexts/AuthContext.jsx";

const App = () =>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path = '/' errorElement={<ErrorPage/>} element={<RootLayout />}>
                <Route index element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/tutorial" element={<HowToPlayPage/>}/>
                <Route path="/setting" element={<SettingsPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/game" element={<GamePage/>}/>
                <Route path="/mainmenu" element={<MainMenuPage/>}/>
            </Route>
        )
    )

    return(
        <div className="App">
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </div>
    );
};

export default App
