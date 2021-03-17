import * as t from 'runtypes';

export const Email = t.String
    .withConstraint(email => (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email) || 'Error! Invalid email!')
    .withBrand('Email');

export type Email = t.Static<typeof Email>;
