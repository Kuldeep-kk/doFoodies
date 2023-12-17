
import './globals.css'
import Navbar from "@/app/Components/Navbar/Navbar";
import UserProvider from "@/context/userProvider";
import styles from './Components/Navbar/navbar.module.css'
import Footer from "@/app/Components/Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';




export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
      <UserProvider>
          <div className={`${styles.MNav}`}>
              <Navbar/>
          </div>
      {children}

          <Footer/>
          <div className={`${styles.ToastCont}`}>
          <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
          </div>

      </UserProvider>
      </body>
    </html>
  )
}
