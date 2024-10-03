import React from 'react'
import PageHeader from '../../components/common/page-header'
import Error404 from "../../components/errors/error404"
import Spacer from '../../components/common/spacer'

const Error404Page = () => {
  return (
    <>
      <PageHeader title="Not Found"/>
      <Spacer/>
      <Error404/>
      <Spacer/>
    </>
  )
}

export default Error404Page
