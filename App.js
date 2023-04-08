import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Courses from './components/Courses';
import Footer from './components/Footer';
import Login from './components/AUTH/Login';
import Signup from './components/AUTH/Signup';
import ForgotPassword from './components/AUTH/ForgotPassword';
import ResetPassword from './components/AUTH/ResetPassword';
import Contact from './components/Contact';
import REquestAcourse from './components/REquestAcourse';
import About from './components/About';
import Subscribe from './components/Payment/Subscribe';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentFail from './components/Payment/PaymentFail';
import PAgeNotFound from './components/Payment/PAgeNotFound';
import CoursePage from '../src/components/Course/CoursePage';
import Profile from './components/profile/Profile';
import Changepassword from './components/profile/Changepassword';
import UpdateProfile from './components/profile/UpdateProfile';
import Dashboard from './components/Admit/Dashboard/Dashboard';
import Users from './components/Admit/Dashboard/Users';
import Admincourses from './components/Admit/Dashboard/Admincourses';
import Createcourses from './components/Admit/Dashboard/Createcourses';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { getMyprofile } from './components/redux/actions/user';
import Layout from './components/Layout/Layout';


function App() {
  //disable right click in any page
  // window.addEventListener("contextmenu",(e)=>{
  // e.preventDefault();
  // })
  const { isAutheticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  //for login
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  //for getmyprofile
  useEffect(() => {
    dispatch(getMyprofile());
  }, [dispatch]);

  return (

    <Router>
      {
        loading ? (<Layout />) : (
          <>
            <Header isAutheticated={isAutheticated} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={isAutheticated?<CoursePage user={user} />:<Navigate to={"/login"}/>} />
              <Route path="/signup" element={!isAutheticated ? <Signup /> : <Navigate to="/profile" />} />
              <Route path="/profile" element={
                (
                  isAutheticated ? <Profile user={user} /> : <Navigate to="/login" />
                )
              } />
              <Route path="/login" element={!isAutheticated ? <Login /> : <Navigate to="/profile" />} />
              <Route path="/changepassword" element={isAutheticated ? <Changepassword /> : <Navigate to="/login" />} />
              <Route path="/updateprofile" element={isAutheticated ? <UpdateProfile user={user}/> : <Navigate to="/login" />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forgotpassword" element={!isAutheticated ?<ForgotPassword />:<Navigate to="/login"/>} />
              <Route path="/resetpassword/:token" element={!isAutheticated?<ResetPassword />:<Navigate to="/login"/>} />
              <Route path="/request" element={<REquestAcourse />} />
              <Route path="/about" element={<About />} />
              <Route path="/subscribe" element={isAutheticated ? <Subscribe user={user} /> : <Navigate to="/login" />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/paymentfail" element={<PaymentFail />} />
              <Route path="/paymentfail" element={<PaymentFail />} />
              <Route path="/*" element={<PAgeNotFound />} />

              {/* //admin Route */}
              <Route path="/admin/dashboard" element={isAutheticated  && user && user.role === "admin" ? (<Dashboard />) : <Navigate to="/profile" />} />
              <Route path="/admin/users" element={isAutheticated && user && user.role === "admin" ? (<Users />) : <Navigate to="/profile" />} />
              <Route path="/admin/courses" element={isAutheticated && user && user.role === "admin" ? (<Admincourses />) : <Navigate to="/profile" />} />
              <Route path="/admin/createcourse" element={isAutheticated  && user && user.role === "admin" ? (<Createcourses />) : <Navigate to="/profile" />} />
            </Routes>
            <Footer />
            <Toaster />
          </>
        )
      }
    </Router>

  );
}

export default App;
