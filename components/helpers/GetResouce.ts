import { Storage } from 'aws-amplify'

const getResourcesWithUrls = async (urls: string[]) => {
  const resources: (string | void)[] = []
  console.log('Getting resources from urls', urls)
  if (Array.isArray(urls)) {
    for (const url of urls) {
      const res = await getInstallerResourceFromS3(url)
      resources.push(res)
    }
    return resources
  } else {
    return await getInstallerResourceFromS3(urls)
  }
}

const getInstallerResourceFromS3 = async (key: string) => {
  console.log(`fetching installer resource with key ${key}`)
  return Storage.get(key, {
    customPrefix: {
      public: '', // This is needed to remove "public" prefix
    },
    // download: true,
  })
    .then(res => res) // return
    .catch(err => {
      console.log(`error pulling resource with url ${key} ${err}`)
    })
}
export { getInstallerResourceFromS3, getResourcesWithUrls }
