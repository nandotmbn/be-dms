import { TMessage } from "../types/message.types";

export default function ({ statusCode, data, message }: TMessage): TMessage {
	return {
		statusCode,
		data,
		message,
	};
}
