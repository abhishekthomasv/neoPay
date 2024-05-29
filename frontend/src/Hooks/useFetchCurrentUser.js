import { useEffect } from "react"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL

const useFetchCurrentUser = (navigate) => {
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const userResponse = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            Authorization: `${token}`,
          },
        })

        if (userResponse.data && userResponse.data.length > 0) {
          navigate("/dashboard", { state: { userData: userResponse.data[0] } })
        } else {
          navigate("/signin")
        }
      } catch (err) {
        navigate("/signin")
      }
    }

    fetchCurrentUser()
  }, [navigate])
}

export default useFetchCurrentUser
