import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Homepage from './pages/Homepage'
import IntervalsPage from './pages/IntervalsPage'
import WorkoutsPage from './pages/WorkoutsPage'
import StatsPage from './pages/StatsPage'
import NewWorkout from './pages/NewWorkout'
import NewInterval from './pages/NewInterval/NewInterval'
import { IntervalsContextProvider } from './context/IntervalsContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "intervals",
        element: <IntervalsPage />
      },
      {
        path: "intervals/new",
        element: <NewInterval />
      },
      {
        path: "workouts",
        element: <WorkoutsPage />,
      },
      {
        path: "workouts/new",
        element: <NewWorkout />
      },
      {
        path: "stats",
        element: <StatsPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntervalsContextProvider>
      <RouterProvider router={router} />
    </IntervalsContextProvider>
  </React.StrictMode>,
)