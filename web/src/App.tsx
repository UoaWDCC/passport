// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Passport from "@pages/Passport"
import SignInPage from './pages/SignInPage';
import SignInErrorPage from "./pages/SignInErrorPage";
import AdminLogin from "./pages/Admin-Login";
import Form from "@pages/Form";
import PrivacyPolicy from "@pages/privacy-policy";
import QRErrorPage from "@pages/QrErrorPage";
import MeetTheTeam from "@pages/MeetTheTeam"
import { HomePage } from "@pages/Landing-Page"
import Leaderboard from "@pages/Leaderboard"
import LeaderboardPrize from "@pages/LeaderboardCongratsPage"
import DashboardPrizes from "@pages/DashboardPrizes"
import Events from "@pages/Events"

const router = createBrowserRouter([
  {
    //landing page
    path: "/",
    element: <HomePage />
  },

  {
    //landing page with qr code
    path: "/:id",
    element: <HomePage />
  },
  {
    path: "/sign-in",
    element: <SignInPage />
  },
  {
    path: "/sign-in/:id", //using this to testing qr code functionality
    element: <SignInPage />
  },
  {
    path: "/passport",
    element: <Passport />,
  },
  {
    path: "/sign-in-error",
    element: <SignInErrorPage />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/leaderboard-prize",
    element: <LeaderboardPrize />,
  },
  {
    path: "/dashboard",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard/prizes",
    element: <DashboardPrizes />,
  },
  {
    path: "/dashboard/events",
    element: <Events />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
{
  path: "/qr-error/:eventId?",
  element: <QRErrorPage />,
},
{
  path: "/team",
  element: <MeetTheTeam />,
}
]);

export default function App() {
    return (
        <div>
            <RouterProvider router={router} />;
        </div>
    );
}
