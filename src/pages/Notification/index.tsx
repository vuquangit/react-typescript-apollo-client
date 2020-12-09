import React, { FC, useEffect } from 'react'
import usePushNotifications from '@/notifications/usePushNotifications'

import { DefaultLayout } from '@/layouts'
import Container from '@/components/Container'

type LoadingProps = {
  loading: any
}

type ErrorProps = {
  error: any
}

const App: FC = () => {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications()

  const Loading: FC<LoadingProps> = ({ loading }) =>
    loading ? (
      <div className="app-loader">Please wait, we are loading something...</div>
    ) : null

  const Error: FC<ErrorProps> = ({ error }) =>
    error ? (
      <section className="app-error">
        <h2>{error.name}</h2>
        <p>Error message : {error.message}</p>
        <p>Error code : {error.code}</p>
      </section>
    ) : null

  const isConsentGranted = userConsent === 'granted'

  useEffect(() => {
    if (pushNotificationSupported && !isConsentGranted)
      onClickAskUserPermission()
  }, [isConsentGranted, onClickAskUserPermission, pushNotificationSupported])

  return (
    <DefaultLayout>
      <Container>
        <div className="App">
          <header className="App-header">
            <Loading loading={loading} />

            <p>
              Push notification are {!pushNotificationSupported && 'NOT'}{' '}
              supported by your device.
            </p>

            <p>
              User consent to recevie push notificaitons is{' '}
              <strong>{userConsent}</strong>.
            </p>

            <Error error={error} />

            <button
              disabled={!pushNotificationSupported || isConsentGranted}
              onClick={onClickAskUserPermission}
            >
              {isConsentGranted ? 'Consent granted' : ' Ask user permission'}
            </button>

            <button
              // disabled={
              //   !pushNotificationSupported || !isConsentGranted || userSubscription
              // }
              onClick={onClickSusbribeToPushNotification}
            >
              {userSubscription
                ? 'Push subscription created'
                : 'Create Notification subscription'}
            </button>

            <button
              disabled={!userSubscription || pushServerSubscriptionId}
              onClick={onClickSendSubscriptionToPushServer}
            >
              {pushServerSubscriptionId
                ? 'Subscrption sent to the server'
                : 'Send subscription to push server'}
            </button>

            {pushServerSubscriptionId && (
              <div>
                <p>The server accepted the push subscrption!</p>
                <button onClick={onClickSendNotification}>
                  Send a notification
                </button>
              </div>
            )}
          </header>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default App
