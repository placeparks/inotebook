import AddNotes from "./AddNotes";
import Notes from "./Notes";


export default function Home(){
 
    return(
        <div className="container my-3">
          
<AddNotes/>
<Notes/>
        </div>
    )
}