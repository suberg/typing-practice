import * as t from 'runtypes';

export const Password = t.String
    .withConstraint(password => password.length >= 3 || 'Error! Invalid password!')
    .withBrand('Password');

export type Password = t.Static<typeof Password>;
