// src/services/firebase.js
// ⚠️  Replace ALL placeholder values below with your actual Firebase project config
// Get these from: Firebase Console → Project Settings → Your apps → Web app → Config

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

// ─── REPLACE WITH YOUR FIREBASE CONFIG ──────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
// ─────────────────────────────────────────────────────────────

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// ─── AUTH ────────────────────────────────────────────────────
export const loginAdmin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logoutAdmin = () => signOut(auth)

export const onAuthChange = (cb) => onAuthStateChanged(auth, cb)

// ─── PROJECTS ────────────────────────────────────────────────
export const getProjects = async () => {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export const subscribeProjects = (cb) => {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
}

export const addProject = (data) =>
  addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() })

export const updateProject = (id, data) =>
  updateDoc(doc(db, 'projects', id), { ...data, updatedAt: serverTimestamp() })

export const deleteProject = (id) => deleteDoc(doc(db, 'projects', id))

// ─── ABOUT ───────────────────────────────────────────────────
export const getAbout = async () => {
  const snap = await getDoc(doc(db, 'about', 'main'))
  return snap.exists() ? snap.data() : null
}

export const subscribeAbout = (cb) =>
  onSnapshot(doc(db, 'about', 'main'), (snap) => cb(snap.exists() ? snap.data() : null))

export const updateAbout = (data) =>
  setDoc(doc(db, 'about', 'main'), { ...data, updatedAt: serverTimestamp() }, { merge: true })

// ─── SOCIALS ─────────────────────────────────────────────────
export const getSocials = async () => {
  const snap = await getDoc(doc(db, 'socials', 'links'))
  return snap.exists() ? snap.data() : {}
}

export const subscribeSocials = (cb) =>
  onSnapshot(doc(db, 'socials', 'links'), (snap) => cb(snap.exists() ? snap.data() : {}))

export const updateSocials = (data) =>
  setDoc(doc(db, 'socials', 'links'), { ...data, updatedAt: serverTimestamp() }, { merge: true })

// ─── MEDIA ───────────────────────────────────────────────────
export const getMedia = async () => {
  const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export const subscribeMedia = (cb) => {
  const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
}

export const addMedia = (data) =>
  addDoc(collection(db, 'media'), { ...data, createdAt: serverTimestamp() })

export const deleteMedia = async (id, storagePath) => {
  await deleteDoc(doc(db, 'media', id))
  if (storagePath) {
    try { await deleteObject(ref(storage, storagePath)) } catch {}
  }
}

// ─── STORAGE UPLOAD ──────────────────────────────────────────
export const uploadFile = (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path)
    const task = uploadBytesResumable(storageRef, file)
    task.on(
      'state_changed',
      (snap) => onProgress && onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve({ url, path })
      }
    )
  })
}

// ─── ACTIVITY LOG ────────────────────────────────────────────
export const logActivity = (action, detail) =>
  addDoc(collection(db, 'activity'), {
    action,
    detail,
    timestamp: serverTimestamp(),
  })

export const getActivity = async (limit = 20) => {
  const q = query(collection(db, 'activity'), orderBy('timestamp', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.slice(0, limit).map((d) => ({ id: d.id, ...d.data() }))
}

// ─── SECTION VISIBILITY ──────────────────────────────────────
export const getVisibility = async () => {
  const snap = await getDoc(doc(db, 'settings', 'visibility'))
  return snap.exists() ? snap.data() : { about: true, projects: true, media: true, community: true, contact: true }
}

export const subscribeVisibility = (cb) =>
  onSnapshot(doc(db, 'settings', 'visibility'), (snap) =>
    cb(snap.exists() ? snap.data() : { about: true, projects: true, media: true, community: true, contact: true })
  )

export const updateVisibility = (data) =>
  setDoc(doc(db, 'settings', 'visibility'), data, { merge: true })
