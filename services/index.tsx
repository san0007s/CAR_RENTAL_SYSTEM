import { gql } from "graphql-request"
import { request } from "graphql-request"

const MATER_URL = "https://api-ap-south-1.hygraph.com/v2/cluvl2pvd0ytc07umws5af7su/master"
export const getCarsList = async() => {
    const query = gql`
    query Assets {
        carLists {
          createdAt
          id
          mileage
          name
          price
          publishedAt
          stage
          updatedAt
          image {
            url
          }
          carType
          transmission
          carBrand
        }
      }
    `

    const result = await request(MATER_URL,query);
    return result;
}
export const  getStoreLocations= async() =>{
    const query = gql`
    query MyQuery {
        storesLocations {
          address
        }
      }
    `
    const result = await request(MATER_URL,query);
    return result;
}

export const createBooking=async(formValue:any)=>{
    const mutationQuery=gql`
    mutation MyMutation {
      createBooking(
        data: {carId: {connect: {id: "`+formValue.carId+`"}}, contactNumber: "`+formValue.contactNumber+`", dropOffTime: "`+formValue.dropOffTime+`", dropoffDate: "`+formValue.dropoffDate+`", pickupDate: "`+formValue.pickupDate+`", pickupTime: "`+formValue.pickupTime+`", userName: "`+formValue.userName+`"}
      ) {
        id
      }
    }
    `
    const result = await request(MATER_URL,mutationQuery);
    return result;
}