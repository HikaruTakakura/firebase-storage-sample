import firebase from "firebase";

import firebaseConfig from "@/firebaseConfig.js";
// 上のコードの代わりに、自分のプロジェクトの構成オブジェクトを貼り付ける
// const firebaseConfig = {
//   apiKey: "AIzaS...",
//   ...
// }

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();
