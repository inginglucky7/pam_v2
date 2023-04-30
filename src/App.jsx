import './App.css'
import {RootLayout, ErrorPage, LoginPage, RegisterPage, MainMenuPage, Profile, Leaderboard, SettingsPage, HowToPlayPage, LobbyPage, BrowseGamePage, GamePage, ReviewYourAnswer, GameWithPlayer} from './layouts';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import {AuthProvider} from "./contexts/AuthContext.jsx";
import Protected from "./components/Protected.jsx";

const App = () =>{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path = '/' element={<RootLayout />}>
                <Route index element={<LoginPage />}/>
                <Route path="register" element={<RegisterPage />}/>
                <Route path="mainmenu" element={<Protected><MainMenuPage/></Protected>}/>
                <Route path="profile" element={<Profile />}/>
                <Route path="leaderboard" element={<Leaderboard />}/>
                <Route path="tutorial" element={<HowToPlayPage />}/>
                <Route path="setting" element={<SettingsPage />}/>
                <Route path="lobby" element={<LobbyPage />}/>
                <Route path="browsegame" element={<BrowseGamePage/>}/>
                <Route path="game" element={<GamePage />}/>
                <Route path="/:roomId/*" element={<GameWithPlayer />}/>
                <Route path="review" element={<ReviewYourAnswer />}/>
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
