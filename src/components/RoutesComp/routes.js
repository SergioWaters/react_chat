import { ProfilePage, ChatPage, GistsList, AxiosGists, LoginPage, SignupPage, HomePage } from "../../pages";
import { PrivateRoute, PublicRoute } from "../../hoc/RoutesHOC/routesHoc";
import { Routes, Route } from "react-router-dom";
import { FirstComp } from "../FirstComp";

export const RoutesComp = ({ isAuth }) => {
  return (
    <Routes>
      <Route
        exact path="/gists"
        element={
          <GistsList />
        } />
      <Route
        exact path="/axios"
        element={
          <AxiosGists />
        } />
      <Route
        path="/chat/*"
        element={
          <PrivateRoute isAuth={isAuth}>
            <ChatPage />
          </PrivateRoute>
        } />
      <Route
        exact path="/login"
        element={
          <PublicRoute isAuth={isAuth}>
            <LoginPage />
          </PublicRoute>
        } />
      <Route
        exact path="/signup"
        element={
          <PublicRoute isAuth={isAuth}>
            <SignupPage />
          </PublicRoute>
        } />
      <Route
        exact path="/profile"
        element={
          <PrivateRoute isAuth={isAuth}>
            <ProfilePage />
          </PrivateRoute>
        } />
      <Route
        exact path="/"
        element={
          <HomePage isAuth={isAuth} />
        } />
      <Route
        path="*"
        element={
          <FirstComp name={'This Page does not exist'} />
        } />
    </Routes>
  )
}