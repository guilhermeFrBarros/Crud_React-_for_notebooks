import axios from "axios";

    const token = localStorage.getItem("token");
    axios.defaults.baseURL = "http://54.207.60.35:3000/api/parties"; // sua URL base
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");

    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';




export default axios
