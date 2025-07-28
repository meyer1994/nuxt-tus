import { S3Store } from '@tus/s3-store'
import { Server } from '@tus/server'

let tus: Server | null = null
const useTus = () => {
  if (tus) return tus

  const config = useRuntimeConfig()
  console.info(config.aws)

  tus = new Server({
    path: '/api/tus',
    datastore: new S3Store({
      s3ClientConfig: {
        bucket: 'uploads',
        region: 'us-east-1',
        endpoint: 'http://localhost:9000',
        credentials: {
          accessKeyId: 'minioadmin',
          secretAccessKey: 'minioadmin',
        },
        forcePathStyle: true, // needed for minio
      },
    }),
  })

  return tus
}

export default defineEventHandler(async (event) => {
  console.info('TUS request received')
  const tus = useTus()
  await tus.handle(event.node.req, event.node.res)
  // do not return anything
})
