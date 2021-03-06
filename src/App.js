import React, {Suspense, useContext} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import {AuthContext} from './context/auth-context'
import './tailwind.css'

import LoadingSpinner from './components/UI/LoadingSpinner'
const LandingPage = React.lazy(() => import('./containers/Landing/LandingPage'))
const LoginPage = React.lazy(() => import('./containers/Auth/LoginPage'))
const RegisterPage = React.lazy(() => import('./containers/Auth/RegisterPage'))
const ResetPass = React.lazy(() => import('./containers/Auth/ResetPass'))
const NewPassword = React.lazy(() => import('./containers/Auth/NewPassword'))

const InputAlokasi = React.lazy(() => import('./containers/Dashboard/Donatur/InputAlokasi'))
const TambahBarang = React.lazy(() => import('./containers/Dashboard/Admin/TambahBarang'))
const AlokasiBantuan = React.lazy(() => import('./containers/Dashboard/Donatur/AlokasiBantuan'))

const InputKebutuhan = React.lazy(() => import('./containers/Dashboard/Applicant/InputKebutuhan'))
const RiwayatPermohonan = React.lazy(() => import('./containers/Dashboard/Applicant/RiwayatPermohonan'))
const UpdateKebutuhan = React.lazy(() => import('./containers/Dashboard/Applicant/UpdateKebutuhan'))

const DonasiSaya = React.lazy(() => import('./containers/Dashboard/Donatur/DonasiSaya'))
const InputBantuan = React.lazy(() => import('./containers/Dashboard/Donatur/InputBantuan'))
const UpdateDonasi = React.lazy(() => import('./containers/Dashboard/Donatur/UpdateDonasi'))

const App = () => {
  const auth = useContext(AuthContext)

  let routes = (
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/daftar" component={RegisterPage} exact />
      <Route path="/reset-password" component={ResetPass} exact />
      <Route path="/confirm/:confirmId" component={NewPassword} exact />
      <Redirect to='/' />
    </Switch>
  )

  if(auth.role === 'DONATOR'){
    routes = (
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard/donasi-saya" component={DonasiSaya} exact />
        <Route path="/dashboard/input-bantuan" component={InputBantuan} exact />
        <Route path="/dashboard/update-donasi/:donationId" component={UpdateDonasi} exact />
        <Route path="/dashboard/alokasi-bantuan" component={AlokasiBantuan} exact />
        <Route path="/dashboard/alokasi/:requestId" component={InputAlokasi} exact />
        <Redirect to='/' />
      </Switch>
    )
  }
  else if(auth.role === 'APPLICANT'){
    routes = (
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard/input-kebutuhan" component={InputKebutuhan} exact />
        <Route path="/dashboard/riwayat-kebutuhan" component={RiwayatPermohonan} exact />
        <Route path="/dashboard/update-kebutuhan/:requestId" component={UpdateKebutuhan} exact />
        <Redirect to='/' />
      </Switch>
    )
  }
  else if(auth.role === 'ADMIN'){
    routes = (
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard/tambah-barang" component={TambahBarang} exact />
        <Redirect to='/' />
      </Switch>
    )
  }

  return(
      <BrowserRouter>
        <div className="bg-gray-100 w-full h-full min-h-screen lg:relative">
          <Suspense fallback={<LoadingSpinner style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}>{routes}</Suspense>
        </div>
      </BrowserRouter>
  )
}

export default App

// admin user buat test
// email: admin@admin.com
// pass: admin-supply-demand-covid19

// donatur buat test
// email: donatur@donatur.com
// pass: donatur-supply-demand-covid19

// email: donatur2@donatur.com
// pass: donatur-supply-demand-covid19

// email: donatur3@donatur.com
// pass: donatur-supply-demand-covid19

// email: applicant@applicant.com
// pass: applicant-supply-demand-covid19