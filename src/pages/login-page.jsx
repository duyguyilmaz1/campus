import React from 'react'
import LoginForm from '../components/login/login-form'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'

const LoginPage = () => {
  return (
    <>
    <PageHeader title="Login"/>
    <Spacer/>
    <LoginForm/>
    <Spacer/>
    </>
  )
}

export default LoginPage
