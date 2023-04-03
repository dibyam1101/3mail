import "@/styles/globals.css";
import styles from "@/style";
import Navbar from "@/components/Navbar";
import "../components/Fox/Fox.styles.css";
import { MetaMaskProvider } from "metamask-react";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <MetaMaskProvider>
        <div className="bg-primary w-full overflow-auto h-[100vh]">
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>
          <Component {...pageProps} />
        </div>
      </MetaMaskProvider>
    </AlertProvider>
  );
}
