import axios from "axios";
const BaseURL = "http://localhost:8000/api"

export default axios.create({
    baseURL: BaseURL
})