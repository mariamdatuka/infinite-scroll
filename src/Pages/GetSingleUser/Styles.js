import styled from "styled-components";

export const Wrapper=styled.div`
  border:1px solid black;
  padding:10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:40px;

  @media screen and (max-width:1200px){
    align-items:flex-start;
  }
  @media screen and (max-width:799px){
     align-items:center;
   }
`
export const GridContainer=styled.div`
   display:grid;
   grid-template-columns:repeat(4, 1fr);
   column-gap:10px;
   row-gap:20px;

   @media screen and (max-width:1200px){
    grid-template-columns:repeat(3, 1fr);
   }
   @media screen and (max-width:799px){
    grid-template-columns:repeat(2, 1fr);
   }
`
export const Users=styled.div`
  align-self:flex-start;
  width:800px;
  & span{
    text-decoration:underline;
    color:purple;
    cursor:pointer;
  }

  @media screen and (max-width:1200px){
    width:600px;
  }

  @media screen and (max-width:799px){
    align-self:center;
    width:500px;
  }

  @media screen and (max-width:499px){
    width:200px;
  }
`
export const Friends=styled.div`
  align-self:flex-start;

  @media screen and (max-width:799px){
    align-self:center;
  }
`