// src/button.exh.ts (or .js, .jsx, .tsx, ...)
import exhibit from 'exhibitor'
import { CommentList } from './CommentList' // I.e. button.tsx

exhibit(CommentList, 'CommentList')
  // Define any default values for props
  .defaults({
    postQ: {},
    post_id: 123,
    comments: [
        {
            comment_id: 1,
            owner: { name: "Alice" },
            comment: "Hello there!",
        },
        {
            comment_id: 2,
            owner: { name: "Bob" },
            comment: "Hello [i]Alice[/i]!",
        },
    ],
  })
  // Define miscellaneous options
  .options({ group: 'Final Review' })
  .build()