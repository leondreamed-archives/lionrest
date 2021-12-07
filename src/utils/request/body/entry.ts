import { Static, Type } from '@sinclair/typebox';

export const LoginBodySchema = Type.Object({
	email: Type.String(),
	password: Type.String(),
});
export type LoginBody = Static<typeof LoginBodySchema>;

export const RegisterBodySchema = Type.Object({
	email: Type.String(),
	password: Type.String(),
});
export type RegisterBody = Static<typeof RegisterBodySchema>;
