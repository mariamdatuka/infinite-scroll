import React from 'react'
import {ImgBox,InfoBox,Box,Wrapper} from './Styles'

const UserDetails = ({userData}) => {
  return (
  <>
    <Wrapper>
      <ImgBox>
         <img src={`${userData.imageUrl}?v=${userData.id}`} alt="img" />
      </ImgBox>
    <fieldset style={{width:'650px'}}>
      <legend>info</legend>
      <InfoBox>
        <div>
            <h3>{userData.prefix} {userData.name} {userData.lastName}</h3>
            <p>{userData.title}</p>
        </div>
        <div> 
          <Box>
            <p>Email:</p>
            <span>{userData.email}</span>
          </Box>
         <Box>
            <p>IP Adress:</p>
            <span>{userData.ip}</span>
          </Box>
         <Box>
            <p>IP Adress:</p>
            <span>{userData.ip}</span>
          </Box>
         <Box>
            <p>Job Area:</p>
            <span>{userData.jobArea}</span>
         </Box>
         <Box>
            <p>Job Type:</p>
            <span>{userData.jobType}</span>
         </Box>
        </div>
      </InfoBox>
    </fieldset>  
    <fieldset style={{width:'200px'}}>
        <legend>Address</legend>
        <div>
            <h4>{userData.company?.name} {userData.company?.suffix}</h4>
            <InfoBox>
              <div>
                <Box>
                    <p>City:</p>
                    <span>{userData.address?.city}</span>
                </Box>
                <Box>
                    <p>Country:</p>
                    <span>{userData.address?.country}</span>
                </Box>
                <Box>
                    <p>State:</p>
                    <span>{userData.address?.state}</span>
                </Box>
                <Box>
                    <p>StreetAdress:</p>
                    <span>{userData.address?.streetAddress}</span>
                </Box>
                <Box>
                    <p>ZIP:</p>
                    <span>{userData.address?.zipCode}</span>
                </Box>
              </div>
            </InfoBox>
        </div>
    </fieldset>
  </Wrapper>
</>
  )
}

export default UserDetails