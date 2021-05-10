import firebase from 'firebase'
import {ref, onUnmounted} from 'vue'



const config = {
    apiKey: "AIzaSyBWOAgRoEVwp3ITAfANsk6yF0GlUxYGdgs",
    authDomain: "vue-firebase-a14cf.firebaseapp.com",
    projectId: "vue-firebase-a14cf",
    storageBucket: "vue-firebase-a14cf.appspot.com",
    messagingSenderId: "1020874958908",
    appId: "1:1020874958908:web:7a29511df6d445ea753b39"
  }

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
    return usersCollection.add(user)
}

export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
    return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
    const users = ref([])
    const close = usersCollection.onSnapshot(snapshot => {
      users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}