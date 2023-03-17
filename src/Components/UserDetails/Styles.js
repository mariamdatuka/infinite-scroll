import styled from "styled-components";

export const Wrapper=styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   gap:30px;
   
   @media screen and (max-width:1200px){
    flex-direction:column;
    gap:10px;
    align-items:flex-start;
   }
`
export const ImgBox=styled.div`
 & img{
    width:300px;
 }
`
export const InfoBox=styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:10px;
`
export const Box=styled.div`
  display:flex;
  gap:5px;
  & p{
    text-decoration:underline;
  }
`