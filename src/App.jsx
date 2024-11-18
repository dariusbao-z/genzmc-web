import React, { Suspense } from 'react';
import './App.css';
import Header from './sections/Header';
import Footer from './sections/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from './components/Home';
// import NotFound from './components/NotFound';
// import Rules from './components/Rules';
// import Charge from './components/Charge';
// import Download from './components/Download';
// import Support from './components/Support';

const Home = React.lazy(() => import('./components/Home'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const Rules = React.lazy(() => import('./components/Rules'));
const Charge = React.lazy(() => import('./components/Charge'));
const Download = React.lazy(() => import('./components/Download'));

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
          <main>
            <Routes>
              <Route exact path='/' element={
                <Suspense fallback={<>...</>}>
                  <Home />
                </Suspense>
              } />
              <Route exact path='/join' element={
                <Suspense fallback={<>...</>}>
                  <Home />
                </Suspense>
              } />
              <Route exact path='/rules' element={
                <Suspense fallback={<>...</>}>
                  <Rules />
                </Suspense>
              } />
              <Route exact path='/napthe' element={
                <Suspense fallback={<>...</>}>
                  <Charge />
                </Suspense>
              } />
              <Route exact path='/charge' element={
                <Suspense fallback={<>...</>}>
                  <Charge />
                </Suspense>
              } />
              <Route exact path='/download' element={
                <Suspense fallback={<>...</>}>
                  <Download />
                </Suspense>
              } />
              <Route path='*' element={
                <Suspense fallback={<>...</>}>
                  <NotFound />
                  
                </Suspense>
              } />
            </Routes>
          </main>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
