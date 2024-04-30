import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/Signup";
import ForgotPassword from "./pages/user/ForgetPassword";
import VerifyOTP from "./pages/user/verifyOTP";
import ResetPassword from "./pages/user/ResetPassword";
import VerifyEmail from "./pages/user/VerifyEmail";
import ProviderLogin from "./pages/provider/ProviderLogin";
import ProviderSignUp from "./pages/provider/ProviderSignUp";
import ProviderForgetPassword from "./pages/provider/ProviderForgetPassword";
import ProviderVerifyOTP from "./pages/provider/ProviderVerifyOTP";
import ProviderResetPassword from "./pages/provider/ProviderResetPassword";
import ProviderVerifyEmail from "./pages/provider/ProviderVerifyEmail";
import ProviderProfile from "./pages/provider/ProviderProfile";
import ProviderItems from "./pages/provider/ProviderItems";
import ProviderBusiness from "./pages/provider/ProviderBusiness";
import AboutUs from "./pages/user/AboutUs";
import FAQPage from "./pages/user/FAQpage";
import UserProfile from "./pages/user/userProfile";
import ContactUs from "./pages/user/ContactUs";
import EditProfile from "./pages/user/EditProfile";
import Dashboard from "./pages/user/Dashboard";
import Favourites from "./pages/user/MyFavourite"
import PropertyDetail from "./pages/user/PropertyDetail";
import {
  PrivateProviderRoutes,
  PrivateUserRoutes,
} from "./routes/PrivateRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import CommunityBoard from "./pages/user/CommunityBoard";
import PropertySearch from "./pages/user/PropertySearch";
import MyFavourite from "./pages/user/MyFavourite";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/provider-login" element={<ProviderLogin />} />
          <Route path="/provider-signup" element={<ProviderSignUp />} />
          <Route
            path="/provider-forget-password"
            element={<ProviderForgetPassword />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp/" element={<VerifyOTP />} />
          <Route path="/verify-email/" element={<VerifyEmail />} />
          <Route path="/reset-password/" element={<ResetPassword />} />
          <Route path="/provider-verify-otp" element={<ProviderVerifyOTP />} />
          <Route
            path="/provider-verify-email"
            element={<ProviderVerifyEmail />}
          />
          <Route
            path="/provider-reset-password"
            element={<ProviderResetPassword />}
          />
        </Route>
        <Route element={<PrivateProviderRoutes />}>
          <Route path="/provider-profile" element={<ProviderProfile />} />
          <Route path="/provider-listing" element={<ProviderItems />} />
          <Route path="/provider-business" element={<ProviderBusiness />} />
        </Route>
        <Route element={<PrivateUserRoutes />}>
          <Route path="/property-detail/:id" element={<PropertyDetail />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/community" element={<CommunityBoard />} />
          <Route path = '/favourites' element= {<Favourites/>}/>
          <Route path="/property-favourite" element={<MyFavourite />} />
        </Route>
          <Route path="/property-search" element={<PropertySearch />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
