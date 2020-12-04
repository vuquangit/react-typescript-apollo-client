import React, { FC, useEffect } from 'react'
import { withRouter } from 'react-router'
import { useQuery } from '@apollo/client'

import { BaseLoginProps } from './Login.types'
import { DefaultLayout } from '@/layouts'
import Container from '@/components/Container'
import Button from '@/components/Button'
import { isLoggedInVar } from '@/graphql/config/apollo-local-cache'
import { IS_LOGGED_IN } from '@/graphql/queries/isUserLoggedIn'
import { LoginWrapper } from './Login.styled'

const Login: FC<BaseLoginProps> = ({ history }) => {
  const handleLogin = () => {
    const user = {
      id: '0001',
      token: '123',
    }

    localStorage.setItem('token', user.token as string)
    localStorage.setItem('userId', user.id as string)
    isLoggedInVar(true)
  }

  // go homepage
  const { data } = useQuery(IS_LOGGED_IN)
  const isAuthenticated = data.isLoggedIn
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated])

  return (
    <DefaultLayout>
      <Container>
        <LoginWrapper>
          <Button
            mt="32px"
            cursor="pointer"
            variant="large"
            onClick={handleLogin}
          >
            Click to login
          </Button>
        </LoginWrapper>
      </Container>
    </DefaultLayout>
  )
}

export default withRouter(Login)
