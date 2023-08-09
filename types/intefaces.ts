export interface IUserData {
  user: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string
  } | null
}

export enum UserActionType{
  Login, 
  Logout,
}

export interface INotifyData {
  status: string,
  msg: string
}

// interface iAction{
//   type: UserActionType,
//   constext: 
// }