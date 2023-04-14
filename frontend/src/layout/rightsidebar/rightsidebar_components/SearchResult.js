import "./SearchResult.css";
import AlertDialog from "../../../dialogs/AlertDialog";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export const SearchResult = ({ result }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isFollowDialogOpen, setisFollowDialogOpen] = useState(false);
  const [resultUser, setresultUser] = useState("Are you sure you want to follow "+result+" ?"); // to be deleted coz need forward to profile page
  const navigate = useNavigate();
  const location = useLocation();

  const handleFollowConfirm = async (followerUsername, beFollowUsername) => {
    setisFollowDialogOpen(false);
    // to be sent to backend to handle follow

    await fetch('http://localhost:8000/userinfos/follow', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'followerUsername': followerUsername,
        'beFollowUsername': beFollowUsername,
      })
    })

    setTimeout(async () => {
      await renewUser();
      window.location.reload();
    }, 200);
  };

  const getUseraccount = async () => {
    const useraccount = await fetch(`http://localhost:8000/useraccounts?userId=${user.useraccount.userId}`,
    {
      method: 'GET',
      mode: 'cors',
    })
    .then(data => data.json())

    return useraccount;
  }

  const getUserinfo = async () => {
    const userinfo = await fetch(`http://localhost:8000/userinfos?userId=${user.useraccount.userId}`,
    {
      method: 'GET',
      mode: 'cors',
    })
    .then(data => data.json());
    return userinfo;
  }

  const renewUser = async (val) => {
    const useraccount = await getUseraccount();
    const userinfo = await getUserinfo();
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify({
      'userinfo': userinfo,
      'useraccount': useraccount,
    }));
    //console.log('renew')
  }

  const handleFollowCancel = () => {
    setisFollowDialogOpen(false);
  };

  useEffect(() => {
    window.addEventListener('reload', renewUser());
  }, []);

  return (
    <main>
    <div
      className="search-result"
      onClick={
        () => {
          if(result !== "NULL") 
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
         follow={true}
        />
      )}</div>
      </main>
  );
};
