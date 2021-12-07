export interface Reply<
	Code extends string,
	StatusCode extends number,
	Data extends unknown | null = null
> {
	code: Code;
	statusCode: StatusCode;
	data: Data;
}

export type BaseReply = Reply<string, number, unknown | null>;

export interface ReplyBlueprint<
	Code extends string,
	StatusCode extends number,
	Data extends unknown | null = null
> {
	code: Code;
	statusCode: StatusCode;
	hasData: Data extends null ? false : true;
}

export type ServerRepliesCreator<
	ReplyBlueprints extends ReplyBlueprint<string, number, unknown>[]
> = {
	[RB in ReplyBlueprints[number] as RB['code']]: RB extends ReplyBlueprint<
		infer Code,
		infer StatusCode,
		infer Data
	>
		? Data extends null
			? () => Reply<Code, StatusCode, Data>
			: <D extends Data>(data: D) => Reply<Code, StatusCode, D>
		: never;
};
