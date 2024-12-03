export interface Account {
  accountId: bigint
  accountName: string
  accountNo: bigint
  accountIfccode: string
  accountBranch: string
  accountBalance: bigint
  userId: string
}


// Create enum for account holder 
export enum AccountHolder {
  ramanand = "ramanand",
  abinaya = "abinaya",
  chitravelu = "chitravelu",
  thamaraiselvi = "thamaraiselvi",
  vidunaa = "vidunaa",
  rudhran = "rudhran",
}
