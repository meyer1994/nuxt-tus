import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'

const useS3 = () => {
  return new S3Client({
    endpoint: 'http://localhost:9000',
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'minioadmin',
      secretAccessKey: 'minioadmin',
    },
    forcePathStyle: true, // needed for MinIO
  })
}

export default defineEventHandler(async (): Promise<string[]> => {
  // Example usage:
  const s3 = useS3()
  const command = new ListObjectsV2Command({ Bucket: 'uploads' })
  const response = await s3.send(command)
  const objects = response.Contents || []
  return objects.map(i => i.Key as string).filter(i => !i.endsWith('.info'))
})
