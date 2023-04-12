import "./SearchResult.css";
import AlertDialog from "../../../dialogs/AlertDialog";
import { useState } from "react";



export const SearchResult = ({ result }) => {
  const [isFollowDialogOpen, setisFollowDialogOpen] = useState(false);
  const [resultUser, setresultUser] = useState("Are you sure you want to follow "+result+" ?");
  const handleFollowConfirm = () => {
    setisFollowDialogOpen(false);
    // to be sent to backend to handle follow
  };

  const handleFollowCancel = () => {
    setisFollowDialogOpen(false);
  };

  return (
    <main>
    <div
      className="search-result"
      onClick={() => setisFollowDialogOpen(true)}
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
        />
      )}</div>
      </main>
  );
};
