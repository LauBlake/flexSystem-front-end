

export interface DealerInterface {

  cuil: string,
  name: string,
  surname: string,
  phone: string

}

export interface DealerUserInterface {

  username: string,
  password: string,
  passwordConfirm: string, 
  dealer: DealerInterface

}