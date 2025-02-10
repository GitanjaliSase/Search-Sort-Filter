import { useState ,useEffect} from "react";
import { USERS } from "./configs";
import { MapPin as MapPinIcon ,Cake as CakeIcon } from "lucide-react";
 
export default function App(){
  const [searchText, setSearchText]=useState("");
  const [filterUsers,setFilterUsers]=useState(USERS);
  const [filterCity,setFilterCity]=useState("");
  const [filterAge,setFilterAge]=useState("");

   useEffect(()=>{
    if(!searchText){
      setFilterUsers(USERS);
      return;
    }
    const tempFilteredUsers=USERS.filter((user)=>{
      if(user.name.toLocaleLowerCase().includes(searchText)){
        return true;
      }
      else if(user.city.toLocaleLowerCase().includes(searchText)){
        return true;
      }
      else if(user.age.toString.includes(searchText)){
        return true;
      }else{
        return false;
      }
    });
    setFilterUsers(tempFilteredUsers);
   },[searchText]);

   useEffect(()=>{
    if(!filterAge && !filterCity){
      setFilterUsers(USERS);
      return;
    }
    const tempFilteredUsers=USERS.filter((user)=>{
      if(filterCity && user.city===filterCity && filterAge && user.age===parseInt(filterAge)){
        return true;
      }
      if(filterAge && !filterCity && user.age===parseInt(filterAge)){
        return true;
      }
      if(!filterAge && filterCity && user.city===filterCity){
        return true;
      }
      return false;
    });
    setFilterUsers(tempFilteredUsers);
   },[filterCity,filterAge]);

    return(
     <div className="bg-slate-100 min-h-screen">
      <h1 className="text-center text-lime-400 text-4xl font-bolf py-5"> Search ,Sort, Filter</h1>
       
       <input type="text" placeholder="Search" className="w-2/3 p-2 mt-10 my-10 bg-white block mx-auto rounded-lg text-2xl focus:outline-none border border-gray-200 "
         value={searchText}
         onChange={(e)=>setSearchText(e.target.value.toLocaleLowerCase())}
       />
      { searchText ? <p className="text-center  mt-2">
         {filterUsers.length===0 ? "Oops ! No users found for search result... Try another search...":
         'Found {filterUsers.length} users for search results../'}
         </p>:
       null}

       <div>
         <div>
            <span>Filter By City:</span>
            <select className="bg-white text-lg my-2 rounded-lg px-5" value={filterCity}
            onChange={(e)=>setFilterCity(e.target.value)}>
              <option value="">All</option>
              {
                USERS.map((user)=>{
                  return <option key={user.city} value={user.city}>{user.city}</option>
                })
              }
            </select>
         </div>
         <div>
         <span>Filter By Age:</span>
         <select className="bg-white text-lg my-2 rounded-lg px-5" value={filterAge}
            onChange={(e)=>setFilterAge(e.target.value)}>
              <option value="">All</option>
              {
                USERS.map((user)=>{
                  return <option key={user.age} value={user.age}>{user.age}</option>
                })
              }
            </select>
         </div>
       </div>

       <div className="flex flex-wrap justify-around mt-10">{USERS.map((userData,index)=>{
          const {name,city,age,avatar}=userData;
          
          return(
            <div className="bg-white shawdow-lg mb-5 mx-7 px-5 py-2 pb-2 rounded-lg w-[400px] flex" key={index}>
            <img src={avatar} className="h-15 rounded-full mr-4"/>
            <div>
            <h1 className="font-bold text-lg border-b border-gray-200 pb-2">{name}</h1>
               <div className="flex mt-2">
                  <p className="w-[100px] flex">
                     <CakeIcon className="inline "/>{age}
                 </p>
                  <p>
                        <MapPinIcon className="inline ml-4"/> {city} 
                  </p>
                </div>
             </div>
            </div>
          );
           
          }
          )}
      </div>
     </div>
    );
}