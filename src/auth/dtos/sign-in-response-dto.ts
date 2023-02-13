import { User } from 'src/users/schemas/user.schema';

export default class SignInResponseDto extends User {
  accessToken: string;
}
