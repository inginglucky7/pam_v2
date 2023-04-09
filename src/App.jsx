import { useState, ReactDOM } from 'react'
import './App.css'
import {RootLayout, ErrorPage, LoginPage, RegisterPage, MainMenuPage, Profile, Leaderboard, SettingsPage, HowToPlayPage, LobbyPage, GamePage, ReviewYourAnswer} from './layouts';
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import {AuthProvider} from "./contexts/AuthContext.jsx";

const App = () =>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path = '/' errorElement={<ErrorPage />} element={<RootLayout />}>
                <Route index element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/mainmenu" element={<MainMenuPage />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/leaderboard" element={<Leaderboard />}/>
                <Route path="/tutorial" element={<HowToPlayPage />}/>
                <Route path="/setting" element={<SettingsPage />}/>
                <Route path="/lobby" element={<LobbyPage />}/>
                <Route path="/game" element={<GamePage />}/>
                <Route path="/review" element={<ReviewYourAnswer />}/>
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
