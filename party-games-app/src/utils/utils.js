import { database } from "../firebase";

export function GetFirebaseKeyStudent(email: string) {
    const Refs = database.ref('users');
    let entry = "";

    Refs.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          if(childData.email === email) {
            entry = childSnapshot.key;
          }
      });
    });

    return entry;
}

export function CheckIfUserIsActive(email: string, refs: string) {

    const Refs = database.ref(refs);
    let check = false;
    Refs.on('value', snapshot => {  
        
      snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          if(childData.isActive === true && childData.email === email) {
              check = true;
          }
      });
    });

    return check;
}