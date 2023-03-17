import React from 'react'
import {Wrapper, Info, ImgBox} from './Styles'


const SingleUser = ({user}) => {
  return (
    <>
     <Wrapper>
        <ImgBox>
            <img src={`${user.imageUrl}?v=${user.id}`} alt="img" />
        </ImgBox>
        <Info>
            <h3>{user?.prefix} {user?.name} {user?.lastName}</h3>
            <p>{user?.title}</p>
        </Info>
     </Wrapper>
    </>
  )
}

export default SingleUser


