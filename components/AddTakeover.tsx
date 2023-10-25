import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { firestore } from '@/utils/firebase'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import uploadFile from '@/functions/bucket/uploadFile'
import Loader from './Loader'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import SocialIcon from './SocialIcon'
import TrashButton from './TrashButton'
import MediaViewer from './MediaViewer'
import type { TakeoverProject } from '@/@types'

const AddTakeover = (props: { onSubmitted: () => void }) => {
  const { onSubmitted } = props
  const [projLogo, setProjLogo] = useState('')
  const [projName, setProjName] = useState('')
  const [projDesc, setProjDesc] = useState('')

  const [projTwitterLink, setProjTwitterLink] = useState('')
  const [projDiscordLink, setProjDiscordLink] = useState('')
  const [projWebsiteLink, setProjWebsiteLink] = useState('')
  const [projLinks, setProjLinks] = useState<string[]>([])

  const [progress, setProgress] = useState({
    msg: '',
    loading: false,
  })

  const upload = async (file: File) => {
    setProgress((prev) => ({ ...prev, loading: true, msg: 'Uploading...' }))

    const sizeLimit = 5000000 // 5mb
    if (file.size > sizeLimit) {
      setProgress((prev) => ({ ...prev, loading: false, msg: 'File size is limited to 5mb' }))
      return ''
    }

    try {
      const { fileUrl } = await uploadFile(file)
      setProgress((prev) => ({ ...prev, loading: false, msg: '' }))
      return fileUrl
    } catch (error: any) {
      const errMsg = error?.response?.data || error?.message || error?.toString() || 'UNKNOWN ERROR'
      setProgress((prev) => ({ ...prev, loading: false, msg: errMsg }))
      return ''
    }
  }

  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    setSubmitting(true)
    toast.loading('Submitting')

    const collection = firestore.collection('projects')

    const payload: TakeoverProject = {
      logo: projLogo,
      name: projName,
      description: projDesc,
      links: [projTwitterLink, projDiscordLink, projWebsiteLink]
        .concat(projLinks)
        .filter((str) => !!str)
        .map((str) => {
          const baseUrl = str.split('?')[0]

          if (baseUrl.indexOf('https://') === 0) {
            return baseUrl
          } else if (baseUrl.indexOf('http://') === 0) {
            return baseUrl.replace('http://', 'https://')
          } else {
            return `https://${baseUrl}`
          }
        }),
    }

    await collection.add(payload)

    setProjLogo('')
    setProjName('')
    setProjDesc('')
    setProjTwitterLink('')
    setProjDiscordLink('')
    setProjWebsiteLink('')
    setProjLinks([])

    setSubmitting(false)
    toast.dismiss()
    toast.success('Submitted')

    setTimeout(() => onSubmitted(), 0)
  }

  return (
    <Fragment>
      <h5 className='mb-4 text-center text-lg'>Project Information</h5>

      <div className='flex flex-col'>
        {projLogo ? (
          <div className='mx-auto'>
            <MediaViewer mediaType='IMAGE' src={projLogo} objectFit='cover' withBorder size='rounded-xl' />
          </div>
        ) : (
          <Fragment>
            {progress.loading ? (
              <Loader />
            ) : (
              <button
                type='button'
                onClick={() => {}}
                disabled={progress.loading}
                className='relative w-[220px] h-[220px] m-1 mx-auto p-4 flex flex-col items-center justify-center rounded-full border border-transparent hover:border-zinc-400 focus:border-zinc-400 disabled:border-transparent bg-zinc-700 hover:bg-zinc-600 disabled:text-zinc-600 disabled:bg-zinc-800 disabled:hover:bg-zinc-800 cursor-pointer disabled:cursor-not-allowed'
              >
                <input
                  className='absolute w-[220px] h-[220px] rounded-full opacity-0 cursor-pointer'
                  type='file'
                  accept='.jpg,.jpeg,.png,.webp,.gif'
                  multiple={false}
                  disabled={progress.loading}
                  onChange={async (e) => {
                    const file = (e.target.files as FileList)[0]
                    if (file) {
                      const fileUrl = await upload(file)
                      if (fileUrl) setProjLogo(fileUrl)
                    }
                  }}
                />
                <ArrowUpTrayIcon className='w-8 h-8 mb-2' />
                Upload Logo
              </button>
            )}
            {progress.msg ? <p className='mt-1 text-center'>{progress.msg}</p> : null}
          </Fragment>
        )}

        <Input placeholder='Project Name' value={projName} setValue={(v) => setProjName(v)} />
        <TextArea placeholder='Description' value={projDesc} setValue={(v) => setProjDesc(v)} />

        <div>
          <div className='flex items-center'>
            <SocialIcon network='x' color='white' className='mx-2' />
            <Input placeholder='X/Twitter URL' value={projTwitterLink} setValue={(v) => setProjTwitterLink(v)} />
          </div>
          <div className='flex items-center'>
            <SocialIcon network='discord' color='white' className='mx-2' />
            <Input placeholder='Discord URL' value={projDiscordLink} setValue={(v) => setProjDiscordLink(v)} />
          </div>
          <div className='flex items-center'>
            <SocialIcon color='white' className='mx-2' />
            <Input placeholder='Website URL' value={projWebsiteLink} setValue={(v) => setProjWebsiteLink(v)} />
          </div>

          {projLinks.map((str, idx) => (
            <div key={`link-${idx}`} className='flex items-center'>
              <SocialIcon color='white' className='mx-2' />
              <Input
                placeholder={`Other URL #${idx + 1}`}
                value={str}
                setValue={(v) =>
                  setProjLinks((prev) => {
                    const payload: typeof prev = JSON.parse(JSON.stringify(prev))

                    payload[idx] = v

                    return payload
                  })
                }
              />
              <TrashButton
                onClick={() => {
                  setProjLinks((prev) => {
                    const payload: typeof prev = JSON.parse(JSON.stringify(prev))

                    const foundIdx = payload.findIndex((val) => val === str)
                    if (foundIdx !== -1) payload.splice(foundIdx, 1)

                    return payload
                  })
                }}
              />
            </div>
          ))}
          <Button
            label='Add a Link'
            icon={PlusCircleIcon}
            disabled={!!projLinks.filter((str) => !str).length}
            onClick={() =>
              setProjLinks((prev) => {
                const payload: typeof prev = JSON.parse(JSON.stringify(prev))

                prev.push('')

                return payload
              })
            }
          />
        </div>

        {submitting ? (
          <Loader />
        ) : (
          <Button
            label='Submit Information'
            disabled={
              !projName || !projLogo || (!projTwitterLink && !projDiscordLink && !projWebsiteLink && !projLinks.filter((str) => !!str).length)
            }
            onClick={submit}
          />
        )}
      </div>
    </Fragment>
  )
}

export default AddTakeover
