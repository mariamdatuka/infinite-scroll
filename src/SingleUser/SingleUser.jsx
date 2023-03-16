import React from 'react'
import {Wrapper, Info, Background} from './Styles'

const SingleUser = ({user}) => {
  return (
    <>
     <Wrapper>
        <Background>
            <span>blablabla</span>
        </Background>
        <Info>
            <h3><span>{user?.prefix}</span>{user?.name} {user?.lastName}</h3>
            <p>{user?.title}</p>
        </Info>
     </Wrapper>
    </>
  )
}

export default SingleUser


