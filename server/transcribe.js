// // npm install assemblyai

// import { AssemblyAI } from 'assemblyai'

// const client = new AssemblyAI({
//   apiKey: "99624ecb550d4588855a75686d4fd726"
// })

// const audioUrl =
//   'https://res.cloudinary.com/drgqcwxq6/video/upload/v1702463386/videos/l68zsoqgf9zhv0rj5pps.mp4'

// const config = {
//   audio_url: audioUrl
// }




// const run = async () => {
//   const transcript = await client.transcripts.create(config)
//   console.log(transcript)
//   console.log(transcript.text)
// }

// run()

// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

// import { AssemblyAI } from 'assemblyai';

// const client = new AssemblyAI({
//   apiKey: '99624ecb550d4588855a75686d4fd726',
// });

// const FILE_URL =
//   'https://res.cloudinary.com/drgqcwxq6/video/upload/v1702463386/videos/l68zsoqgf9zhv0rj5pps.mp4';

// // You can also transcribe a local file by passing in a file path
// // const FILE_URL = './path/to/file.mp3';

// // Request parameters where auto_highlights has been enabled
// const data = {
//   audio_url: FILE_URL,
//   auto_highlights: true
// }

// const run = async () => {
//   const transcript = await client.transcripts.create(data);
//   console.log(transcript.text);

//   for (let result of transcript.auto_highlights_result.results) {
//     console.log(
//       `Highlight: ${result.text}, Count: ${result.count}, Rank: ${result.rank}`
//     );
//   }
// };

// run();

// import { AssemblyAI } from 'assemblyai'

// const client = new AssemblyAI({
//   apiKey: '99624ecb550d4588855a75686d4fd726'
// })

// const audioUrl =
//   'https://res.cloudinary.com/drgqcwxq6/video/upload/v1702463386/videos/l68zsoqgf9zhv0rj5pps.mp4'

// const params = {
//   audio: audioUrl,
//   auto_chapters: true
// }

// const run = async () => {
//   const transcript = await client.transcripts.transcribe(params)

//   for (const chapter of transcript.chapters) {
//     console.log(`${chapter.start}-${chapter.end}: ${chapter.headline}`)
//   }
// }

// run()

import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: '99624ecb550d4588855a75686d4fd726'
})

const audioUrl =
  'https://res.cloudinary.com/drgqcwxq6/video/upload/v1702463386/videos/l68zsoqgf9zhv0rj5pps.mp4'

const params = {
  audio: audioUrl,
  summarization: true,
  summary_model: 'conversational',
  summary_type: 'bullets_verbose',
  speaker_labels:true,
//   dual_channel:true
}

const run = async () => {
  const transcript = await client.transcripts.transcribe(params)

  console.log(transcript.summary)
}

run()

