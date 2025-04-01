import {v4 as uuidv4} from "uuid";
import { CustomerSearch, CustomerSearchCondition } from "@/model/types/customer/customer/type";
import { searchCustomersApi} from "../api/searchCustomerApi";



export const initialCustomerState = {
    postSearchInfo:{
        category:'none',
        cateId:'none',
        searchTarget :'all',
        customerName: null,
        ceo:null,
    },
    searchInputTarget:'customerName',
    searchInput:'',
    customers:[],
    initialCustomers:[],
    searchKey:uuidv4(),
}


export async function customerSearchAction(prevState, formData){
    const searchData:CustomerSearch = {
        postSearchInfo:{
            category: formData.get('category'),
            cateId: formData.get('cateId'),
            searchTarget: formData.get('searchTarget'),
            customerName: formData.get('customerName'),
            ceo: formData.get('ceo'), 
        },
        searchInputTarget:formData.get('searchInputTarget'),
        searchInput:formData.get('searchInput')
    }

    const searchKey = uuidv4()
    if(!searchData.postSearchInfo.searchTarget) {
        searchData.postSearchInfo.searchTarget = 'all'
    }
    if(searchData.postSearchInfo.category ==='none'){
        searchData.postSearchInfo.category = null;
    }
    if(searchData.postSearchInfo.cateId ==='none'){
        searchData.postSearchInfo.cateId = null;
    }


    const{category, cateId, searchTarget} = searchData.postSearchInfo
    if(!category && !cateId && searchTarget==='all' && !searchData.searchInput){
        return {...prevState,...searchData, customers : prevState.initialCustomers, searchKey}
    }

    const postData:CustomerSearchCondition = {
        ...searchData.postSearchInfo,
        [searchData.searchInputTarget] : searchData.searchInput
    }
    const customers = await searchCustomersApi(postData)
    return {...prevState,...searchData, customers, searchKey}
}