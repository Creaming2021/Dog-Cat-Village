export interface SignUpInputType {
  emailId: string;
  emailSite: string;
  nickname?: string;
  name?: string;
  password: string;
  passwordConfirm: string;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
}

export interface SignInInputType {
  email: string;
  password: string;
}

export interface ModfiyInputType {
  email: string;
  nickname: string;
  imageUrl: string;
  prevPassword: string;
  newPassword: string;
  introduction: string;
}

export interface SignUpResponseType {
  result: boolean;
}

export interface LogInResponseType {
  email: string;
  nickname: string;
  phone: string;
  role: string;
}
