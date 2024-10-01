import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export {removetv} from "../reducers/tvSlice"



export const asyncloadtv = (id)=>async(dispatch,getState)=>{
    try{    
            const detail = await axios.get(`/tv/${id}`)
            const externalid = await  axios.get(`/tv/${id}/external_ids`)
            const recommendation = await axios.get(`/tv/${id}/recommendations`)
            const similar  = await axios.get(`/tv/${id}/similar`)
            const videos  = await axios.get(`/tv/${id}/videos`)
            const translations  = await axios.get(`/tv/${id}/translations`)
            const watchproviders = await axios.get(`/tv/${id}/watch/providers`)
            let theultimatedetails={
                details:detail.data,
                recommendation:recommendation.data.results,
                externalid:externalid.data,
                similar:similar.data,
                translations:translations.data.translations.map((t)=>t.english_name),
                videos:videos.data.results.find(m=>m.type==="Trailer"),
                watchproviders:watchproviders.data.results.IN,
            }
            dispatch(loadtv(theultimatedetails))
        
    } catch(error){
        console.log("error: ",error)
    }
};