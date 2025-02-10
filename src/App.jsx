import { useState ,useEffect} from "react";
import { USERS } from "./configs";
import { MapPin as MapPinIcon ,Cake as CakeIcon } from "lucide-react";
 
export default function App(){
  const [searchText, setSearchText]=useState("");
  const [filterUsers,setFilterUsers]=useState(USERS);
   useEffect(()=>{
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
    })
   },[searchText]);

    return(
     <div className="bg-slate-100 min-h-screen">
      <h1 className="text-center text-lime-400 text-4xl font-bolf py-5"> Search ,Sort, Filter</h1>
       
       <input type="text" placeholder="Search" className="w-2/3 p-2 mb-10 my-10 bg-white block mx-auto rounded-lg text-2xl focus:outline-none border border-gray-200 "
         value={searchText}
         onChange={(e)=>setSearchText(e.target.value)}
       />

       <div className="flex flex-wrap justify-around">{USERS.map((userData,index)=>{
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