import React, { FC } from 'react'

import { DefaultLayout } from 'layouts'
import Container from 'components/Container'

const Signup: FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <div className="signup">Signup</div>
      </Container>
    </DefaultLayout>
  )
}

export default Signup
