import React, {useState,useEffect,useCallback,useRef} from 'react'
import api from './API'
import SingleUser from './SingleUser/SingleUser';
import styled from 'styled-components';

const Getallusers = () => {
const [users,setUsers]=useState([]);
const [loading,setLoading]=useState(true);
const [pageNum,setPageNum]=useState(1);
const [hasMore, setHasMore]=useState(false);
const observerRef = useRef();

const getAllUsers= async()=>{
  setLoading(true);
  try{
    const response=await api.get(`/user/${pageNum}/8`);//fetch 12 users per request
    setUsers((prevUsers)=>[...prevUsers,...response.data.list])
    //// Calculate the new 'hasMore' state using the pagination information
    const nextPage=response.data.pagination.nextPage;
    const totalPages=Math.ceil(response.data.pagination.total / response.data.pagination.pageSize);
    //allowing the infinite scroll functionality to continue fetching data. If there is no valid next page, hasMore will be set to false, 
    setHasMore(nextPage!==null&&nextPage<=totalPages);
    } catch(error){
      console.log(error);
    } finally {
    setLoading(false);
  }
}

const lastElementRef = useCallback(node => {
  if (loading) return
  if (observerRef.current) observerRef.current.disconnect()
  observerRef.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasMore) {
      setPageNum(prevPageNumber => prevPageNumber + 1)
    }
  })
  if (node) observerRef.current.observe(node)
}, [loading, hasMore])

useEffect(()=>{
  getAllUsers();
}, [pageNum])

  return (
    <>
     
      <GridContainer>
      {users.map((user,index)=>{
        if(users.length===index+1){
          return <div ref={lastElementRef} key={index}></div>
        } else {
          return <div key={index}>
            <SingleUser user={user}/>
          </div>
         }
       })}
    </GridContainer>
    </>
  )
}

export default Getallusers


const GridContainer=styled.div`
   display:grid;
   grid-template-columns:repeat(4, 1fr);
   column-gap:10px;
   row-gap:20px;
`