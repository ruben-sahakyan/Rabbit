import './App.css';
import Layout from './components/Layout/Layout.js';
import { Route, Routes } from 'react-router-dom';
import PostsWall from './components/PostsWall/PostsWall.js';
import { UserProvider, AddPostModalWindowStateProvider } from './components/UseContext';
import SignUp from './components/SignUp/SignUp';
import SignIn from "./components/SignIn/SignIn";
import PersonalPage from './components/PersonalPage/PersonalPage';

function App() {
  return (
    < UserProvider >
    < AddPostModalWindowStateProvider >
      <Routes>
        <Route path='/' element={ < Layout /> }>
          <Route index element={ < PostsWall /> }/>
          <Route path='/signup' element={ < SignUp /> }/>
          <Route path='/signin' element={ < SignIn /> }/>
          <Route path='/personalpage/:id' element={ < PersonalPage /> }/>
        </Route>
      </Routes>
    </AddPostModalWindowStateProvider>
    </UserProvider>
  );
}

export default App;
