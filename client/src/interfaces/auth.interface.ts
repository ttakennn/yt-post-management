export interface AuthForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EmailProfile {
  name: string;
  email: string;
  _id?: string;
  sub?: string;
  picture?: string;
}

export interface UserProfile {
  access_token: string;
  authuser: string;
  expires_in: number;
  token_type: string;
}

export interface Auth {
  access_token: string;
  userProfile: EmailProfile;
}

export interface AuthResponse {
  data: {
    token: string;
    result: EmailProfile;
  }
}