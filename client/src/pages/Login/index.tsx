import React, { FC } from 'react'
import { withRouter } from 'react-router'

import { DefaultLayout } from '@/layouts'
import Container from '@/components/Container'
import Button from '@/components/Button'
// import { isLoggedInVar } from '@/cache'

type Props = {
  history: any
}

const Login: FC<Props> = ({ history = {} }) => {
  console.log('history', history)

  const onCompleted = () => {
    const user = {
      id: '0001',
      token: '123',
    }

    localStorage.setItem('token', user.token as string)
    localStorage.setItem('userId', user.id as string)
    // isLoggedInVar(true)
  }

  return (
    <DefaultLayout>
      <Container>
        <div>
          <Button onClick={onCompleted}>Click to login</Button>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default withRouter(Login)
