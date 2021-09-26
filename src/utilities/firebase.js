import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import {useState, useEffect} from 'react'

const firebaseConfig = {
    apiKey: "AIzaSyDQPDhwKFdGTzmB9pqdUQlg0eSKK_P09j4",
    authDomain: "cs397-react-tutorial.firebaseapp.com",
    databaseURL: "https://cs397-react-tutorial-default-rtdb.firebaseio.com",
    projectId: "cs397-react-tutorial",
    storageBucket: "cs397-react-tutorial.appspot.com",
    messagingSenderId: "236279553780",
    appId: "1:236279553780:web:ab0454b5efaaea267508a1",
    measurementId: "G-XLJV91DTK3"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
        const dbRef = ref(database, path);
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);
    
    return [data, loading, error];
};