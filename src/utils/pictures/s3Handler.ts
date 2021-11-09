/* eslint-disable no-console */
/* eslint-disable no-return-await */
import * as AWS from 'aws-sdk';
import { Readable } from 'stream';
import config from '../../config';

const { s3: s3Config } = config;

AWS.config.update({ region: s3Config.region, s3ForcePathStyle: true });

let s3: AWS.S3;

export const initializeS3 = () => {
    console.log('Connecting to S3...');
    s3 = new AWS.S3({
        endpoint: s3Config.url,
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
    });
    console.log('S3 initialized');
};

export const getProfilePicture = (path: string): Readable => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: s3Config.profilesBucketName,
        Key: path,
    };

    return s3.getObject(params).createReadStream();
};
