import axios  from 'axios'

const axiosInstance = (() => {
    return axios.create({
            baseURL: "http://localhost:5272/api"
    })
})()

axiosInstance.interceptors.response.use(
    response => Promise.resolve(response))
    
export default axiosInstance;
export const cancelTokenSource = () => axios.CancelToken.source();