export interface SignUpInputType {
  emailId: string;
  emailSite: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
  memberRole: string;
}

export interface SignUpRequestType {
  emailId: string;
  emailSite: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
  contractAddress: string;
  privateKey: string;
  memberRole: string;
}

export interface SignInInputType {
  username: string;
  password: string;
  memberRole: string;
}

export interface ModifyInputType {
  email: string;
  name: string;
  imageUrl: string;
  prevPassword: string;
  newPassword: string;
  introduction: string;
}

export interface SignUpResponseType {
  result: boolean;
}

export interface SignInResponseType {
  memberId: number;
  memberRole: string;
  logIn: boolean;
}

export interface SetPasswordRequestType {
  token: string;
  password: string;
}