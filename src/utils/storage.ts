//
import { S3 } from 'aws-sdk';
import { DBConfig } from '../utils/database';

export const uploadFile = async (file, key) => {
	const s3 = new S3();

	return new Promise(function (resolve, reject) {
		const params = {
			Bucket: DBConfig.s3BucketName,
			Key: key,
			Body: file.data,
		};

		s3.upload(params, (err, data)=> {
			if (err) reject(err);

			resolve({
				msg: 'succesfully uploaded',
				code: 200,
				data: {
					src: data && (data.key || data.Key),
				},
			});
		});
	});
};

export const deleteFile = async (key) => {
	return new Promise(function (resolve, reject) {
		const s3 = new S3();

		const params = {
			Bucket: DBConfig.s3BucketName,
			Key: key,
		};

		s3.deleteObject(params, function (err) {
			if (err) reject(err);

			resolve({
				msg: 'succesfully uploaded',
				code: 200,
			});
		});
	});
};
