import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import ResponsiveAppBar from './components/NavBar';
import Employee from './components/Employee';
import Administrator from './components/Administrator';
import AddShift from './components/AddShift';
import AddInspector from './components/AddInspector';
import DeleteInspector from './components/DeleteInspector';
import AllShifts from './components/AllShifts';
import Shift from './components/Shift';
// import DeleteShift from './components/DeleteShift';

function App() {
  
  return (<>
    <div className="App">
    <ResponsiveAppBar />
    </div>
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signIn' element={<SignIn/>}/>     
      <Route path='/employee' element={<Employee/>}/>
      <Route path='/administator' element={<Administrator/>}/>
      <Route path='/addShift' element={<AddShift/>}/>
      {/* <Route path='/deleteShift' element={<DeleteShift/>}/> */}
      <Route path='/addInspactor' element={<AddInspector/>}/>
      <Route path='/deleteInspector' element={<DeleteInspector/>}/>
      <Route path='/allshifts' element={<AllShifts/>}/>
      <Route path=':id' element={<Shift/>}/>
      <Route path='*' element={<Home/>}/>




    </Routes>
    </>
  );
}
export default App;
