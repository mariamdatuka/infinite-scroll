import styled from "styled-components";

export const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  max-width:300px;
  height:330px;
  border:1px solid red;
`
export const Info=styled.div`
  display:flex;
  flex-direction:column;
  gap:7px;
  padding:10px;
  background-color:#fff;
  border:1px solid green;
  
  & h3{
    font-size:18px;
  }
`
export const Background=styled.div`
`