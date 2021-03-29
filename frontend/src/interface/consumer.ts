export interface SignUpInputType {
  emailId: string;
  emailSite: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
  role: string;
}

export interface SignInInputType {
  username: string;
  password: string;
}

export interface ModfiyInputType {
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

export interface LogInResponseType {
  email: string;
  name: string;
  phone: string;
  role: string;
}
