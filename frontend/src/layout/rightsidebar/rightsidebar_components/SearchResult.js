import "./SearchResult.css";
import AlertDialog from "../../../dialogs/AlertDialog";
import { useState } from "react";



export const SearchResult = ({ result }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isFollowDialogOpen, setisFollowDialogOpen] = useState(false);
  const [resultUser, setresultUser] = useState("Are you sure you want to follow "+result+" ?"); // to be deleted coz need forward to profile page
  const handleFollowConfirm = (followerUsername, beFollowUsername) => {
    setisFollowDialogOpen(false);
    // to be sent to backend to handle follow
    fetch('http://localhost:8000/userinfos/follow', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'followerUsername': followerUsername,
        'beFollowUsername': beFollowUsername,
      })
    })
  };

  const handleFollowCancel = () => {
    setisFollowDialogOpen(false);
  };

  return (
    <main>
    <div
      className="search-result"
      onClick={
        () => {
          if(result !="NULL") 
          {setisFollowDialogOpen(true);}
        }
      }
    >
      {result}
    </div>
    <div>
      {isFollowDialogOpen && (
        <AlertDialog
         title="Alert"
         description={resultUser}
         onYes={handleFollowConfirm}
         onNo={handleFollowCancel}
         followerUsername={user.useraccount.username}
         beFollowUsername={result}
        />
      )}</div>
      </main>
  );
};
