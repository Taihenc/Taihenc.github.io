import { WorkExperience } from '../interfaces/WorkExperience'

export const workExperiences: WorkExperience[] = [
  {
    logo: './works-experience/lmwn/logo.png',
    title: 'LMWN internship🍾',
    subtitle: "What I've learned^^",
    description:
      'I got an internship at Lineman Wongnai as a Software Engineer, specializing in Android development. I collaborated with the team to deliver new features more quickly, fix bugs, and migrate the old layout style to Jetpack Compose. I learned technologies such as Kotlin, Android development, and CI/CD pipelines. It was great to learn how a big company handles its large amount of traffic and data. Another thing to mention is that they treat intern students as full-time employees, so you get to experience the real work environment, which is great for seeing how your code actually works in the real world.',
    link: 'https://careers.lmwn.com/internship/lmwn-junior',
    images: [
      './works-experience/lmwn/image1.jpg',
      './works-experience/lmwn/image5.jpg',
      './works-experience/lmwn/image2.jpg',
      './works-experience/lmwn/image3.jpg',
      './works-experience/lmwn/image4.jpg',
    ],
  },
  {
    logo: './works-experience/yakiniku/logo.png',
    title: 'YAKINIKU🐄',
    subtitle: 'Feel the taste of Yakiniku but remotely!',
    description:
      'YAKINIKU is a website for learning about yakiniku. This site will provide you with a variety of cow breeds along with valuable information. It includes details about each cut, such as its origin and cooking recommendations. Additionally, we offer a mini-game for yakiniku enthusiasts where you can select a beef cut, read the cooking guide, start grilling, and receive a cooking result to gauge your skills.',
    link: 'https://taihenc.github.io/YAKINIKU/',
    images: [
      './works-experience/yakiniku/home.jpg',
      './works-experience/yakiniku/phone.jpg',
      './works-experience/yakiniku/cut.jpg',
      './works-experience/yakiniku/yaki.jpg',
    ],
  },
  {
    logo: 'https://github.com/Taihenc/MoeKot/blob/main/app/src/main/ic_launcher-playstore.png?raw=true',
    title: 'MoeKot📱',
    subtitle: "What's MoeKot?",
    description:
      'MoeKot is your go-to app for exploring, discovering, and curating your favorite manga and anime titles. With an intuitive interface and a touch of "Moe" (cute) inspiration, MoeKot enhances your browsing experience. Not only can you explore a vast collection of content, but future updates will also include a library feature for saving your favorite finds and tracking your reading/watching progress. The app is built using Kotlin and the MVVM architecture. Thanks to the API from AniList, the app provides the latest manga information. Although the app is not yet complete, you can check its progress on the GitHub repository.',
    link: 'https://github.com/Taihenc/MoeKot',
    images: ['./works-experience/moekot/image.jpg'],
  },
  {
    logo: './works-experience/chula/logo.png',
    title: 'University stuff🤓',
    subtitle: 'As a student only coding is not an ideal life~!',
    description:
      'Technical skills can be improved through coding (e.g., working on side projects), but soft skills require a different approach. I like to push myself into various situations where I can meet new people and learn new things. so I give it a try—for example, as a Teaching Assistant (TA), ICPC Thailand 2024 Staff, and @rubpuenkaomai Staff. I’m looking forward to taking on even more opportunities in the future. :)',
    link: 'https://www.chula.ac.th/',
    images: [
      './works-experience/chula/logo.png',
      './works-experience/chula/TA.jpg',
      './works-experience/chula/icpc.jpg',
      './works-experience/chula/aaum.jpg',
    ],
  },
]
