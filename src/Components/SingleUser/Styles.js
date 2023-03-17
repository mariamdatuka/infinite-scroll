import styled from "styled-components";

export const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  max-width:300px;
  height:300px;
  cursor:pointer;
  border:1px solid black;
`
export const Info=styled.div`
  display:flex;
  flex-direction:column;
  gap:7px;
  padding:10px;;
  background-color:#fff;
  & h3{
    font-size:18px;
  }
`
export const ImgBox=styled.div`
   & img{
    width:100%;
   }
`