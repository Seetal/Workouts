import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App'
import IntervalsPage from './pages/IntervalsPage'
import WorkoutsPage from './pages/WorkoutsPage/WorkoutsPage'
import NewInterval from './pages/NewInterval/NewInterval'
import Workout from './pages/Workout/Workout'
import WorkoutSummary from './pages/WorkoutSummary/WorkoutSummary'
import { IntervalsContextProvider } from './context/IntervalsContext'
import { ModalContextProvider } from './components/Generic/Modal/ModalContext'
import IntervalWorkout from './pages/IntervalWorkout/IntervalWorkout'
import { WorkoutsContextProvider } from './context/WorkoutsContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="intervals" replace /> 
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
        path: "intervals/:id",
        element: <IntervalWorkout />
      },
      {
        path: "workouts",
        element: <WorkoutsPage />,
      },
      {
        path: "workouts/workout",
        element: <Workout />
      },
      {
        path: "workouts/workoutSummary/:id",
        element: <WorkoutSummary />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <IntervalsContextProvider>
        <ModalContextProvider>
          <RouterProvider router={router} />
        </ModalContextProvider>
      </IntervalsContextProvider>
    </WorkoutsContextProvider>
  </React.StrictMode>,
)