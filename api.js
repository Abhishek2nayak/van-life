import React from "react";
import { initializeApp } from "firebase/app";
import {getFirestore,collection, getDocs, doc, getDoc, query, where} from 'firebase/firestore/lite'
const API_KEY = import.meta.env.API_KEY;
const APP_ID =  import.meta.env.APP_ID;


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "vanlife-026.firebaseapp.com",
  projectId: "vanlife-026",
  storageBucket: "vanlife-026.appspot.com",
  messagingSenderId: "590211600366",
  appId:APP_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const vansCollectionRef = collection(db,"vans");
const userCollectionRef = collection(db,"users");






export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id : doc.id
    }))

    console.log(dataArr)
    return dataArr
}


export async function getVan(id) {
    const docRef = doc(db,"vans",id)
    const vanSpanShot = await getDoc(docRef);
    return {
        ...vanSpanShot.data(),
        id : vanSpanShot.id
    }
}


export async function getHostVans() {
    const q = query(vansCollectionRef,where("hostId","==", "123"))
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id : doc.id
    }))

    console.log(dataArr)
    return dataArr
}





// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}