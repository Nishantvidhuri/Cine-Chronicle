import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export {removeperson} from "../reducers/personSlice"



export const asyncloadperson = (id)=>async(dispatch,getState)=>{
    try{    
            const detail = await axios.get(`/person/${id}`)
            const movieCredits = await axios.get(`/person/${id}/movie_credits`)
            const combinedCredits= await axios.get(`/person/${id}/combined_credits`)
            const tvCredits = await axios.get(`/person/${id}/tv_credits`)
            const externalid = await  axios.get(`/person/${id}/external_ids`)

            let theultimatedetails={
                details:detail.data,
                externalid:externalid.data,
                combinedCredits:combinedCredits.data,
                tvCredits:tvCredits.data,
                movieCredits:movieCredits.data,
                
            }
            dispatch(loadperson(theultimatedetails))
        
    } catch(error){
        console.log("error: ",error)
    }
};