import { User } from './types';
import { capitalize, secureTrim } from '@nc/utils/formatter';

const publicFields = ['first_name', 'last_name', 'company_name'];

export function formatUserResponse(user: User) {
  return secureTrim(user, publicFields);
}

export function formatRawUserData(rawUser): User {
  return {
    id: rawUser.id,
    first_name: capitalize(rawUser.first_name),
    last_name: capitalize(rawUser.last_name),
    company_name: rawUser.company_name,
    ssn: rawUser.ssn,
  };
}
