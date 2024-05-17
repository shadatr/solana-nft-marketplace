export type GuardGroupType = {
    label: string
    thirdPartySigner: boolean
    startDate?: number
    endDate?: number
    price?: number
    allowListHash?: string
    mintLimit?: {
      id: number
      limit: number
    }
    allocation?: number
  }

  export type CandyMachineItemsType= {
    name:string,
    description:string,
    image:string
  }
  