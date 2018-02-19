/**
 * video interface that contains the needed info to be displayed in components
 */
export interface Video{
    _id: string,
    name: string,
    description: string,
    url: string,
    ratings: Array<number>,
    rateCount?:number    
}