import React, { FC } from 'react'
import { withRouter } from 'react-router'

import { DefaultLayout } from 'layouts'
import Container from 'components/Container'

type Props = {
  history: any
}

const Login: FC<Props> = ({ history = {} }) => {
  console.log('history', history)

  return (
    <DefaultLayout>
      <Container>
        <div className="login">Login</div>
      </Container>
    </DefaultLayout>
  )
}

export default withRouter(Login)
