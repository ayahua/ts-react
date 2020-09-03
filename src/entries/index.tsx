import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import Router from '@/router'
// import store from '@/store'
// import history from '@/router/history'
import App from '@/components/App'
import Home from '@/containers/home'
import Result from '@/containers/result'

import style from './index.less'
// import testImage from '@/assets/icon_task.png'

function render () {
  return ReactDOM.render(
    // <App>
    //   <section className={style.section}>
    //     Hellp
    //     <img src={testImage} />
    //   </section>
    // </App>,
    <App>
      <section className={style.section}>hello typescript react !!!</section>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/result" component={Result} />
        </Switch>
      </Router>
    </App>,
    document.getElementById('react-root'),
  )
}

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history} />
//   </Provider>,
//   document.getElementById('react-root'),
// )

render()

// function createElement(){
//   const ele = document.createElement('div')
//   ele.innerHTML = 'hello typescript react'
//   const root = document.getElementById('react-root')
//   root && root.appendChild(ele)
// }

// createElement()
