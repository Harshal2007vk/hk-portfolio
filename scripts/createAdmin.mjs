import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDuUdrPYh-Fj98P3QU8z2TczwwzBchN7pk",
  authDomain: "hk-portfolio-2f6ce.firebaseapp.com",
  projectId: "hk-portfolio-2f6ce",
  storageBucket: "hk-portfolio-2f6ce.firebasestorage.app",
  messagingSenderId: "32569192259",
  appId: "1:32569192259:web:6b3ecfa1e4c87957b9c9f6",
  measurementId: "G-5ETYENVCCW",
}

const ADMIN_EMAIL = 'harshalkapale11@gmail.com'
const ADMIN_PASSWORD = 'Harshal@2007'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

async function createAdmin() {
  try {
    console.log('Creating admin user...')
    const cred = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
    const uid = cred.user.uid

    await setDoc(doc(db, 'admins', uid), {
      email: ADMIN_EMAIL,
      role: 'admin',
      createdAt: new Date().toISOString(),
    })

    await setDoc(doc(db, 'settings', 'visibility'), {
      about: true,
      projects: true,
      media: true,
      community: true,
      contact: true,
    })

    await setDoc(doc(db, 'socials', 'links'), {
      email: ADMIN_EMAIL,
      phone: '+91 93730 45023',
      github: 'https://github.com/Harshal2007vk',
      youtube: 'https://youtube.com/@dev_hunters',
      instagram: 'https://www.instagram.com/dev_huntersx',
    })

    console.log('Admin created successfully!')
    console.log('Email: ' + ADMIN_EMAIL)
    console.log('UID: ' + uid)
    process.exit(0)
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      console.log('Admin already exists! Login at /admin/login')
    } else {
      console.error('Error: ' + err.message)
    }
    process.exit(1)
  }
}

createAdmin()