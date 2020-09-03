import React from 'react'

import './index.less'

interface AppProps {
  children?: React.ReactNode
}

const App: React.SFC<AppProps> = (props: AppProps) => {
  const { children } = props
  return <>{children}</>
}

App.defaultProps = {}

export default App
