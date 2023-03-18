import { createGlobalStyle } from "styled-components";

export const GlobalStyles=createGlobalStyle`
   *{
    margin:0;
    padding:0;
    box-sizing:border-box;
   }
   body{
    font-size:18px;
    padding:15px 35px;
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:100vh;
    width:100vw;
   }
`