import AWS from 'aws-sdk';

const bucketName = process.env.DEV_AWS_S3_BUCKET || '';

const defaultPoster = "/empty_image.jpg";
// const accessKeyId =  process.env.REACT_APP_AWS_ACCESS_KEY_ID;
// const secretAccessKey =  process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
// const region =  process.env.REACT_APP_AWS_REGION;

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// 인증 상태 관리 객체
const s3AuthManager = {
  isAuthenticated: false as boolean, // 인증 상태
  isAuthChecked: false, // 인증 확인 여부
  async checkAuth() {
    if (this.isAuthChecked) {
      return this.isAuthenticated; // 이미 인증이 확인된 경우 캐싱된 결과 반환
    }

    try {
      await s3.listObjectsV2({ Bucket: bucketName }).promise();
      this.isAuthenticated = true; // 인증 성공
      console.log("AWS 인증 성공");
    } catch (error) {
      this.isAuthenticated = false; // 인증 실패
      console.error("AWS 인증 실패:", error);
    } finally {
      this.isAuthChecked = true; // 인증 확인 플래그 설정
    }

    return this.isAuthenticated;
  },
};

// Presigned URL 생성 함수
export const getPresignedUrl = async (fileName: string) => {
  // 인증 상태 확인
  const isAuthenticated = await s3AuthManager.checkAuth();

  // 인증 실패 시 기본 이미지 반환
  if (!isAuthenticated) {
    return defaultPoster;
  }

  // Presigned URL 생성
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
  };

  return s3.getSignedUrl("getObject", params);
};