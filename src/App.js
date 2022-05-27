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
import AllShiftsToday from './components/allShiftsToday';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuAppBar from './components/MapContainer'
import ShiftForInspector from './components/ShiftForInspector';
// import DeleteShift from './components/DeleteShift';

function App() {
  
let theme = createTheme();
theme = createTheme(theme, {
  
  palette: {
    primary: {
      main: "#6a1b9a",
      light: "#8e24aa",
      dark: "#ce93d8",
    },
  },
});
  return (<>
    <div className="App">
    <ThemeProvider theme={theme}>
    <ResponsiveAppBar />
    {/* <MenuAppBar/> */}
    
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
      <Route path='/ShiftForInspector' element={<ShiftForInspector/>}/>
      <Route path='/allshiftsToay' element={<AllShiftsToday/>}/>
      <Route path='*' element={<Home/>}/>




    </Routes>
    </ThemeProvider>
    </div>
    </>
  );
}
export default App;
