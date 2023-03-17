import React,{useState,useEffect, useRef,useCallback} from 'react'
import {useParams} from 'react-router-dom'
import api from '../API'
import { useNavigate } from 'react-router-dom';
import { useClickedUsers } from '../ClickedUsers';
import UserDetails from '../Components/UserDetails/UserDetails';
import SingleUser from '../Components/SingleUser/SingleUser'
import styled from 'styled-components';

const GetSingleUser = () => {
   const [userData,setUserData]=useState([]);
   const [friends, setFriends] = useState([]);
   const [friendsPageNum, setFriendsPageNum] = useState(1);
   const [friendsLoading, setFriendsLoading] = useState(true);
   const [friendsHasMore, setFriendsHasMore] = useState(false);

   const {id}=useParams();
   const navigate=useNavigate();

   //getting singleUser data
   const getSingleData=async()=>{
    try {
        const {data}= await api.get(`/user/${id}`)
        setUserData(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
  }

//making sure that all users are unique
   const removeDuplicates=(arr,prop)=>{
    const unique=new Map();
    return arr.filter((item)=>{
      if(!unique.has(item[prop])){
        unique.set(item[prop], true);
        return true;
      }
      return false;
    })
  }
//getting friends data
   const getAllFriends=async()=>{
     setFriendsLoading(true);
   try {
    const response= await api.get(`/user/${id}/friends/${friendsPageNum}/8`)//get 8 users per request
    const allfriends=[...friends, ...response.data.list];
    const uniqueFriends=removeDuplicates(allfriends, 'id');
    setFriends(uniqueFriends);
    setFriendsHasMore(response.data.pagination.nextPage !== null); 
  } catch (error) {
    console.log(error);
  } finally {
    setFriendsLoading(false);
  }
}

  useEffect(()=>{
    getSingleData();
    getAllFriends();
  }, [id])

  const friendsObserverRef = useRef();
  const lastFriendElementRef = useCallback(
   (node) => {
    if (friendsLoading) return;
    if (friendsObserverRef.current) friendsObserverRef.current.disconnect();
    friendsObserverRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && friendsHasMore && !friendsLoading) {
        setFriendsPageNum((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) friendsObserverRef.current.observe(node);
  },
  [friendsLoading, friendsHasMore]
);

 useEffect(() => {
  getAllFriends();
 }, [friendsPageNum]);

  const {clickedUsers, addClickedUser} =useClickedUsers();;
  const handleFriendClick = (friendId, user) => {
  addClickedUser(user);
  navigate(`/singleuser/${friendId}`);
};

  return (
    <>
  <Wrapper> 
    <div>
       <UserDetails userData={userData}/>
    </div>
    <Users>
       {clickedUsers.map((item,index)=>(
        <span key={index}
          onClick={() => handleFriendClick(item.id,item)}>
           {`${item.prefix} ${item.name} ${item.lastName} >`} 
        </span>
       ))}
    </Users>
    <h2>Friends:</h2>
    <GridContainer>
      {friends.map((friend, index) => {
        const isLastElement = friends.length === index + 1;
        if (isLastElement) {
          return (
            <div key={friend.id} ref={lastFriendElementRef} onClick={()=>{handleFriendClick(friend.id, friend)}}>
              <SingleUser user={friend}/>
            </div>
          );
        } else {
          return (
            <div key={friend.id} onClick={()=>{handleFriendClick(friend.id, friend)}}>
              <SingleUser user={friend}/>
            </div>
          );
        }
      })}
    </GridContainer>
  </Wrapper> 
    </>
  )
}

export default GetSingleUser

const Wrapper=styled.div`
  border:1px solid black;
  padding:10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:40px;
  & h2{
    align-self:flex-start;
  }
`
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
const Users=styled.div`
  align-self:flex-start;
  width:800px;
  & span{
    text-decoration:underline;
    color:purple;
    cursor:pointer;
  }
`