import React, { FC } from 'react'
import { withRouter } from 'react-router'
import { DefaultLayout } from 'Layout'

type Props = {
  history: any
}

const Login: FC<Props> = ({ history = {} }) => {
  console.log('history', history);
  
  return (
    <DefaultLayout>
      <div className="login">Login</div>
    </DefaultLayout>
  )
}

export default withRouter(Login)
