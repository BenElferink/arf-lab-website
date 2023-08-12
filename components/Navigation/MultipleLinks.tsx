import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Dispatch, SetStateAction } from 'react'
import SingleLink, { SingleLinkProps } from './SingleLink'

export interface MultipleLinksProps {
  title: string
  links: SingleLinkProps[]
  dropdownState: {
    value: string
    setValue: Dispatch<SetStateAction<string>>
  }
}

const MultipleLinks = (props: MultipleLinksProps) => {
  const { title, links, dropdownState } = props
  const open = dropdownState.value === title

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() =>
          dropdownState.setValue((prev) => {
            if (prev === title) return ''
            return title
          })
        }
        className={
          (open ? 'bg-gray-800 sm:bg-transparent sm:text-white ' : '') +
          'py-2 px-3 sm:p-0 w-full sm:w-auto flex items-center text-start sm:text-center text-sm truncate rounded sm:border-0 hover:bg-gray-700 sm:hover:bg-transparent hover:text-white'
        }
      >
        {title}
        <ChevronDownIcon className={(open ? 'rotate-180' : 'rotate-0') + ' ml-1 w-4 h-4'} />
      </button>

      <div className={open ? 'block' : 'hidden'}>
        <ul
          onClick={() => dropdownState.setValue('')}
          className='sm:flex sm:flex-col sm:items-start sm:absolute sm:top-12 sm:-left-4 sm:overflow-auto sm:w-fit sm:p-4 sm:bg-gray-900 sm:border-gray-700 sm:rounded-xl'
        >
          {links.map((obj) => (
            <li
              key={`link-group-${title}-item-${obj.label}`}
              className='sm:py-1 bg-gray-800 sm:bg-transparent rounded'
            >
              <SingleLink {...obj} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MultipleLinks
