import {
  Route,
  Routes,
} from "react-router-dom";
import { FunctionComponent } from "react";
//
import { useAuth } from "@/contexts/AuthContexts";
import Layout from "@/components/ui/layout";
import AuthRequired from "@/components/commons/Auth/AuthRequired";
import AuthNotRequired from "@/components/commons/Auth/AuthNotRequired";
//
import LoginPage from "@/pages/auth/login";
import SingUpPage from "@/pages/auth/signup";
import DashboardPage from "@/pages/dashboard";
import SubmissionFormPage from "@/pages/submission/Submission";
import SubmissionPage from "@/pages/submission";

const App: FunctionComponent = () => {

  const { userData, logout } = useAuth();

  return (<Routes >
    <Route element={<Layout logout={logout} fullHeight hiddenHeader />}>
      <Route index element={
        <AuthNotRequired>
          <LoginPage />
        </AuthNotRequired>
      } />
      <Route path="signup" element={
        <AuthNotRequired>
          <SingUpPage />
        </AuthNotRequired>
      } />
    </Route>

    <Route element={<Layout logout={logout} userData={userData} />}>
      <Route path="/dashboard" element={
        <AuthRequired>
          <DashboardPage />
        </AuthRequired>
      } />
      <Route path="/submissions" element={
        <AuthRequired>
          <SubmissionPage />
        </AuthRequired>
      } />
      <Route path="/submission/:id" >
        <Route path="/submission/:id/form" element={
          <AuthRequired>
            <SubmissionFormPage />
          </AuthRequired>
        } />
        <Route path="/submission/:id/form/:idSubmission" element={
          <AuthRequired>
            <SubmissionFormPage />
          </AuthRequired>
        } />
      </Route>
    </Route>
  </Routes >)
}


export default App;