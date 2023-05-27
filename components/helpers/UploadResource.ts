import { Storage } from 'aws-amplify'
import { useGetIdentity } from 'react-admin'
import uuid from 'uuid'


const uploadResourcesWithUrls = async (assets: any, type: string) => {
  let paths = []
  for (const asset of assets) {
    const res = await uploadInstallerResource(asset, type)
    console.log('new path', res)
    paths.push(res)
  }
  console.log('Uploaded the following paths to s3', paths)
  return paths
}

const fetchResourceFromURI = async (uri: RequestInfo) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  console.log('blobbing', blob)
  return blob
}

const uploadInstallerResource = async (asset: any, type: string) => {
  const { identity, isLoading } = useGetIdentity()
  if (!isLoading) {
    let resourceName = uuid.v4().toString()
    type === 'images' ? (resourceName += '.jpg') : (resourceName += '.pdf')

    const resourcePath = {
      public: `installers/${identity.id}/${type}/`,
      protected: `installers/${identity.id}/${type}/`,
    }

    const resource = await fetchResourceFromURI(asset.uri)

    return Storage.put(resourceName, resource, {
      level: 'public',
      contentType: asset.type,
      customPrefix: resourcePath,
    })
      .then(res => {
        console.log(`added resource to s3 ${resourcePath.public}${resourceName}`)
        return `${resourcePath.public}${resourceName}`
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export { uploadInstallerResource, uploadResourcesWithUrls }
