"use client"
import supabaseBrowser from "@/lib/browser/client";
import { useRouter } from "next/navigation";
import styles from './Logout.module.css'
import { josefinSans } from "@/utils/fonts";

const Logout = () => {
    const router = useRouter()
    const logout = async () => {
        const { error } = await supabaseBrowser.auth.signOut()
        if (error) console.log(error)
        router.push('/login')
    }
    
    return (
        <button onClick={logout} className={`${styles.button} ${josefinSans.className}`}>
            Logout
        </button>
    )    
}

export default Logout