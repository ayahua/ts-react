import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { testReq } from '@/apis'

interface HomeProps {
  data?: number
}

const Home: React.FC<HomeProps> = () => {
  const history = useHistory()

  useEffect(() => {
    testReq({
      data: 123
    })
  }, [])

  function handleResult () {
    history.push('/result')
  }

  return (
    <section>
      React Home
      <button onClick={handleResult}>go result</button>
    </section>
  )
}

export default Home
