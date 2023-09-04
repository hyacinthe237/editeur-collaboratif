"use client"

import { useState } from 'react'

// Importer Slate editor
import { createEditor, BaseEditor, Descendant, Editor, Element, Transforms } from 'slate'

// Importer les composants Slate et le plugin React
import { Slate, Editable, withReact, ReactEditor  } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export default function Home() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()))

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-3xl font-extrabold uppercase text-center mb-10'>Bienvenue dans notre Editeur Collaboratif</h1>

      <Slate
        editor={editor} 
        initialValue={initialValue}
      >
        <Editable 
          className='w-full min-h-screen rounded-lg bg-gray-200 text-black px-3 py-3'
          // Define a new handler which prints the key that was pressed.
          onKeyDown={event => {
            console.log(event.key)
          }}
        />
      </Slate>
    </main>
  )
}
