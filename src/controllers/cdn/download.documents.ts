/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import path from "path";
import url from "url";
import fs from "fs";
import Jimp from "jimp";
import message from "../../views/message";

async function getDocuments(req: Request, res: Response) {
	res.removeHeader("Transfer-Encoding");
	res.removeHeader("X-Powered-By");
	const isId = req.headers["accept-language"] == "id-ID" ? true : false;

	const query = url.parse(req.query?.documentName as string, true).query;
	const file = url.parse(req.query?.documentName as string).pathname;

	if (
		!fs.existsSync(
			path.resolve(__dirname, "../../../../public/documents/" + file)
		)
	) {
		return res.status(404).send(
			message({
				statusCode: 404,
				data: req.params,
				message: isId
					? "File tidak ditemukan, masukkan nama file dengan benar atau unggah ulang!"
					: "File is not found, input the filename correctly or please reupload!",
			})
		);
	}

	const height = parseInt(query.h as string) || 0; // Get height from query string
	const width = parseInt(query.w as string) || 0; // Get width from query string
	const quality =
		parseInt(query.q as string) < 100 ? parseInt(query.q as string) : 99; // Get quality from query string

	const folder = `q${quality}_h${height}_w${width}`;
	const out_file = `public/thumb/${folder}/${file}`;
	if (fs.existsSync(path.resolve(out_file))) {
		res.sendFile(path.resolve(out_file));
		return;
	}

	if (!height || !width) {
		res.sendFile(path.resolve(`public/documents/${file}`));
		return;
	}

	Jimp.read(path.resolve(`public/documents/${file}`))
		.then((lenna) => {
			lenna.resize(width, height);
			lenna.quality(quality);

			lenna.write(path.resolve(out_file), () => {
				fs.createReadStream(path.resolve(out_file)).pipe(res);
			});
		})
		.catch((err: any) => {
			res.sendFile(path.resolve(`public/documents/${file}`));
		});
}

export { getDocuments };
