import axios from "axios";
const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmJhYjExNDk0ODEyOWRlZjU2MDZjOGNkNWZiY2FiNSIsIm5iZiI6MTcyNzU5ODQ5OS45MDUzMiwic3ViIjoiNjZmOTBlNmJhNjI5M2UzZDc2YTIzZTFlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.2_gNWTWdJARWndV52HVAGwNFY6dDxgGsyMOvD6-Ah5s'
      }
})

export default instance;