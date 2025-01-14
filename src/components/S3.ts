import AWS from 'aws-sdk';

const bucketName = process.env.DEV_AWS_S3_BUCKET || '';

let isAuthenticated: boolean | null = null;
const defaultPoster = "/empty_image.jpg";

// 인증 정보 설정
const config = {
    aws_reg: "ap-northeast-2",  // AWS 리전 (예: 서울 ap-northeast-2)
    aws_key: process.env.AWS_ACCESS_KEY_ID,  // AWS 액세스 키
    aws_sec: process.env.AWS_SECRET_ACCESS_KEY,  // AWS 시크릿 키
  };

  // AWS.config.update를 사용하여 인증 설정
AWS.config.update({
    accessKeyId: config.aws_key,
    secretAccessKey: config.aws_sec,
    region: config.aws_reg, // 리전 설정
  });

  // S3 클라이언트 생성
const s3 = new AWS.S3();

// s3 인증 상태 확인
const checkAuthentication = async () => {
    if (isAuthenticated == null) return;

    try {
        await s3.listObjectsV2({ Bucket: bucketName }).promise();
        isAuthenticated = true; // 인증이 성공하면 true
    } catch (error) {
        isAuthenticated = false;
        console.error("AWS 인증 실패", error);
    }
};

// Presigned URL 생성 함수
export const getPresignedUrl = async (fileName) => {
    // 인증 상태 확인 (최초 한 번만 확인)
    if (isAuthenticated === null) {
      await checkAuthentication();
    }
  
    // 인증 실패 시 기본 이미지 반환
    if (!isAuthenticated) {
      return defaultPoster;  // 인증이 실패한 경우 null 반환
    }
  
    // Presigned URL 생성
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 60, // URL 유효 시간 (초 단위)
    };
  
    return s3.getSignedUrl('getObject', params); // getObject 메서드를 사용하여 Presigned URL 생성
  };