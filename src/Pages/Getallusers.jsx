import React, {useState,useEffect,useCallback,useRef} from 'react'
import SingleUser from '../Components/SingleUser/SingleUser';
import styled from 'styled-components';
import api from '../API';
import { useNavigate } from 'react-router-dom';
import { useClickedUsers } from '../ClickedUsers';


const Getallusers = () => {
const [users,setUsers]=useState([]);
const [loading,setLoading]=useState(true);
const [pageNum,setPageNum]=useState(1);
const [hasMore, setHasMore]=useState(false);

const navigate=useNavigate();
const {addClickedUser} =useClickedUsers();

// filters out users with duplicate ids before updating the state, ensuring that the displayed users are unique.
const removeDuplicates=(arr, prop)=> {
  const unique = new Map();
  return arr.filter((item) => {
    if (!unique.has(item[prop])) {
      unique.set(item[prop], true);
      return true;
    }
    return false;
  });
}

const getAllUsers= async()=>{
  setLoading(true);
  try{
    const response=await api.get(`/user/${pageNum}/8`);//fetch 8 users per request
    const combinedUsers = [...users, ...response.data.list];
    const uniqueUsers = removeDuplicates(combinedUsers, 'id');
     setUsers(uniqueUsers);
     setHasMore(response.data.pagination.nextPage!==null)
    } catch(error){
      console.log(error);
    } finally {
    setLoading(false);
  }
}

const observerRef = useRef();
const lastElementRef = useCallback(node => {
  if (loading) return;
  if (observerRef.current) observerRef.current.disconnect();
  observerRef.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasMore && !loading) {
      setPageNum(prevPageNumber => prevPageNumber + 1)
    }
  })
  if (node) observerRef.current.observe(node)
}, [loading, hasMore])

useEffect(()=>{
  getAllUsers();
}, [pageNum])

const handleUserClick = (id,user) => {
  addClickedUser(user);
  navigate(`/singleuser/${id}`);
};

  return (
<>
  <GridContainer>
      {users.map((user,index)=>{
        const isLastElement = users.length === index + 1;
         if(isLastElement){
           return <div key={user.id}
                       ref={lastElementRef}
                       onClick={() => handleUserClick(user.id, user)}>
                    <SingleUser user={user}/>
                 </div>  
        }else{
        return <div key={user.id} 
                    onClick={() => handleUserClick(user.id, user)}>
                    <SingleUser user={user}  />
               </div>
         }})}
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

   @media screen and (max-width:1200px){
    grid-template-columns:repeat(3, 1fr);
   }
   @media screen and (max-width:799px){
    grid-template-columns:repeat(2, 1fr);
   }
`